import { AbstractControl, ValidationErrors } from '@angular/forms';

export const PasswordStrengthValidator = (control: AbstractControl): ValidationErrors | any => {

  const value: string = control.value || '';
  if (!value) {
    return null;
  }

  const upperCaseCharacters = /[A-Z]+/g;
  const lowerCaseCharacters = /[a-z]+/g;
  const numberCharacters = /[0-9]+/g;
  const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  if (
    upperCaseCharacters.test(value) === false ||
    lowerCaseCharacters.test(value) === false ||
    numberCharacters.test(value) === false ||
    specialCharacters.test(value) === false
  ) {
    return {
      passwordStrength: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special characters.'
    };
  }
}
