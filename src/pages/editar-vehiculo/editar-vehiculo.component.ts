import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/services/auth.service';
import { FormsModule } from '@angular/forms';
import {
  IonButton, IonCol, IonContent, IonGrid, IonHeader,
  IonInput, IonItem, IonLabel, IonRow, IonSelect,
  IonSelectOption,  IonTitle, IonToolbar,IonTextarea,IonCheckbox, IonFooter } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-vehiculo',
  templateUrl: './editar-vehiculo.component.html',
  styleUrls: ['./editar-vehiculo.component.scss'],
  standalone: true,
  imports: [IonFooter, 
    IonButton, IonCol, IonContent, IonGrid, IonHeader,
    IonInput, IonItem, IonLabel, IonRow, IonSelect,
    IonSelectOption, IonTitle, IonToolbar,
    FormsModule, CommonModule,IonTextarea,IonCheckbox,
    RouterLink
  ]
})
export class EditarVehiculoComponent implements OnInit {
  backendUrl = 'http://localhost:8080/api/archivos';

  vehiculoId!: number;

  modelo = '';
  marca = '';
  ano!: number;
  descripcion = '';
  infoAdicional = '';
  precio!: number;
  enVenta = true;
  imagenesSubidas: string[] = [];

  idPadreSeleccionado: number | null = null;
  idSeccionSeleccionada: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}
  cerrarSesion() {
    this.authService.logout();
  }
  ngOnInit() {
    this.vehiculoId = +this.route.snapshot.paramMap.get('id')!;
    this.cargarVehiculo();
  }

  cargarVehiculo() {
        const token = this.authService.obtenerToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.get<any>(`http://localhost:8080/api/vehiculos/${this.vehiculoId}`,{ headers }).subscribe({
      next: vehiculo => {
        this.modelo = vehiculo.modelo;
        this.marca = vehiculo.marca;
        this.ano = vehiculo.ano;
        this.descripcion = vehiculo.descripcion;
        this.infoAdicional = vehiculo.infoAdicional;
        this.precio = vehiculo.precio;
        this.enVenta = vehiculo.enVenta;
        this.imagenesSubidas = vehiculo.fotos.map((f: any) => f.url);

        this.idSeccionSeleccionada = vehiculo.seccion?.id ?? null;
        this.idPadreSeleccionado = this.obtenerPadreDesdeHija(this.idSeccionSeleccionada!);
      },
      error: err => {
        console.error(err);
        alert('Error al cargar el vehículo');
      }
    });
  }

  guardarCambios() {
    const token = this.authService.obtenerToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

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
      fotos: this.imagenesSubidas.map(url => ({ url })), // no cambia imagen
      seccion: { id: this.idSeccionSeleccionada ?? this.idPadreSeleccionado }
    };

    this.http.put(`http://localhost:8080/api/vehiculos/${this.vehiculoId}`, vehiculo, { headers })
      .subscribe({
        next: () => {
          alert('Vehículo actualizado correctamente');
          this.salir();
        },
        error: err => {
          console.error(err);
          alert('Error al actualizar el vehículo');
        }
      });
  }

  obtenerPadreDesdeHija(idHija: number): number | null {
    for (const padreId in this.seccionesHijas) {
      if (this.seccionesHijas[padreId].some(seccion => seccion.id === idHija)) {
        return parseInt(padreId, 10);
      }
    }
    return null;
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
   // { id: 29, nombre: 'Moto de agua' }
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
 salir() {
    this.router.navigate(['/perfil/+this.publicacion.usuario?.id]);']);
  }
}
