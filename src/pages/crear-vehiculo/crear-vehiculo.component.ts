import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  IonCol,
  IonHeader,
  IonButton,
  IonLabel,
  IonGrid,
  IonRow,
  IonToolbar,
  IonItem,
  IonInput,
  IonTextarea,
  IonContent,
  IonSelect,
  IonSelectOption,
  IonCheckbox, IonFooter } from "@ionic/angular/standalone";
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-crear-vehiculo',
  templateUrl: './crear-vehiculo.component.html',
  styleUrls: ['./crear-vehiculo.component.scss'],
  standalone: true,
  imports: [IonFooter, 
    IonCol,
    IonHeader,
    IonButton,
    IonLabel,
    IonGrid,
    IonRow,
    IonToolbar,
    IonItem,
    IonInput,
    IonTextarea,
    IonContent,
    FormsModule,
    CommonModule,
    IonSelect,
    IonSelectOption,
    RouterLink,
    IonCheckbox  
  ]
})
export class CrearVehiculoComponent  {
  backendUrl = 'http://localhost:8080/api/archivos';

idPadreSeleccionado: number | null = null;
idSeccionSeleccionada: number | null = null;  modelo = '';
  marca = '';
  ano!: number;
  descripcion = '';
  infoAdicional = '';
  precio!: number;
  enVenta = true;
  imagenesSubidas: string[] = [];
  seccionIdSelec = this.idSeccionSeleccionada ?? this.idPadreSeleccionado;


  constructor(private http: HttpClient, private authService: AuthService,private router: Router) {}
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const token = this.authService.obtenerToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.post('http://localhost:8080/api/archivos/subir', formData, {
      headers,
      responseType: 'text'
    }).subscribe({
      next: (url: string) => {
        this.imagenesSubidas.push(url);
      },
      error: err => {
        console.error(err);
        alert('Error al subir imagen');
      }
    });
  }
  cerrarSesion() {
    this.authService.logout();
  }
  crearVehiculo() {
    const userId = this.authService.getUserIdFromToken();
    const token = this.authService.obtenerToken();

    if (!userId || !token) {
      alert('No estás autenticado');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
 
    const vehiculo = {
      modelo: this.modelo,
      marca: this.marca,
      ano: this.ano,
      descripcion: this.descripcion,
      infoAdicional: this.infoAdicional,
      precio: this.precio,
      publicado: true,
      enVenta: this.enVenta,
      disponibilidadDeVenta: this.enVenta,
      fotos: this.imagenesSubidas.map(url => ({ url })),
      seccion: { id: this.idSeccionSeleccionada ?? this.idPadreSeleccionado } 
      

    };

    this.http.post(`http://localhost:8080/api/vehiculos/usuario/${userId}`, vehiculo, { headers })
      .subscribe({
        next: res => {
          alert('Vehículo publicado');
          // reset form
          this.modelo = '';
          this.marca = '';
          this.ano = 0;
          this.descripcion = '';
          this.infoAdicional = '';
          this.precio = 0;
          this.imagenesSubidas = [];
          this.router.navigate(['/perfil/+this.publicacion.usuario?.id]);']);

        },
        error: err => {
          console.error(err);
          alert('Error al crear vehículo');
        }
      });
          this.salir();

  }

  //SECCIONES
 salir() {
    this.router.navigate(['/perfil/+this.publicacion.usuario?.id]);']);
  }
  seccionesPadre = [
  { id: 1, nombre: 'Coches' },
  { id: 2, nombre: 'Motos' },
  { id: 3, nombre: 'Vehículos Recreativos' }
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
    { id: 29, nombre: 'Moto de agua' }
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
    { id: 32, nombre: 'Autocaravana' }
  ]
};
}