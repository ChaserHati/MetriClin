import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

interface TokenResponse {
  token: string;
}

export interface InfoAuth {
  rut: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/login';
  private http = inject(HttpClient);

  constructor() { }

  login(infoAuth: InfoAuth) {
    return this.http.post<TokenResponse>(this.apiUrl, infoAuth);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }


}
