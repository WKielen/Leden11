import { AbstractControl } from '@angular/forms';

export class PasswordValidators {
    static passwordsShouldMatch(control: AbstractControl) {
        const pw1 = control.get('password1');
        const pw2 = control.get('password2');

        if (pw1.value !== pw2.value) {
            return { passwordsShouldMatch: true };
        }
        return null;
    }

}
