import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDAkPcSwskfAlLwWK15g_E4VP7X9cBXbqA',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }
}
