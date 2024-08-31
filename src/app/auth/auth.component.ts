import { HttpResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  loginMode = true;
  isLoading = false;
  error = null;
  closeAlertSub: Subscription;

  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver // Deprecated, we can pass the class reference directly.
  ) {}

  switchMode() {
    this.loginMode = !this.loginMode;
  }

  onSubmit(form: NgForm) {
    //don't forget that submit logic is not handled on the buttons ! >:(

    if (form.invalid) return;

    const email = form.value.email;
    const password = form.value.password;
    let authObs$: Observable<any>;

    this.isLoading = true;
    this.error = null;
    if (this.loginMode) {
      // The following is a really nice trick! create an variable and insert multi values in it to handle the same code to who ever is inside.
      authObs$ = this.authService.singIn(email, password);
    } else {
      authObs$ = this.authService.signUp(email, password);
    }

    authObs$.subscribe(
      (res) => {
        console.log(res);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (errorMessage) => {
        //this handler should only be concerned with the final error message related to the UI!
        this.isLoading = false;
        //this.error = errorMessage;
        this.showErrorMessage(errorMessage);
      }
    );

    form.reset();
  }

  handleClose() {
    this.error = null;
  }

  showErrorMessage(message: string) {
    //! this is the older approach but now no need to create a factory !
    // const alertComponentFactory =
    //   this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    //*new approach */
    this.alertHost.VRC.clear();
    const alertComponent = this.alertHost.VRC.createComponent(AlertComponent);

    alertComponent.instance.message = message;

    this.closeAlertSub = alertComponent.instance.close.subscribe(() => {
      this.alertHost.VRC.clear();
      this.closeAlertSub.unsubscribe();
    });
  }
}
