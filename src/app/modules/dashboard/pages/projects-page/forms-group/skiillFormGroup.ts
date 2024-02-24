import { FormControl, FormGroup, Validators } from '@angular/forms';

export class SkillFormGroup extends FormGroup {
  constructor() {
    let name = new FormControl('', [Validators.required]);
    let description = new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
    ]);
    let icon = new FormControl('', [Validators.required]);
    super({ name, description, icon });
  }

  get name() {
    return this.get('name') as FormControl;
  }

  get description() {
    return this.get!('description') as FormControl;
  }

  get icon() {
    return this.get('icon') as FormControl;
  }

  getNameErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a value' : '';
  }

  getDescriptionErrorMessage() {
    if (this.description.hasError('required')) {
      return 'You must enter a value';
    }

    return this.description.hasError('maxlength')
      ? 'The description just can has 255 characteres.'
      : '';
  }

  getIconErrorMessage() {
    return this.icon.hasError('required')
      ? 'You must enter an icon for this skill.'
      : '';
  }
}
