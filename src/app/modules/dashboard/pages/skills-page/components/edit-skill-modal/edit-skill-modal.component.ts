import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
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
import { MatError, MatHint } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SkillDTO } from '@modules/dashboard/dto/skillDTO';
import { Skill } from '@modules/dashboard/interfaces/skill';
import { SkillFormGroup } from '@modules/dashboard/pages/projects-page/forms-group/skiillFormGroup';
import { SkillsService } from '@modules/dashboard/services/skills.service';
import { fileToDataURL } from '@utils/index';
import { asyncScheduler, concatAll, last, scheduled } from 'rxjs';
import { environment } from '../../../../../../../environments/environment';
import { SkillCardComponent } from '@modules/home/components/skill-card/skill-card.component';
import { MatSliderModule } from '@angular/material/slider';

@Component({
	selector: 'app-edit-skill-modal',
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
		MatSliderModule,
		SkillCardComponent,
		HttpClientModule,
	],
	providers: [SkillsService],
	templateUrl: './edit-skill-modal.component.html',
	styleUrl: './edit-skill-modal.component.scss',
})
export class EditSkillModalComponent implements OnInit {
	iconFile!: File;
	iconAsDataURL: string = '';
	skillFormGroup: SkillFormGroup = new SkillFormGroup();
	url: string = environment.apiUrl;


	constructor(
		private dialogRef: MatDialogRef<EditSkillModalComponent>,
		private skillsSvc: SkillsService,
		@Inject(MAT_DIALOG_DATA) public skill: Skill,
	) {}

	ngOnInit(): void {
		this.initForm();
	}

	formatLabel(value: number): string {
		return `${value}px`;
	}

	initForm() {
		this.skillFormGroup.name.setValue(this.skill.name);
		this.skillFormGroup.icon.setValue(this.skill.icon);
	}

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
			this.skillFormGroup.iconSize.value
		);
		
		// if icon isn't null let's make a double request, one for update data and other for the icon
		if (this.iconFile) {
			let submitForm$ = scheduled(
				[
					this.skillsSvc.editSkill(skillDTO, this.skill.id),
					this.skillsSvc.uploadSkillIcon(this.iconFile, this.skill.id),
				],
				asyncScheduler,
			).pipe(concatAll(), last());

			submitForm$.subscribe((editedSkill: Skill) =>
				this.dialogRef.close(editedSkill),
			);
			return;
		}

		// if icon is null let's make a single request for update data
		this.skillsSvc
			.editSkill(skillDTO, this.skill.id)
			.subscribe((editedSkill: Skill) => this.dialogRef.close(editedSkill));
	}
}
