import { Component, Inject } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../authentication.service';
import { LibraryConfig } from '../../models/config';

@Component({
  selector: 'lib-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  loginForm: UntypedFormGroup;

  error: string = null;

  constructor(
      private authService: AuthenticationService,
      private router: Router,
      @Inject('config') private config: LibraryConfig) {
    
        this.loginForm = new UntypedFormGroup({
        username: new UntypedFormControl(null, Validators.required),
        password: new UntypedFormControl(null, Validators.required)
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
        this.loginForm.markAllAsTouched();
        return;
    }
    const user = this.loginForm.value;
    this.authService.login(user)
    .pipe(first())
    .subscribe(
      data => {
          this.router.navigate([this.config.initialPage]);
      },
      error => {
          this.error = error;
      });
    }


    isControlInvalid(controlName: string): boolean {
      const control = this.loginForm.get(controlName);
      return control.touched && control.invalid;
    }
}
