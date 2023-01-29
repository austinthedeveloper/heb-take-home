import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentUI, Login, LoginResponse } from '@pizza/interfaces';
import { tap, BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: BehaviorSubject<string> = new BehaviorSubject('');
  token$ = this.token.asObservable();
  loggedIn$ = this.token$.pipe(map((token) => !!token));
  constructor(
    private http: HttpClient,
    @Inject('environment') private environment: EnvironmentUI
  ) {}

  login(obj: Login) {
    return this.http
      .post<LoginResponse>(`${this.environment.apiUrl}auth`, obj)
      .pipe(tap((res) => this.token.next(res.access_token)));
  }

  getAuthToken(): string {
    return this.token.value;
  }

  logout() {
    this.token.next('');
  }
}
