import { FormControl, FormGroup, Validators } from '@angular/forms';

export class ProjectFormGroup extends FormGroup {
  constructor() {
    let name = new FormControl('', [Validators.required]);
    let description = new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
    ]);
    let preview = new FormControl('', [Validators.required]);
    super({ name, description, preview });
  }

  get name() {
    return this.get('name') as FormControl;
  }

  get description() {
    return this.get!('description') as FormControl;
  }

  get preview() {
    return this.get('preview') as FormControl;
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

  getPreviewErrorMessage() {
    return this.preview.hasError('required')
      ? 'You must enter a preview for this project.'
      : '';
  }
}
