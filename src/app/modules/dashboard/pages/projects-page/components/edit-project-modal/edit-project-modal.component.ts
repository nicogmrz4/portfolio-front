import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
	asyncScheduler,
	concatAll,
	last,
	scheduled,
} from 'rxjs';
import { environment } from '../../../../../../../environments/environment';

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
		HttpClientModule,
	],
	providers: [ProjectsService],
})
export class EditProjectModalComponent {
	projectFormGroup: ProjectFormGroup = new ProjectFormGroup();
	previewFile!: File;
	previewAsDataURL: string = '';
	url: string = environment.apiUrl;

	constructor(
		public dialogRef: MatDialogRef<EditProjectModalComponent>,
		@Inject(MAT_DIALOG_DATA) public project: Project,
		private projectsSvc: ProjectsService,
	) {}

	ngOnInit() {
		this.initForm();
	}

	initForm() {
		this.projectFormGroup.get('name')?.setValue(this.project.name);
		this.projectFormGroup
			.get('description')
			?.setValue(this.project.description);
		this.projectFormGroup.get('preview')?.setValue(this.project.preview);
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

		let projectDTO = new ProjectDTO(
			this.projectFormGroup.name.value,
			this.projectFormGroup.description.value,
		);

		// if preview is not null let's make a double request for update data and the preview
		if (this.previewFile) {
			let submitForm$ = scheduled(
				[
					this.projectsSvc
						.editProject(projectDTO, this.project.id),
					this.projectsSvc.uploadProjectPreview(
						this.previewFile,
						this.project.id,
					),
				],
				asyncScheduler,
			).pipe(concatAll(), last())

			submitForm$.subscribe((editedProject) => {
				this.dialogRef.close(editedProject);
			});

			return;
		}

		// if preview is not null let's make a single request for update data
		this.projectsSvc
			.editProject(projectDTO, this.project.id)
			.subscribe((editedProject) => this.dialogRef.close(editedProject));
	}
}
