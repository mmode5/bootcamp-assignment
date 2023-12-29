import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Categories } from '../models/categories.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Categories> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${environment.token}`,
    });

    return this.http.get<Categories>(`${environment.apiBase}/categories`, {
      headers,
    });
  }
}
