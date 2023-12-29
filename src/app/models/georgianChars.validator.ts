import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function georgianCharsValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;

    if (!value) {
      return { georgianChars: true };
    }

    const georgianRegex = /^[ა-ჰ ]+$/;
    const isValid = georgianRegex.test(value);

    return isValid ? null : { georgianChars: true };
  };
}
