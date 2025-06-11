// feed.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Publicacion } from 'src/models/publicacion.model';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class FeedService {
  private baseUrl = 'http://localhost:8080/api/feed';

  constructor(private http: HttpClient, private authService:AuthService) {}

  getGlobalFeed(page: number, size: number): Observable<Publicacion[]> {
    return this.http.get<Publicacion[]>(`${this.baseUrl}/global?page=${page}&size=${size}`);
  }

  getFeedSiguiendo(id: number, page: number, size: number): Observable<Publicacion[]> {
        const headers = { Authorization: `Bearer ${this.authService.obtenerToken()}` };

  return this.http.get<Publicacion[]>(`${this.baseUrl}/siguiendo/${id}?page=${page}&size=${size}`, { headers });
}

}
