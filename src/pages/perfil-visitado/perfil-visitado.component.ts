import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PerfilService } from 'src/services/perfil.service';
import { Usuario } from 'src/models/usuario';
import { Vehiculo } from 'src/models/vehiculo.model';
import { Publicacion } from 'src/models/publicacion.model';
import { AuthService } from 'src/services/auth.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-perfil-visitado',
  templateUrl: './perfil-visitado.component.html',
  styleUrls: ['./perfil-visitado.component.scss'],
  standalone: true,
 imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ]
})
export class PerfilVisitadoComponent implements OnInit {
  usuario!: Usuario;
  publicaciones: Publicacion[] = [];
  vehiculos: Vehiculo[] = [];
  seguidoresCount = 0;
  siguiendoCount = 0;
  yaLoSigo = false;

  backendUrl = 'http://localhost:8080/api/archivos';
  miId!: number;
  perfilId!: number;

  constructor(
    private route: ActivatedRoute,
    private perfilService: PerfilService,
    private authService: AuthService,
    private router: Router

  ) {}

 ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id');

  if (id) {
    this.cargarPerfilDeUsuario(+id);
      this.perfilService.verificarSiSigo(+id).subscribe(res => {
    this.yaLoSigo = res.siguiendo;
  });
  } else {
    this.router.navigate(['/home']); // Redirige a home si no hay ID
  }
  
}
cargarPerfilDeUsuario(id: number) {
  this.perfilService.obtenerPerfilPorId(id).subscribe(data => {
    // Si el backend devuelve directamente el usuario (no un objeto con 'usuario' dentro):
    this.usuario = data;
    
    // Asegúrate de que publicaciones y vehiculos se cargan también si están disponibles
    this.perfilService.obtenerPublicacionesUsuario(id).subscribe(pubs => {
      this.publicaciones = pubs;
    });
    this.perfilService.obtenerVehiculosUsuario(id).subscribe(vehs => {
      this.vehiculos = vehs;
    });

    this.perfilService.obtenerConteoSeguimiento(id).subscribe(countData => {
      this.seguidoresCount = countData.seguidores;
      this.siguiendoCount = countData.siguiendo;
    });

    this.perfilId = id;
  }, error => {
    console.error('Error cargando perfil de otro usuario:', error);
  });
}
seguirODejar() {
  if (this.yaLoSigo) {
    this.perfilService.dejarDeSeguir(this.perfilId).subscribe(() => {
      this.refrescarEstadoSeguimiento();
      window.location.reload(); // Recarga la página completamente

    });
  } else {
    this.perfilService.seguir(this.perfilId).subscribe(() => {
      this.refrescarEstadoSeguimiento();
      window.location.reload(); // Recarga la página completamente

    });
  }
}

refrescarEstadoSeguimiento() {
  this.perfilService.obtenerConteoSeguimiento(this.perfilId).subscribe(countData => {
    this.seguidoresCount = countData.seguidores;
    this.siguiendoCount = countData.siguiendo;
  });

  this.perfilService.verificarSiSigo(this.perfilId).subscribe(res => {
    this.yaLoSigo = res.siguiendo;
  });
}


}