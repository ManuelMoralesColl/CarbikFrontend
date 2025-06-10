import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  IonLabel,
  IonItem,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonAvatar,
  IonButton,
} from '@ionic/angular/standalone';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-vehiculo-filtrados',
  templateUrl: './vehiculo-filtrados.component.html',
  styleUrls: ['./vehiculo-filtrados.component.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonAvatar,
    IonList,
    IonContent,
    IonTitle,
    IonLabel,
    IonItem,
    IonHeader,
    IonToolbar,
    IonHeader,
    NgFor,
    NgIf,
    RouterLink,
  ],
})
export class VehiculoFiltradosComponent implements OnInit {
  vehiculos: any[] = [];
  backendUrl = 'http://localhost:8080/api/archivos'; // o ajusta si tu endpoint es diferente

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const seccionId = this.route.snapshot.paramMap.get('id');
    if (seccionId) {
      this.http
        .get(`http://localhost:8080/api/secciones/seccion/${seccionId}`)
        .subscribe({
          next: (data: any) => {
            this.vehiculos = data;
          },
          error: (err) => {
            console.error(err);
            alert('Error cargando vehículos');
          },
        });
    }
  }
}
