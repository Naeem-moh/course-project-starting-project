import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http
      .post<any>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDAkPcSwskfAlLwWK15g_E4VP7X9cBXbqA',
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
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDAkPcSwskfAlLwWK15g_E4VP7X9cBXbqA',
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
    console.log(expirationDate);

    const user: User = new User(
      userData.email,
      userData.localId,
      userData.idToken,
      expirationDate
    );
    console.log(user);
    this.user$.next(user);
  }
}
