import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import {
  IonLabel,
  IonItem,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonAvatar,
  IonButton, IonFooter, IonCardContent, IonCardSubtitle, IonCardHeader, IonCardTitle, IonCol, IonCard, IonGrid, IonRow, IonApp } from '@ionic/angular/standalone';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-vehiculo-en-venta',
  templateUrl: './vehiculo-en-venta.component.html',
  styleUrls: ['./vehiculo-en-venta.component.scss'],
  standalone: true,
  imports: [IonApp, IonRow, IonGrid, IonCard, IonCol, IonCardTitle, IonCardHeader, IonCardSubtitle, IonCardContent, IonFooter, 
    IonButton,
    IonAvatar,
    IonList,
    IonContent,
    IonTitle,
    IonLabel,
    IonItem,
    IonHeader,
    IonToolbar,
    NgFor,
    NgIf,
    RouterLink,
    CommonModule
  ],
})
export class VehiculoEnVentaComponent implements OnInit {
  vehiculos: any[] = [];
  backendUrl = 'http://localhost:8080/api/archivos'; // Ajusta si cambia tu ruta

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    const token = this.authService.obtenerToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    this.http
      .get('http://localhost:8080/api/vehiculos/venta/publicos', { headers })
      .subscribe({
        next: (data: any) => {
          this.vehiculos = data;
        },
        error: (err) => {
          console.error(err);
          alert('Error cargando vehículos en venta');
        },
      });
  }
   cerrarSesion() {
      this.authService.logout();
  }
}
