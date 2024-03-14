import { CommonModule } from '@angular/common';
import {
	Component,
	ElementRef,
	Inject,
	OnInit,
	ViewChild,
	inject,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
	MAT_DIALOG_DATA,
	MatDialogActions,
	MatDialogClose,
	MatDialogContent,
	MatDialogRef,
	MatDialogTitle,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatError, MatHint, MatInputModule } from '@angular/material/input';
import { ProjectFormGroup } from '../../forms-group/projectFormGroup';
import { ProjectDTO } from '@modules/dashboard/dto/projectDTO';
import { ProjectsService } from '@modules/dashboard/services/projects.service';
import { Project } from '@modules/dashboard/interfaces/project';
import { fileToDataURL } from '@utils/index';
import {
	Observable,
	asyncScheduler,
	catchError,
	exhaustAll,
	last,
	map,
	scheduled,
	startWith,
} from 'rxjs';
import { environment } from '../../../../../../../environments/environment';
import { ProjectTag } from '@modules/dashboard/interfaces/projectTag';
import { ProjectTagDTO } from '@modules/dashboard/dto/projectTagDTO';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import {
	MatAutocompleteModule,
	MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingLayerService } from '@modules/dashboard/services/loading-layer.service';
import { ProjectErrorHandler } from '@modules/dashboard/handlers/projectErrorHandler';

@Component({
	selector: 'app-edit-project-modal',
	standalone: true,
	templateUrl: './edit-project-modal.component.html',
	styleUrl: './edit-project-modal.component.scss',
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
export class EditProjectModalComponent implements OnInit {
	private readonly _projectErrorHandler = inject(ProjectErrorHandler);
	projectFormGroup: ProjectFormGroup = new ProjectFormGroup();
	previewFile!: File;
	previewAsDataURL: string = '';
	url: string = environment.apiUrl;

	tagInputControl: FormControl = new FormControl('');
	tagInputLoading: boolean = false;
	availableTags: ProjectTag[] = [];
	selectedTags: ProjectTag[] = [];
	filteredTags$!: Observable<ProjectTag[]>;
	@ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;

	constructor(
		public dialogRef: MatDialogRef<EditProjectModalComponent>,
		@Inject(MAT_DIALOG_DATA) public project: Project,
		private projectsSvc: ProjectsService,
		private loadingSvc: LoadingLayerService,
	) {}

	ngOnInit() {
		this.initForm();

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

	initForm() {
		this.projectFormGroup.get('name')?.setValue(this.project.name);
		this.projectFormGroup
			.get('description')
			?.setValue(this.project.description);
		this.projectFormGroup.get('preview')?.setValue(this.project.preview);
		this.selectedTags = this.project.tags;
	}

	onSelectFile(event: any) {
		if (event.target.files[0] != null) {
			let file = event.target.files[0];
			this.previewFile = file;
			this.projectFormGroup.preview.setValue(file.name);
			this.projectFormGroup.markAsDirty();
			fileToDataURL(file).subscribe({
				next: (dataURL) => (this.previewAsDataURL = dataURL),
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

		const _editProject$ = this.projectsSvc
			.editProject(projectDTO, this.project.id)
			.pipe(catchError(this._projectErrorHandler.handleEditError));

		// if preview is not null let's make a double request for update data and the preview
		if (this.previewFile) {
			_editProject$.subscribe((editedProject) => {
				const _uploadProjectPreview$ = this.projectsSvc
					.uploadProjectPreview(this.previewFile, this.project.id)
					.pipe(catchError(this._projectErrorHandler.handleUploadPreviewError));
				_uploadProjectPreview$.subscribe((editedProjectWithPreview) => {
					this.loadingSvc.loading = false;
					this.dialogRef.close(editedProjectWithPreview);
				})
			});
			return;
		}

		// if preview is not null let's make a single request for update data

		_editProject$.subscribe((editedProject) => {
			this.loadingSvc.loading = false;
			this.dialogRef.close(editedProject);
		});
	}

	removeTag(index: number): void {
		this.selectedTags.splice(index, 1);
		this.projectFormGroup.markAsDirty();
	}

	addNewTag(event: MatChipInputEvent) {
		const newProjectTagName = event.value;
		if (newProjectTagName.trim() == '') return;
		this.tagInputLoading = true;

		let projectTagDTO = new ProjectTagDTO(newProjectTagName);
		this.projectsSvc.createProjectsTags(projectTagDTO).subscribe({
			next: (projectTag) => {
				this.projectFormGroup.markAsDirty();
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
		this.projectFormGroup.markAsDirty();
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
