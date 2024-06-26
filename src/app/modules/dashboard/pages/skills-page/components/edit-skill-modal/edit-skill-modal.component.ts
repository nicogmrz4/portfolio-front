import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, inject } from '@angular/core';
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
import {
	asyncScheduler,
	catchError,
	concatAll,
	exhaustAll,
	last,
	scheduled,
} from 'rxjs';
import { environment } from '../../../../../../../environments/environment';
import { SkillCardComponent } from '@modules/home/components/skill-card/skill-card.component';
import { MatSliderModule } from '@angular/material/slider';
import { LoadingLayerService } from '@modules/dashboard/services/loading-layer.service';
import { SkillErrorHandler } from '@modules/dashboard/handlers/skillErrorHandler';

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
	],
	templateUrl: './edit-skill-modal.component.html',
	styleUrl: './edit-skill-modal.component.scss',
})
export class EditSkillModalComponent implements OnInit {
	_skillErrorHandler: SkillErrorHandler = inject(SkillErrorHandler);

	iconFile!: File;
	iconAsDataURL: string = '';
	skillFormGroup: SkillFormGroup = new SkillFormGroup();
	url: string = environment.apiUrl;

	constructor(
		private dialogRef: MatDialogRef<EditSkillModalComponent>,
		private skillsSvc: SkillsService,
		@Inject(MAT_DIALOG_DATA) public skill: Skill,
		private loadingSvc: LoadingLayerService,
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
		this.skillFormGroup.iconSize.setValue(this.skill.iconSize);
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
		this.loadingSvc.loading = true;
		let skillDTO = new SkillDTO(
			this.skillFormGroup.name.value,
			this.skillFormGroup.iconSize.value,
		);

		const _editSkill$ = this.skillsSvc
			.editSkill(skillDTO, this.skill.id)
			.pipe(catchError(this._skillErrorHandler.handleEditError));

		// if icon isn't null let's make a double request, one for update data and other for the icon
		if (this.iconFile) {
			_editSkill$.subscribe((editedSkill) => {
				const _uploadSkillIcon$ = this.skillsSvc
					.uploadSkillIcon(this.iconFile, this.skill.id)
					.pipe(catchError(this._skillErrorHandler.handleUploadIconError));
				_uploadSkillIcon$.subscribe((editedSkillWithUploadIcon) => {
					this.loadingSvc.loading = false;
					this.dialogRef.close(editedSkillWithUploadIcon);
				});
			});
			return;
		}

		// if icon is null let's make a single request for update data

		_editSkill$.subscribe((editedSkill: Skill) => {
			this.dialogRef.close(editedSkill);
			this.loadingSvc.loading = false;
		});
	}
}
