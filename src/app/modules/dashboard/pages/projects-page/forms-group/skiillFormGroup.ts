import { FormControl, FormGroup, Validators } from '@angular/forms';

export class SkillFormGroup extends FormGroup {
  constructor() {
    let name = new FormControl('', [Validators.required]);
    let icon = new FormControl('', [Validators.required]);
    let iconSize = new FormControl(100, [Validators.required]);
    super({ name, icon, iconSize });
  }

  get name() {
    return this.get('name') as FormControl;
  }

  get icon() {
    return this.get('icon') as FormControl;
  }
  
  get iconSize() {
    return this.get('iconSize') as FormControl;
  }

  getNameErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a value' : '';
  }

  getIconErrorMessage() {
    return this.icon.hasError('required')
      ? 'You must enter an icon for this skill.'
      : '';
  }  
  
  getIconSizeErrorMessage() {
    return this.icon.hasError('required')
      ? 'You must enter an icon size for this skill.'
      : '';
  }
}
