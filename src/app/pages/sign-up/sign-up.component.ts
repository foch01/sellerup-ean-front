import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.less'],
})
export class SignUpComponent implements OnInit {
    validateForm: FormGroup;
    constructor(private fb: FormBuilder, public authService: AuthService) {}

    ngOnInit() {
        this.validateForm = this.fb.group({
            email: [null, [Validators.email, Validators.required]],
            password: [null, [Validators.required]],
        });
    }

    async submitForm(): Promise<void> {
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();
        }

        await this.authService.SignUp(this.validateForm.value.email, this.validateForm.value.password);
    }
}
