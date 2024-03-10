import { FormControl, FormGroup, Validators } from '@angular/forms';

export class LoginFormGroup extends FormGroup {
	constructor() {
		let username = new FormControl('', [Validators.required]);
		let password = new FormControl('', [Validators.required]);
		super({ username, password });
	}

	get username() {
		return this.get('username') as FormControl;
	}

	get password() {
		return this.get!('password') as FormControl;
	}

	getUsernameErrorMessage() {
		return this.username.hasError('required') ? 'You must enter a value' : '';
	}

	getPreviewErrorMessage() {
		return this.password.hasError('required') ? 'You must enter a value' : '';
	}
}
