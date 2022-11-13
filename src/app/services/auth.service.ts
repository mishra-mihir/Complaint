import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(formData) {
    return this.http.post('http://localhost:3000/login', formData);
  }

  checkAuth(token) {
    return this.http.post('http://localhost:3000/auth', { 'token': token });
  }
}
