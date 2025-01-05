import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Competition} from "../../model/competition";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {
  private baseUrl = `${environment.apiUrl}v1/competitions`;
  constructor(private http: HttpClient) { }

  getCompetitions(page: number , size: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?page=${page}&size=${size}`);
  }

  create(competition: Competition): Observable<Competition> {
    return this.http.post<Competition>(this.baseUrl, competition);
  }

  update(competition: Competition): Observable<Competition> {
    return this.http.put<Competition>(`${this.baseUrl}`, competition);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getById(id: string): Observable<Competition> {
    return this.http.get<Competition>(`${this.baseUrl}/${id}`);
  }
}
