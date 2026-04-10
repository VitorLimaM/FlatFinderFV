import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flat } from './Models/flat.model';

@Injectable({
  providedIn: 'root'
})
export class FlatService {

  private apiUrl = 'http://localhost:3000/api/flats';   // ← DEV B URL

  constructor(private http: HttpClient) {}

  createFlat(flat: Flat): Observable<Flat> {
    return this.http.post<Flat>(this.apiUrl, flat);
  }

  // Métodos que você vai usar nos próximos dias (já deixa criado)
  getAllFlats(): Observable<Flat[]> {
    return this.http.get<Flat[]>(this.apiUrl);
  }

  getMyFlats(userId: string): Observable<Flat[]> {
    return this.http.get<Flat[]>(`${this.apiUrl}/owner/${userId}`);
  }

  getFlatById(id: string): Observable<Flat> {
    return this.http.get<Flat>(`${this.apiUrl}/${id}`);
  }

  updateFlat(id: string, flat: Partial<Flat>): Observable<Flat> {
    return this.http.put<Flat>(`${this.apiUrl}/${id}`, flat);
  }

  deleteFlat(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}