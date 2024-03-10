import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import { SkillsPageComponent } from './pages/skills-page/skills-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';

const routes: Routes = [
	{
		path: '',
		component: DashboardComponent,
		canActivate: [authGuard],
		children: [
			{ path: 'projects', component: ProjectsPageComponent },
			{ path: 'skills', component: SkillsPageComponent },
		],
	},
	{ path: 'login', component: LoginPageComponent, canActivate: [loginGuard] },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class DashboardRoutingModule {}
