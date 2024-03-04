import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProjectsTableDataSource } from './projects-table-datasource';
import { ProjectsService } from '@modules/dashboard/services/projects.service';
import { Project } from '@modules/dashboard/interfaces/project';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { EditProjectModalComponent } from '../edit-project-modal/edit-project-modal.component';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from '@modules/dashboard/components/confirm-dialog/confirm-dialog.component';
import { switchMap } from 'rxjs';
import { LoadingLayerService } from '@modules/dashboard/services/loading-layer.service';

@Component({
	selector: 'app-projects-table',
	templateUrl: './projects-table.component.html',
	styleUrl: './projects-table.component.scss',
	standalone: true,
	imports: [
		MatTableModule,
		MatPaginatorModule,
		MatIconModule,
		MatButtonModule,
		CommonModule,
	],
	providers: [ProjectsService],
})
export class ProjectsTableComponent implements AfterViewInit, OnInit {
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;
	@ViewChild(MatTable) table!: MatTable<Project>;
	dataSource = new ProjectsTableDataSource();
	targetIndexEdited!: number;

	constructor(
		private projectsSvc: ProjectsService,
		private loadingSvc: LoadingLayerService,
		private dialog: MatDialog,
	) {}

	/** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
	displayedColumns = ['id', 'name', 'description', 'actions'];

	ngOnInit(): void {
		this.loadingSvc.loading = true;
		this.projectsSvc.getProjects().subscribe({
			next: (res) => {
				this.dataSource.setProjects(res['hydra:member']);
				this.loadingSvc.loading = false;
			},
		});
	}

	ngAfterViewInit(): void {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
		this.table.dataSource = this.dataSource;
	}

	edit(project: Project, index: number) {
		this.targetIndexEdited = index;
		this.openEditDialog(project);
	}

	openEditDialog(project: Project): void {
		const dialogRef = this.dialog.open(EditProjectModalComponent, {
			data: project,
			width: '750px',
			autoFocus: false,
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				console.log(result);
				this.dataSource.replaceByIndex(result, this.targetIndexEdited);
			}
		});
	}

	openConfirmDelete(project: Project, index: number): void {
		// Open confirm dialog
		const dialogRef = this.dialog.open(ConfirmDialogComponent, {
			data: {
				title: 'Are you sure to proced?',
				content: `
          Project ${project.name} with id ${project.id} will deleted permanently.
          After delete this element, it can\'t do be able to recovery.
        .`,
			},
			width: '300px',
			autoFocus: false,
		});

		// On accept dialog
		dialogRef.componentInstance
			.onAccept()
			.pipe(
				switchMap(() => {
					this.loadingSvc.loading = true;
					return this.projectsSvc.deleteProject(project.id);
				}),
			)
			.subscribe(() => {
				this.loadingSvc.loading = false;
				this.dataSource.deleteByIndex(index);
				dialogRef.close();
			});
	}
}
