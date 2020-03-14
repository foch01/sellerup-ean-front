import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.less'],
})
export class SignInComponent implements OnInit {
    validateForm: FormGroup;
    constructor(public authService: AuthService, private fb: FormBuilder) {}

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            email: [null, [Validators.email, Validators.required]],
            password: [null, [Validators.required]],
            remember: [true],
        });
    }
    async submitForm(): Promise<void> {
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();
        }
        await this.authService.SignIn(this.validateForm.value.email, this.validateForm.value.password);
    }
}
