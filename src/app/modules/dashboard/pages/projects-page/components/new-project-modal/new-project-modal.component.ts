import {
	MatDialogActions,
	MatDialogClose,
	MatDialogContent,
	MatDialogRef,
	MatDialogTitle,
} from '@angular/material/dialog';
import { MatError, MatHint, MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import {
	Component,
	ElementRef,
	OnInit,
	ViewChild,
	inject,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import {
	MatAutocompleteModule,
	MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProjectDTO } from '@modules/dashboard/dto/projectDTO';
import { ProjectFormGroup } from '../../forms-group/projectFormGroup';
import { ProjectsService } from '@modules/dashboard/services/projects.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { fileToDataURL } from '@utils/index';
import { Observable, catchError, map, startWith, switchMap } from 'rxjs';
import { ProjectTag } from '@modules/dashboard/interfaces/projectTag';
import { ProjectTagDTO } from '@modules/dashboard/dto/projectTagDTO';
import { LoadingLayerService } from '@modules/dashboard/services/loading-layer.service';
import { ProjectErrorHandler } from '@modules/dashboard/handlers/projectErrorHandler';

@Component({
	selector: 'app-new-project-modal',
	templateUrl: './new-project-modal.component.html',
	styleUrl: './new-project-modal.component.scss',
	standalone: true,
	imports: [
		CommonModule,
		MatInputModule,
		MatDialogTitle,
		MatDialogContent,
		MatDialogActions,
		MatDialogClose,
		MatButton,
		MatError,
		MatHint,
		ReactiveFormsModule,
		MatIconModule,
		MatChipsModule,
		MatAutocompleteModule,
		MatProgressSpinnerModule,
	],
})
export class NewProjectModalComponent implements OnInit {
	private _projectErrorHandler: ProjectErrorHandler =
		inject(ProjectErrorHandler);

	projectFormGroup: ProjectFormGroup = new ProjectFormGroup();
	projectPreview!: File;
	previewAsDataURL!: string;

	tagInputControl: FormControl = new FormControl('');
	tagInputLoading: boolean = false;
	availableTags: ProjectTag[] = [];
	selectedTags: ProjectTag[] = [];
	filteredTags$!: Observable<ProjectTag[]>;
	@ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;

	constructor(
		public dialogRef: MatDialogRef<NewProjectModalComponent>,
		private projectsSvc: ProjectsService,
		private loadingSvc: LoadingLayerService,
	) {}

	ngOnInit(): void {
		this.projectsSvc.getProjectsTags().subscribe((res) => {
			this.availableTags = res['hydra:member'];

			this.filteredTags$ = this.tagInputControl.valueChanges.pipe(
				startWith(null),
				map((tag: string | null) =>
					tag ? this.filterTags(tag) : this.availableTags,
				),
			);
		});
	}

	onSelectFile(event: any) {
		if (event.target.files[0] != null) {
			let file = event.target.files[0];
			this.projectPreview = file;
			this.projectFormGroup.preview.setValue(file.name);
			fileToDataURL(file).subscribe({
				next: (dataUrl) => (this.previewAsDataURL = dataUrl),
			});
		}
	}

	onSubmit() {
		if (this.projectFormGroup.valid == false) return;
		this.loadingSvc.loading = true;
		let tags = this.selectedTags.map((tag) => tag['@id']) as string[];

		let projectDTO = new ProjectDTO(
			this.projectFormGroup.get('name')?.value,
			this.projectFormGroup.get('description')?.value,
			tags,
		);

		const _createProject$ = this.projectsSvc
			.createProject(projectDTO)
			.pipe(catchError(this._projectErrorHandler.handleCreateError));

		_createProject$.subscribe((newProject) => {
			const _uploadProjectPreview$ = this.projectsSvc
				.uploadProjectPreview(this.projectPreview, newProject.id)
				.pipe(catchError(this._projectErrorHandler.handleUploadPreviewError));
			_uploadProjectPreview$.subscribe((project) => {
				this.loadingSvc.loading = false;
				this.dialogRef.close(project);
			});
		});
	}

	removeTag(index: number): void {
		this.selectedTags.splice(index, 1);
	}

	addNewTag(event: MatChipInputEvent) {
		const newProjectTagName = event.value;
		if (newProjectTagName.trim() == '') return;
		this.tagInputLoading = true;

		let projectTagDTO = new ProjectTagDTO(newProjectTagName);
		this.projectsSvc.createProjectsTags(projectTagDTO).subscribe({
			next: (projectTag) => {
				this.availableTags.push(projectTag);
				this.selectedTags.push(projectTag);
				this.cleanTagInput();
				this.tagInputLoading = false;
			},
		});
	}

	selectTag(e: MatAutocompleteSelectedEvent) {
		let selectedTag = e.option.value;
		this.cleanTagInput();
		this.selectedTags.push(selectedTag);
	}

	private cleanTagInput() {
		this.tagInput.nativeElement.value = '';
		this.tagInputControl.setValue(null);
	}

	private filterTags(value: string): ProjectTag[] {
		const filterValue = value.toLowerCase();

		return this.availableTags.filter((tag) =>
			tag.name.toLowerCase().includes(filterValue),
		);
	}
}
