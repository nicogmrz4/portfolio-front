import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
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
import { SkillDTO } from '@modules/dashboard/dto/skillDTO';
import { SkillFormGroup } from '@modules/dashboard/pages/projects-page/forms-group/skiillFormGroup';
import { SkillsService } from '@modules/dashboard/services/skills.service';
import { fileToDataURL } from '@utils/index';
import { switchMap } from 'rxjs';

@Component({
	selector: 'app-new-skill-modal',
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
	providers: [SkillsService],
	templateUrl: './new-skill-modal.component.html',
	styleUrl: './new-skill-modal.component.scss',
})
export class NewSkillModalComponent {
	iconFile!: File;
	iconAsDataURL: string = '';
	skillFormGroup: SkillFormGroup = new SkillFormGroup();

	constructor(
		private dialogRef: MatDialogRef<NewSkillModalComponent>,
		private skillsSvc: SkillsService,
	) {}

	onSelectFile(event: any) {
		if (event.target.files[0] != null) {
			let file = event.target.files[0];
			this.iconFile = file;
			this.skillFormGroup.icon.setValue(file.name);
			fileToDataURL(file).subscribe({
				next: (dataUrl) => (this.iconAsDataURL = dataUrl),
			});
		}
	}

	onSubmit() {
		if (this.skillFormGroup.valid == false) return;

		let skillDTO = new SkillDTO(
			this.skillFormGroup.name.value,
		);

		this.skillsSvc
			.createSkill(skillDTO)
			.pipe(
				switchMap((newSkill) =>
					this.skillsSvc.uploadSkillIcon(this.iconFile, newSkill.id),
				),
			)
			.subscribe({
        next: (skill => this.dialogRef.close(skill))
      });
	}
}
