import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
	MatDialogActions,
	MatDialogClose,
	MatDialogContent,
	MatDialogRef,
	MatDialogTitle,
} from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatError, MatHint, MatInputModule } from '@angular/material/input';
import { SkillDTO } from '@modules/dashboard/dto/skillDTO';
import { SkillFormGroup } from '@modules/dashboard/pages/projects-page/forms-group/skiillFormGroup';
import { SkillsService } from '@modules/dashboard/services/skills.service';
import { fileToDataURL } from '@utils/index';
import { catchError, switchMap } from 'rxjs';
import { SkillCardComponent } from '@modules/home/components/skill-card/skill-card.component';
import { LoadingLayerService } from '@modules/dashboard/services/loading-layer.service';
import { SkillErrorHandler } from '@modules/dashboard/handlers/skillErrorHandler';

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
		MatSliderModule,
		SkillCardComponent,
		HttpClientModule,
	],
	templateUrl: './new-skill-modal.component.html',
	styleUrl: './new-skill-modal.component.scss',
})
export class NewSkillModalComponent {
	_skillErrorHandler: SkillErrorHandler = inject(SkillErrorHandler);

	iconFile!: File;
	iconAsDataURL: string = '';
	skillFormGroup: SkillFormGroup = new SkillFormGroup();

	constructor(
		private dialogRef: MatDialogRef<NewSkillModalComponent>,
		private skillsSvc: SkillsService,
		private loadingSvc: LoadingLayerService
	) {}

	formatLabel(value: number): string {
		return `${value}px`;
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

		const _createSkill$ = this.skillsSvc.createSkill(skillDTO)
			.pipe(catchError(this._skillErrorHandler.handleCreateError));

		_createSkill$.subscribe((newSkill) => {
			const _uploadSkillIcon$ = this.skillsSvc.uploadSkillIcon(this.iconFile, newSkill.id)
				.pipe(catchError(this._skillErrorHandler.handleUploadIconError))
			_uploadSkillIcon$.subscribe((skill) => {
				this.loadingSvc.loading = false;
				this.dialogRef.close(skill);
			})
		})
	}
}
