import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Usuario } from 'src/models/usuario';
import { Vehiculo } from 'src/models/vehiculo.model';
import { Publicacion } from 'src/models/publicacion.model';
import { AuthService } from 'src/services/auth.service';
import { PerfilService } from 'src/services/perfil.service';

import { 
  IonHeader, IonItem, IonContent, IonToolbar, IonLabel, 
  IonInput, IonCard, IonCardHeader,  
  IonToggle,  IonApp, IonFooter } from "@ionic/angular/standalone";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  standalone: true,
  imports: [IonFooter, IonApp, 
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonContent,
    IonCard,
    IonCardHeader,
    IonItem,
    IonLabel,
    IonInput,
    IonToggle,
    RouterLink,
    IonFooter
  ]
})
export class PerfilComponent implements OnInit {
  usuario: Usuario = {
    id: 0,
    nombre: '',
    apellidos: '',
    nombreUsuario: '',
    correo: '',
    contrasena: '',
    fotoPerfil: '',
    privado: false,
    verificado: false,
    fechaRegistro: new Date()
  };
  
  publicaciones: Publicacion[] = [];
  vehiculos: Vehiculo[] = [];
  mostrarAjustes = false;
  seguidoresCount = 0;
  siguiendoCount = 0;
  selectedFile: File | null = null;
  backendUrl = 'http://localhost:8080/api/archivos';
  publicacionEditando: Publicacion | null = null;

  constructor(
    private perfilService: PerfilService,
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarPerfil();
  }
  cerrarSesion() {
      this.authService.logout();
  }
  cargarPerfil() {
    this.perfilService.obtenerMiPerfil().subscribe({
      next: (data) => {
        this.usuario = data.usuario;
        this.publicaciones = data.publicaciones;
        this.vehiculos = data.vehiculos;
        this.obtenerConteoSeguimiento();
      },
      error: (err) => {
        console.error('Error cargando perfil:', err);
      }
    });
  }

  obtenerConteoSeguimiento() {
    this.perfilService.obtenerConteoSeguimiento(this.usuario.id).subscribe({
      next: (countData) => {
        this.seguidoresCount = countData.seguidores;
        this.siguiendoCount = countData.siguiendo;
      },
      error: (err) => {
        console.error('Error obteniendo conteo de seguimiento:', err);
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.subirImagenPerfil();
    }
  }

  subirImagenPerfil() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    const token = this.authService.obtenerToken();
    if (!token) {
      console.error('No estás autenticado');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.post(`${this.backendUrl}/subir`, formData, { 
      headers,
      responseType: 'text' 
    }).subscribe({
      next: (url: string) => {
        this.usuario.fotoPerfil = url;
        console.log('Imagen de perfil actualizada:', url);
      },
      error: (err) => {
        console.error('Error subiendo imagen:', err);
      }
    });
  }

  guardarCambiosUsuario() {
    this.perfilService.actualizarUsuario(this.usuario).subscribe({
      next: (actualizado) => {
        console.log('Usuario actualizado correctamente');
        this.mostrarAjustes = false;
        this.authService.logout(); // Recargar datos actualizados
      },
      error: (err) => {
        console.error('Error actualizando usuario', err);
      }
    });
  }

  eliminarCuenta() {
    if (confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      this.perfilService.eliminarUsuario(this.usuario.id).subscribe({
        next: () => {
          console.log('Usuario eliminado');
          this.authService.logout();
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Error eliminando usuario', err);
        }
      });
    }
  }

  toggleAjustes() {
    this.mostrarAjustes = !this.mostrarAjustes;
  }
  eliminarPublicacion(id: number) {
  if (confirm('¿Deseas eliminar esta publicación?')) {
    this.perfilService.eliminarPublicacion(id).subscribe({
      next: () => {
        console.log('Publicación eliminada');
        // Actualiza la lista de publicaciones después de eliminar
        this.publicaciones = this.publicaciones.filter(pub => pub.id !== id);
      },
      error: err => {
        console.error('Error al eliminar publicación', err);
      }
    });
  }
}

// Navegar a la ruta de edición (debes tener una página de edición creada)
editarPublicacion(id: number) {
  this.router.navigate(['/editar-publicacion', id]);
}
eliminarVehiculo(id: number) {
  if (confirm("¿Estás seguro de que quieres eliminar este vehículo?")) {
    this.perfilService.eliminarVehiculo(id).subscribe({
      next: () => {
        alert("Vehículo eliminado correctamente.");
        this.cargarPerfil(); // refrescar lista
      },
      error: err => {
        console.error("Error eliminando vehículo:", err);
        alert("Error al eliminar el vehículo.");
      }
    });
  }
}
}