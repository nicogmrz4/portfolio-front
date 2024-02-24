import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NavegationComponent } from './components/navegation/navegation.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import { SkillsPageComponent } from './pages/skills-page/skills-page.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ProjectsTableComponent } from './pages/projects-page/components/projects-table/projects-table.component';
import { HttpClientModule } from '@angular/common/http';
import { NewProjectModalComponent } from './pages/projects-page/components/new-project-modal/new-project-modal.component';
import { SkillsTableComponent } from './pages/skills-page/components/skills-table/skills-table.component';
import { MatInputModule } from '@angular/material/input';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DashboardComponent,
    HttpClientModule,
  ],
  providers: [],
})
export class DashboardModule {}
