import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/auth-services/authentication.service';
import { PasswordStrengthValidator } from '../../../helpers';
import { ErrorDetails } from 'src/app/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: any = new FormGroup({});
  countryCode = '+94';
  loginType = [
    {
      id: 1,
      name: 'Phone'
    },
    {
      id: 2,
      name: 'E-mail'
    }
  ];
  selectedType = {
    id: 1,
    name: 'Phone'
  };
  showPassword = false;
  isButtonLoading = false;
  submitted = false;
  phone = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      phoneNumber: ['', [Validators.required]],
      password: ['',
        Validators.compose([
          Validators.required, Validators.minLength(8), PasswordStrengthValidator])
      ],
      isPhone: this.selectedType.id === 1 ? true : false,
      roles: {
        id: 'f6f3e77c-c762-4416-9da6-d94eaa69cd43',
        name: 'admin'
      }
    });
  }

  get loginFormControl(): any {
    return this.loginForm.controls;
  }

  setFormControl(type: number): void {
    if (type === 1) {
      this.loginForm.removeControl('email');
      this.loginForm.addControl('phoneNumber', new FormControl('', Validators.required));
    } else {
      this.loginForm.removeControl('phoneNumber');
      this.loginForm.addControl('email', new FormControl('', [Validators.required, Validators.email]));
    }
  }

  selectType(type: any): void {
    this.selectedType = type;
    this.setFormControl(type.id);
  }

  makeShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  selectCode(): any {
    const phone = this.loginForm.get('phoneNumber').value;
    return this.countryCode + parseInt(phone, 10);
  }

  signIn(): void {
    this.loginForm.get('phoneNumber').patchValue(this.selectCode());
    this.submitted = true;
    const isPhone = this.selectedType.id === 1 ? true : false;
    this.loginForm.get('isPhone').patchValue(isPhone);
    if (this.loginForm.valid) {
      this.submitted = false;
      this.authService.login(this.loginForm.value).subscribe((res: any) => {
        localStorage.setItem('token', res.result.token);
        window.location.href = '/home';
      }, (err: any) => {
        const error = new ErrorDetails(err.error.error);
        this.toaster.error(error.detail, 'Failed!');
      });
    }
  }

  isButtonEnabled(): boolean {
    return this.loginForm.valid;
  }

}
