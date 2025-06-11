import { Routes } from '@angular/router';
import { AuthGuard } from 'src/auth/auth.guard';
import { CrearPublicacionComponent } from 'src/pages/crear-publicaciones/crear-publicaciones.component';
import { CrearVehiculoComponent } from 'src/pages/crear-vehiculo/crear-vehiculo.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'perfil/:id',
    loadComponent: () =>
      import('./pages/perfil/perfil.component').then((m) => m.PerfilComponent),
      canActivate: [AuthGuard] 
  },
  {
    path: 'perfilUsuario/:id',
    loadComponent: () =>
      import('./pages/perfil-visitado/perfil-visitado.component').then(
        (m) => m.PerfilVisitadoComponent
      ),
            canActivate: [AuthGuard] 

  },
  { path: 'crear-publicacion', component: CrearPublicacionComponent,
          canActivate: [AuthGuard] 

   },
  
  { path: 'crear-Vehiculo', component: CrearVehiculoComponent,      canActivate: [AuthGuard] 
 },
  {
    path: 'siguiendo',
    loadComponent: () =>
      import('./pages/home-siguiendo/home-siguiendo.component').then(
        (m) => m.HomeSiguiendoComponent
      ),
            canActivate: [AuthGuard] 

  },
  {
    path: 'vehiculo-filtrados/:id',
    loadComponent: () =>
      import('./pages/vehiculo-filtrados/vehiculo-filtrados.component').then(
        (m) => m.VehiculoFiltradosComponent
      ),
  },
  {
    path: 'editar-publicacion/:id',
    loadComponent: () =>
      import('./pages/editar-publicacion/editar-publicacion.component').then(
        (m) => m.EditarPublicacionComponent
      ),
            canActivate: [AuthGuard] 

  },
  {
    path: 'editar-vehiculo/:id',
    loadComponent: () =>
      import('./pages/editar-vehiculo/editar-vehiculo.component').then(
        (m) => m.EditarVehiculoComponent
      ),
            canActivate: [AuthGuard] 

  },
  {
    path: 'vehiculos-en-venta',
    loadComponent: () =>
      import('./pages/vehiculo-en-venta/vehiculo-en-venta.component').then(
        (m) => m.VehiculoEnVentaComponent
      ),
            canActivate: [AuthGuard] 

  },
  {
    path: 'politicas-privacidad',
    loadComponent: () =>
      import('./pages/politicas-privacidad/politicas-privacidad.component').then(
        (m) => m.PoliticasPrivacidadComponent
      ),
  },

];
