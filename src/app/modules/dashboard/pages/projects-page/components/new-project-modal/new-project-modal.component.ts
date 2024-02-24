import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatError, MatHint, MatInputModule } from '@angular/material/input';
import { ProjectFormGroup } from '../../forms-group/projectFormGroup';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ProjectsService } from '@modules/dashboard/services/projects.service';
import { HttpClientModule } from '@angular/common/http';
import { ProjectDTO } from '@modules/dashboard/dto/projectDTO';
import { switchMap } from 'rxjs';
import { fileToDataURL } from '@utils/index';

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
    HttpClientModule,
  ],
  providers: [ProjectsService],
})
export class NewProjectModalComponent {
  projectFormGroup: ProjectFormGroup = new ProjectFormGroup();
  projectPreview!: File;
  previewAsDataURL!: string;

  constructor(
    public dialogRef: MatDialogRef<NewProjectModalComponent>,
    private projectsSvc: ProjectsService,
  ) {}

  onSelectFile(event: any) {
    if (event.target.files[0] != null) {
      let file = event.target.files[0];
      this.projectPreview = file;
      this.projectFormGroup.preview.setValue(file.name);
      fileToDataURL(file).subscribe({
        next: dataUrl => this.previewAsDataURL = dataUrl
      })
    }
  }

  onSubmit() {
    if (this.projectFormGroup.valid == false) return;

    let projectDTO = new ProjectDTO(
      this.projectFormGroup.get('name')?.value,
      this.projectFormGroup.get('description')?.value,
    );

    this.projectsSvc
      .createProject(projectDTO)
      .pipe(
        switchMap((newProject) => {
          return this.projectsSvc.uploadProjectPreview(
            this.projectPreview,
            newProject.id,
          );
        }),
      )
      .subscribe({
        next: (project) => this.dialogRef.close(project),
      });
  }
}
