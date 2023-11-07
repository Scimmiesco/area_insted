import { AbstractControl } from '@angular/forms';

export class CustomValidations {
  static validateCpf(control: AbstractControl) {
    const cpf = control.value as string;
    let sum: number = 0;
    let resto: number;
    let isValid: boolean;

    const regex = new RegExp('[0-9]{11}');

    if (cpf.length < 1) {
      return null;
    }

    if (
      cpf == '00000000000' ||
      cpf == '11111111111' ||
      cpf == '22222222222' ||
      cpf == '33333333333' ||
      cpf == '44444444444' ||
      cpf == '55555555555' ||
      cpf == '66666666666' ||
      cpf == '77777777777' ||
      cpf == '88888888888' ||
      cpf == '99999999999' ||
      !regex.test(cpf)
    )
      isValid = false;
    else {
      for (let i = 1; i <= 9; i++)
        sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
      resto = (sum * 10) % 11;

      if (resto == 10 || resto == 11) resto = 0;
      if (resto != parseInt(cpf.substring(9, 10))) isValid = false;

      sum = 0;
      for (let i = 1; i <= 10; i++)
        sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
      resto = (sum * 10) % 11;

      if (resto == 10 || resto == 11) resto = 0;
      if (resto != parseInt(cpf.substring(10, 11))) isValid = false;
      isValid = true;
    }

    if (isValid) return null;

    return { isCpfInvalid: true };
  }
  static matchInputs(controlName1: string, controlName2: string) {
    return (formGroup: AbstractControl) => {
      const control1 = formGroup.get(controlName1);
      const control2 = formGroup.get(controlName2);

      if (control1 && control2) {
        const value1 = control1.value;
        const value2 = control2.value;

        if (value1 !== value2) {
          control2.setErrors({ matchInputs: true });
          return { matchInputs: true };
        } else {
          control2.setErrors(null);
          return null;
        }
      } else {
        return null;
      }
    };
  }
}
