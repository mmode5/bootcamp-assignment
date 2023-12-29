import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minTwoWordsValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;

    if (!value) {
      return { minTwoWords: true };
    }

    const wordCount = value
      .split(/\s+/)
      .filter((word) => word.trim() !== '').length;

    return wordCount >= 2 ? null : { minTwoWords: true };
  };
}
