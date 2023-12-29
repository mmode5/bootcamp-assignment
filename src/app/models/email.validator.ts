import { AbstractControl, ValidationErrors } from '@angular/forms';

export function redberryEmailValidator(
  control: AbstractControl
): ValidationErrors | null {
  const email = control.value;

  if (!email || email.endsWith('@redberry.ge')) {
    return null;
  } else {
    return { invalidRedberryEmail: true };
  }
}
