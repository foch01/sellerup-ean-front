import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.less'],
})
export class ForgotPasswordComponent implements OnInit {
    validateForm: FormGroup;
    constructor(private fb: FormBuilder, public authService: AuthService) {}

    ngOnInit() {
        this.validateForm = this.fb.group({
            email: [null, [Validators.email, Validators.required]],
        });
    }

    async submitForm(): Promise<void> {
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();
        }
        await this.authService.ForgotPassword(this.validateForm.value.email);
    }
}
