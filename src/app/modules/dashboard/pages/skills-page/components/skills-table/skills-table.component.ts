import {
	AfterViewInit,
	Component,
	OnInit,
	ViewChild,
	inject,
} from '@angular/core';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
	SkillsTableDataSource,
	SkillsTableItem,
} from './skills-table-datasource';
import { SkillsService } from '@modules/dashboard/services/skills.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { EditSkillModalComponent } from '../edit-skill-modal/edit-skill-modal.component';
import { Skill } from '@modules/dashboard/interfaces/skill';
import { ConfirmDialogComponent } from '@modules/dashboard/components/confirm-dialog/confirm-dialog.component';
import { catchError } from 'rxjs';
import { LoadingLayerService } from '@modules/dashboard/services/loading-layer.service';
import { ProjectErrorHandler } from '@modules/dashboard/handlers/projectErrorHandler';
import { SkillErrorHandler } from '@modules/dashboard/handlers/skillErrorHandler';

@Component({
	selector: 'app-skills-table',
	templateUrl: './skills-table.component.html',
	styleUrl: './skills-table.component.scss',
	standalone: true,
	imports: [MatTableModule, MatPaginatorModule, MatIconModule, MatButtonModule],
})
export class SkillsTableComponent implements AfterViewInit, OnInit {
	_skillErrorHandler: SkillErrorHandler = inject(SkillErrorHandler);

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;
	@ViewChild(MatTable) table!: MatTable<SkillsTableItem>;
	dataSource = new SkillsTableDataSource();

	/** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
	displayedColumns = ['id', 'name', 'icon', 'actions'];

	constructor(
		private skillSvc: SkillsService,
		private dialog: MatDialog,
		private loadingSvc: LoadingLayerService,
	) {}

	ngOnInit(): void {
		this.loadingSvc.loading = true;
		const _getSkills$ = this.skillSvc
			.getSkills()
			.pipe(catchError(this._skillErrorHandler.handleLoadError));

		_getSkills$.subscribe((res) => {
			this.dataSource.setSkills(res['hydra:member']);
			this.loadingSvc.loading = false;
		});
	}

	ngAfterViewInit(): void {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
		this.table.dataSource = this.dataSource;
	}

	openEditSkillModal(skill: Skill, index: number) {
		const dialogRef = this.dialog.open(EditSkillModalComponent, {
			width: '750px',
			autoFocus: false,
			data: skill,
		});

		dialogRef.afterClosed().subscribe((skill?: Skill) => {
			if (skill) {
				this.dataSource.replaceSkillByIndex(skill, index);
			}
		});
	}

	openConfirmDelete(skill: Skill, index: number): void {
		// Open confirm dialog
		const dialogRef = this.dialog.open(ConfirmDialogComponent, {
			data: {
				title: 'Are you sure to proced?',
				content: `
          Skill ${skill.name} with id ${skill.id} will deleted permanently.
          After delete this element, it can\'t do be able to recovery.
        .`,
			},
			width: '300px',
			autoFocus: false,
		});

		// On accept dialog
		dialogRef.componentInstance.onAccept().subscribe(() => {
			this.onConfirmDelete(skill.id).subscribe(() => {
				this.dataSource.deleteSkillByIndex(index);
				this.loadingSvc.loading = false;
				dialogRef.close();
			});
		});
	}

	onConfirmDelete(skillId: number) {
		this.loadingSvc.loading = true;
		return this.skillSvc
			.deleteSkill(skillId)
			.pipe(catchError(this._skillErrorHandler.handleDeleteError));
	}
}
