import { FormGroup } from '@angular/forms';

export class UserValidator {
  static passwordRequired(form: FormGroup): {[key: string]: boolean} | null {
    const password = form.get('password').value;
    const id = form.get('id').value;

    if (!id && (!password || password === '')) {
      return { passwordIsRequired: true };
    }
    return null;
  }
}
