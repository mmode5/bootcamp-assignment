import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private http: HttpClient) {}

  getAllBlogs(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${environment.token}`,
    });

    return this.http.get(`${environment.apiBase}/blogs`, { headers });
  }

  getBlog(blogId: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${environment.token}`,
    });

    return this.http.get(`${environment.apiBase}/blogs/${blogId}`, { headers });
  }
}
