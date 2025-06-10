import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AuthRequest } from 'src/models/auth-request';
import { AuthResponse } from 'src/models/auth-response';
import { Usuario } from 'src/models/usuario';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from 'src/models/decoded-token';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',


})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials);
  }

  guardarToken(token: string) {
    localStorage.setItem('token', token);
  }

  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  cerrarSesion() {
    localStorage.removeItem('token');
  }
  registrarUsuario(usuario: Partial<Usuario>): Observable<Usuario> {
  return this.http.post<Usuario>(`${environment.apiUrl}/usuarios`, usuario);
}

getUserIdFromToken(): number | null {
  const token = this.obtenerToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.id;
  } catch (e) {
    console.error('Error al decodificar token:', e);
    return null;
  }
}

logout(): void {
  localStorage.removeItem('token');
  this.router.navigate(['/login']);  // redirección programática
}
getUserIdFromTokenArchivos(): number | null {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id || payload.userId; // según cómo esté definido tu token
  } catch (e) {
    return null;
  }
}


}
