import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
import { switchMap } from 'rxjs';

@Component({
	selector: 'app-skills-table',
	templateUrl: './skills-table.component.html',
	styleUrl: './skills-table.component.scss',
	standalone: true,
	imports: [MatTableModule, MatPaginatorModule, MatIconModule, MatButtonModule],
	providers: [SkillsService],
})
export class SkillsTableComponent implements AfterViewInit, OnInit {
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;
	@ViewChild(MatTable) table!: MatTable<SkillsTableItem>;
	dataSource = new SkillsTableDataSource();

	/** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
	displayedColumns = ['id', 'name', 'description', 'icon', 'actions'];

	constructor(
		private skillSvc: SkillsService,
		private dialog: MatDialog,
	) {}

	ngOnInit(): void {
		this.skillSvc.getSkills().subscribe({
			next: (res) => this.dataSource.setSkills(res['hydra:member']),
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

		dialogRef.afterClosed().subscribe((result) => {
			if (result == false) return;
			this.dataSource.replaceSkillByIndex(result, index);
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
		dialogRef.componentInstance
			.onAccept()
			.pipe(switchMap(() => this.skillSvc.deleteSkill(skill.id)))
			.subscribe(() => {
        this.dataSource.deleteSkillByIndex(index)
        dialogRef.close();
      });
	}
}
