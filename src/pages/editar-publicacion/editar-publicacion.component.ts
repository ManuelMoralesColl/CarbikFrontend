import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PerfilService } from 'src/services/perfil.service';
import { Publicacion } from 'src/models/publicacion.model';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-editar-publicacion',
  templateUrl: './editar-publicacion.component.html',
  styleUrls: ['./editar-publicacion.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterLink
  ]
})
export class EditarPublicacionComponent  implements OnInit {
  
  publicacion: Publicacion = {
  id: 0,
  pieDeFoto: '',
  fechaPublicacion: new Date().toISOString(), // o una cadena de fecha válida
  usuario: null,      // o un objeto Usuario si lo tienes
  seccion: null,      // o un objeto Seccion si lo tienes
  fotos: []
};
  


  constructor(
    private route: ActivatedRoute,
    private perfilService: PerfilService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarPublicacion(id);
  }
  cerrarSesion() {
    this.authService.logout();
  }
  cargarPublicacion(id: number) {
    this.perfilService.obtenerMiPerfil().subscribe({
      next: (data) => {
        const encontrada = data.publicaciones.find((p: { id: number; }) => p.id === id);
        if (encontrada) {
          this.publicacion = { ...encontrada };
        } else {
          console.error('Publicación no encontrada');
        }
      },
      error: (err) => console.error('Error cargando publicación', err)
    });
  }
  salir() {
    this.router.navigate(['/perfil/+this.publicacion.usuario?.id]);']);
  }
  guardarCambios() {
    this.perfilService.editarPublicacion(this.publicacion.id, this.publicacion).subscribe({
      next: () => {
        alert('¡Publicación actualizada!');
        this.router.navigate(['/perfil/+this.publicacion.usuario?.id]);']);
      },
      error: (err) => console.error('Error actualizando publicación', err)
    });
  }
}