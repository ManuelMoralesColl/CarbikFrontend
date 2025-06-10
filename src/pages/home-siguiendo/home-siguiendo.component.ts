import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCard, IonCardHeader, IonCardTitle, IonInfiniteScroll, IonInfiniteScrollContent, IonLabel, IonItem, IonAvatar, IonList, IonInput,IonSelectOption ,IonSelect, IonFooter, IonCol, IonGrid, IonRow } from "@ionic/angular/standalone";
import { Publicacion } from 'src/models/publicacion.model';
import { FeedService } from 'src/services/feed.service';
import { CommonModule } from '@angular/common';
import { Usuario } from 'src/models/usuario';
import { PerfilService } from 'src/services/perfil.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-siguiendo',
  templateUrl: './home-siguiendo.component.html',
  styleUrls: ['./home-siguiendo.component.scss'],
  standalone: true,
  imports: [IonRow, IonGrid, IonCol, IonFooter, IonInput, IonList, IonAvatar, IonItem, IonLabel, CommonModule,IonInfiniteScrollContent, IonInfiniteScroll, IonCardTitle, IonCardHeader, IonCard, IonButton, IonContent, IonTitle, IonToolbar, IonHeader,RouterLink,FormsModule,  IonSelect,
  IonSelectOption]

})
export class HomeSiguiendoComponent  implements OnInit {

  publicaciones: Publicacion[] = [];
  page = 0;
  size = 10;
  cargando = false;
  backendUrl = 'http://localhost:8080/api/archivos';
  userId: number | null = null;
 query: string = '';
  resultados: Usuario[] = [];
  constructor(private authService: AuthService, private feedService: FeedService, private router: Router, private perfilService: PerfilService) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserIdFromToken();
    if (this.userId != null) {
      this.cargarFeedSiguiendo();
    }
  }
buscar() {
  if (this.query.trim() === '') {
    this.resultados = [];
    return;
  }

  this.perfilService.buscarUsuarios(this.query).subscribe((data: Usuario[]) => {
    this.resultados = data;
  }, (error: any) => {
    console.error('Error en la búsqueda:', error);
  });
}
  cargarFeedSiguiendo(): void {
    if (this.cargando || this.userId === null) return;

    this.cargando = true;
    this.feedService.getFeedSiguiendo(this.userId, this.page, this.size).subscribe(data => {
      this.publicaciones = this.publicaciones.concat(data);
      this.page++;
      this.cargando = false;
    });
  }
  
  irAlPerfil() {
    const userId = this.authService.getUserIdFromToken();
   if (userId !== null) {
      this.router.navigate(['/perfil', userId]);
    } else {
      alert('Error: Token no válido');
    }
  }
    cerrarSesion() {
      this.authService.logout();
  }

    //secciones

  idPadreSeleccionado: number | null = null;
  idHijaSeleccionada: number | null = null;

  seccionesPadre = [
    { id: 1, nombre: 'Coches' },
    { id: 2, nombre: 'Motos' },
    { id: 3, nombre: 'Vehículos Recreativos' },
  ];

  seccionesHijas: { [key: number]: { id: number; nombre: string }[] } = {
    1: [
      { id: 4, nombre: 'Tuning' },
      { id: 5, nombre: 'Todoterrenos' },
      { id: 6, nombre: 'SUV' },
      { id: 7, nombre: 'Drift' },
      { id: 8, nombre: 'Japoneses' },
      { id: 9, nombre: 'Musclecar' },
      { id: 10, nombre: 'Sedán' },
      { id: 11, nombre: 'Roadster' },
      { id: 12, nombre: 'Pickup' },
      { id: 13, nombre: 'Deportivo' },
      { id: 14, nombre: 'Clásico' },
      { id: 15, nombre: 'Hatchback' },
      { id: 16, nombre: 'Coupé' },
      { id: 29, nombre: 'Moto de agua' },
    ],
    2: [
      { id: 17, nombre: 'Deportivas' },
      { id: 18, nombre: 'R' },
      { id: 19, nombre: 'Naked' },
      { id: 20, nombre: 'Custom' },
      { id: 21, nombre: 'Chopper' },
      { id: 22, nombre: 'Cafe Racer' },
      { id: 23, nombre: 'Scooter' },
      { id: 24, nombre: 'Trail' },
      { id: 25, nombre: 'Cross' },
      { id: 26, nombre: 'Touring' },
      { id: 27, nombre: 'Quads' },
      { id: 28, nombre: 'Trial' },
    ],
    3: [
      { id: 30, nombre: 'Camper' },
      { id: 31, nombre: 'Caravana' },
      { id: 32, nombre: 'Autocaravana' },
    ],
  };

  limpiarHija() {
    this.idHijaSeleccionada = null;
  }

  buscarSecciones() {
    const seccionId = this.idHijaSeleccionada ?? this.idPadreSeleccionado;
    if (!seccionId) {
      alert('Selecciona una categoría');
      return;
    }

    this.router.navigate(['/vehiculo-filtrados', seccionId]);
  }
}