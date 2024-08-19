import { AuthService } from './auth.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  loginMode = false;
  isLoading = false;
  error = null;

  constructor(private authService: AuthService) {}

  switchMode() {
    this.loginMode = !this.loginMode;
  }

  onSubmit(form: NgForm) {
    //don't forget that submit logic is not handled on the buttons ! >:(

    if (form.invalid) return;

    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;
    this.error = null;
    if (this.loginMode) {
      //...
    } else {
      this.authService.signUp(email, password).subscribe(
        (res) => {
          console.log(res);
          this.isLoading = false;
        },
        (error) => {
          console.log(error);
          this.isLoading = false;
          this.error = error.message;
        }
      );
    }

    form.reset();
  }
}
