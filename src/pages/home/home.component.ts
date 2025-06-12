import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonButton,
  IonCard,
  IonLabel,
  IonItem,
  IonAvatar,
  IonList,
  IonCol,
  IonGrid,
  IonRow,
  IonFooter } from '@ionic/angular/standalone';
import { Publicacion } from 'src/models/publicacion.model';
import { FeedService } from 'src/services/feed.service';
import { CommonModule } from '@angular/common';
import { Usuario } from 'src/models/usuario';
import { PerfilService } from 'src/services/perfil.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [ 
    IonFooter,
    IonRow,
    IonGrid,
    IonCol,
    IonList,
    IonAvatar,
    IonItem,
    IonLabel,
    CommonModule,
    IonCard,
    IonButton,
    IonContent,
    IonToolbar,
    IonHeader,
    RouterLink,
    FormsModule,
  ],
})
export class HomeComponent implements OnInit {
  publicaciones: Publicacion[] = [];
  page = 0;
  size = 10;
  cargando = false;
  backendUrl = 'http://localhost:8080/api/archivos';
  query: string = '';
  resultados: Usuario[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private feedService: FeedService,
    private perfilService: PerfilService
  ) {}
  cerrarSesion() {
    this.authService.logout();
  }
  ngOnInit() {
    this.cargarFeed();
  }
  buscar() {
    if (this.query.trim() === '') {
      this.resultados = [];
      return;
    }

    this.perfilService.buscarUsuarios(this.query).subscribe(
      (data: Usuario[]) => {
        this.resultados = data;
      },
      (error: any) => {
        console.error('Error en la búsqueda:', error);
      }
    );
  }

  cargarFeed() {
    if (this.cargando) return;

    this.cargando = true;
    this.feedService.getGlobalFeed(this.page, this.size).subscribe((data) => {
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
    //  { id: 29, nombre: 'Moto de agua' },
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
