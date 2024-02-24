import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewProjectModalComponent } from './components/new-project-modal/new-project-modal.component';
import { ProjectsTableComponent } from './components/projects-table/projects-table.component';
import { MatButtonModule } from '@angular/material/button';
import { Project } from '@modules/dashboard/interfaces/project';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.scss',
  standalone: true,
  imports: [
    ProjectsTableComponent,
    MatButtonModule
  ]
})
export class ProjectsPageComponent {
  @ViewChild(ProjectsTableComponent) private projectsTable!: ProjectsTableComponent;
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(NewProjectModalComponent, {
      width: '750px',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe((project?: Project) => {
      if (project) {
        this.projectsTable.dataSource.addProject(project);
      }
    });
  }
}
