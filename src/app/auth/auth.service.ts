import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ = new BehaviorSubject<User>(null);
  tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string) {
    return this.http
      .post<any>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          environment.FIREBASE_API_KEY,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.errorHandle),
        tap(this.handleAuthentication.bind(this))
      );
  }

  singIn(email: string, password: string) {
    return this.http
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          environment.FIREBASE_API_KEY,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.errorHandle),
        tap(this.handleAuthentication.bind(this))
      );
  }

  logout() {
    this.user$.next(null);
    this.router.navigate(['auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

  autoLogout(tokenExpirationDate: number) {
    // what will happen if the user logs out before the timer is finished?
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, tokenExpirationDate);
  }

  private errorHandle(error) {
    console.log(error);
    let errorMessage = 'Unknown Error Occurred';

    if (!error?.error?.error?.message) return errorMessage;
    switch (error.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage =
          'The email address is already in use by another account.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage =
          'There is no user record corresponding to this identifier. The user may have been deleted.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage =
          'The password is invalid or the user does not have a password.';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'Invalid Username Or Password';
      default:
    }

    //need to return cause this is an observable
    return throwError(errorMessage);
  }

  private handleAuthentication(userData) {
    // At this point we are 100% sure we have the user data cause the server will not response with 200 and angular will not ignore a network error if everything is not totally fine.
    const expirationDate = new Date(
      new Date().getTime() + +userData.expiresIn * 1000
    );

    const user: User = new User(
      userData.email,
      userData.localId,
      userData.idToken,
      expirationDate
    );
    console.log(user);
    this.user$.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    this.autoLogout(userData.expiresIn * 1000);
  }

  autoLog(): void {
    //this is not a user object, it's a parsed object with no methods cause they are not enumerable.
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (!userData) return;

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (!loadedUser.token) return;

    this.user$.next(loadedUser);

    this.autoLogout(
      new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
    );
  }
}
