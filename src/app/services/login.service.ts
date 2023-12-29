import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LogIn } from '../models/categories.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  logIn(formData: FormData): Observable<LogIn> {
    console.log(formData);
    return this.http.post<LogIn>(
      'https://api.blog.redberryinternship.ge/api/login',
      formData
    );
  }
}
