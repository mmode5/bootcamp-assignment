import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  constructor(private http: HttpClient) {}

  createBlog(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${environment.token}`,
    });

    return this.http.post(`${environment.apiBase}/blogs`, formData, {
      headers,
    });
  }
}
