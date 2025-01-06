import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Species } from '../../model/species';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {
  private baseUrl = `${environment.apiUrl}v1/species`;

  constructor(private http: HttpClient) {}

  getSpecies(page: number, size: number, category?: string): Observable<any> {
    const categoryParam = category ? `category=${category}&` : '';
    return this.http.get<any>(`${this.baseUrl}?${categoryParam}page=${page}&size=${size}`);
  }

  create(species: Species): Observable<Species> {
    return this.http.post<Species>(this.baseUrl, species);
  }

  update(species: Species): Observable<Species> {
    return this.http.put<Species>(`${this.baseUrl}`, species);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
