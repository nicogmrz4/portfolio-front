import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Title } from '@angular/platform-browser';
import { LoginFormGroup } from './loginFormGroup';
import { AuthService } from '@modules/dashboard/services/auth.service';
import { CredentialsDTO } from '@modules/dashboard/dto/credentialsDTO';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login-page',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatInputModule,
		MatCardModule,
		MatButtonModule,
	],
	templateUrl: './login-page.component.html',
	styleUrl: './login-page.component.scss',
})
export class LoginPageComponent implements OnInit {
	// Services
	private readonly router: Router = inject(Router);
	private readonly titleSvc: Title = inject(Title);
	private readonly authSvc: AuthService = inject(AuthService);

	loginFormGroup: LoginFormGroup = new LoginFormGroup();

	ngOnInit(): void {
		this.titleSvc.setTitle('Dashboard - Login');
	}

	onSubmit() {
		let creadentials = new CredentialsDTO(
			this.loginFormGroup.username.value,
			this.loginFormGroup.password.value,
		);

		this.authSvc.login(creadentials).subscribe({
			next: (res) => {
				this.authSvc.setToken(res.token);
				this.router.navigate(['/dashboard']);
			},
		});
	}
}
