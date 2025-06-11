import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/services/auth.service';
import { IonButton, IonLabel, IonGrid, IonRow, IonHeader, IonToolbar, IonTitle, IonItem, IonTextarea, IonCol, IonContent, IonApp, IonFooter } from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-crear-publicaciones',
  templateUrl: './crear-publicaciones.component.html',
  styleUrls: ['./crear-publicaciones.component.scss'],
  standalone: true,
  imports: [IonFooter, IonApp, 
    IonCol, 
    IonHeader,
    IonButton,
    IonLabel,
    IonGrid,
    IonRow,
    IonToolbar,
    IonTitle,
    IonItem,
    IonTextarea,
    IonContent,
    FormsModule,
    CommonModule,
    RouterLink,
    
  ]
})

export class CrearPublicacionComponent {
  pieDeFoto = '';
  urlImagen: string = '';
  imagenesSubidas: string[] = [];
  backendUrl = 'http://localhost:8080/api/archivos';

  constructor(private http: HttpClient, private authService: AuthService,private router: Router) {}
  cerrarSesion() {
    this.authService.logout();
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const token = this.authService.obtenerToken();
    if (!token) {
      alert('No estás autenticado');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.post('http://localhost:8080/api/archivos/subir', formData, {
      headers,
      responseType: 'text'
    }).subscribe({
      next: (url: string) => {
        this.urlImagen = url;
        this.imagenesSubidas.push(url);
        console.log('Imagen subida en: ', url);
      },
      error: err => {
        console.error(err);
        alert('Error al subir imagen');
      }
    });
  }

  crearPublicacion() {
    const userId = this.authService.getUserIdFromToken();
    const token = this.authService.obtenerToken();

    if (!userId || !token) {
      alert('No estás autenticado');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const publicacion = {
      pieDeFoto: this.pieDeFoto,
      seccion: null,
      fotos: this.imagenesSubidas.map(url => ({ url }))
    };

    this.http.post(`http://localhost:8080/api/publicaciones/usuario/${userId}`, publicacion, { headers })
      .subscribe({
        next: res => {
          alert('Publicación creada');
          // Limpia el formulario si quieres
          this.pieDeFoto = '';
          this.imagenesSubidas = [];
        },
        error: err => {
          console.error(err);
          alert('Error al crear publicación');
        }
      });
  }
   salir() {
    this.router.navigate(['/perfil/+this.publicacion.usuario?.id]);']);
  }
}