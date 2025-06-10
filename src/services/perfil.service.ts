import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, forkJoin, throwError } from 'rxjs';
import { Usuario } from 'src/models/usuario';
import { Publicacion } from 'src/models/publicacion.model';
import { Vehiculo } from 'src/models/vehiculo.model';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
obtenerPerfilPorId(id: number): Observable<any> {
  const headers = { Authorization: `Bearer ${this.authService.obtenerToken()}` };
  return this.http.get(`http://localhost:8080/api/usuarios/${id}`, { headers });
}
verificarSiSigo(idSeguido: number): Observable<{ siguiendo: boolean }> {
  const headers = { Authorization: `Bearer ${this.authService.obtenerToken()}` };
  return this.http.get<{ siguiendo: boolean }>(`http://localhost:8080/api/seguimientos/estado?idSeguido=${idSeguido}`, { headers });
}

seguir(idSeguido: number): Observable<any> {
  const headers = { Authorization: `Bearer ${this.authService.obtenerToken()}` };
  return this.http.post(`http://localhost:8080/api/seguimientos/seguir/${idSeguido}`, {}, { headers });
}

dejarDeSeguir(idSeguido: number): Observable<any> {
  const headers = { Authorization: `Bearer ${this.authService.obtenerToken()}` };
  return this.http.delete(`http://localhost:8080/api/seguimientos/dejar/${idSeguido}`, { headers });
}

  obtenerConteoSeguimiento(userId: number): Observable<any> {
  const API_URL = 'http://localhost:8080/api';
  const headers = { Authorization: `Bearer ${this.authService.obtenerToken()}` };
  return this.http.get(`${API_URL}/seguimientos/conteo?userId=${userId}`, { headers });
  }
 
  buscarUsuarios(query: string): Observable<Usuario[]> {
  const API_URL = 'http://localhost:8080/api/usuarios/buscar';
  const headers = { Authorization: `Bearer ${this.authService.obtenerToken()}` };
  return this.http.get<Usuario[]>(`${API_URL}?query=${query}`, { headers });
}
  constructor(private http: HttpClient, private authService: AuthService) {}
  obtenerPublicacionesUsuario(userId: number): Observable<Publicacion[]> {
    const headers = { Authorization: `Bearer ${this.authService.obtenerToken()}` };
    return this.http.get<Publicacion[]>(`http://localhost:8080/api/publicaciones/usuario/${userId}`, { headers });
  }

  obtenerVehiculosUsuario(userId: number): Observable<Vehiculo[]> {
    const headers = { Authorization: `Bearer ${this.authService.obtenerToken()}` };
    return this.http.get<Vehiculo[]>(`http://localhost:8080/api/vehiculos/usuario/${userId}`, { headers });
  }
  obtenerMiPerfil(): Observable<any> {
    const id = this.authService.getUserIdFromToken();
    const API_URL = 'http://localhost:8080/api'; // puerto backend
    if (id === null) {
      return throwError(() => new Error('ID de usuario no encontrado en el token'));
    }
  
    const headers = { Authorization: `Bearer ${this.authService.obtenerToken()}` };

    return forkJoin({
      usuario: this.http.get(`${API_URL}/usuarios/${id}`, { headers }),
      publicaciones: this.http.get(`${API_URL}/publicaciones/usuario/${id}`, { headers }),
      vehiculos: this.http.get(`${API_URL}/vehiculos/usuario/${id}`, { headers }),
    });
  }
  actualizarUsuario(usuario: Usuario): Observable<Usuario> {
  const headers = { Authorization: `Bearer ${this.authService.obtenerToken()}` };
  return this.http.put<Usuario>(`http://localhost:8080/api/usuarios/${usuario.id}`, usuario, { headers });
}

eliminarUsuario(id: number): Observable<void> {
  const headers = { Authorization: `Bearer ${this.authService.obtenerToken()}` };
  return this.http.delete<void>(`http://localhost:8080/api/usuarios/${id}`, { headers });
}
// Añade estos métodos a tu PerfilService
eliminarPublicacion(id: number) {
    const headers = { Authorization: `Bearer ${this.authService.obtenerToken()}` };
  return this.http.delete(`http://localhost:8080/api/publicaciones/${id}`, { headers });
}

editarPublicacion(id: number, publicacion: any) {
      const headers = { Authorization: `Bearer ${this.authService.obtenerToken()}` };

  return this.http.put(`http://localhost:8080/api/publicaciones/${id}`, publicacion,{ headers });
}

obtenerPublicacion(id: number) {
      const headers = { Authorization: `Bearer ${this.authService.obtenerToken()}` };

  return this.http.get<Publicacion>(`http://localhost:8080/api/publicaciones/${id}`,{ headers });
}
// perfil.service.ts

editarVehiculo(id: number, vehiculo: any) {
  const headers = { Authorization: `Bearer ${this.authService.obtenerToken()}` };
  return this.http.put(`http://localhost:8080/api/vehiculos/${id}`, vehiculo, { headers });
}

eliminarVehiculo(id: number) {
  const headers = { Authorization: `Bearer ${this.authService.obtenerToken()}` };
  return this.http.delete(`http://localhost:8080/api/vehiculos/${id}`, { headers });
}

}
