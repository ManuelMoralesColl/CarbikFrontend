import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonHeader, IonToolbar, IonFooter } from "@ionic/angular/standalone";
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-politicas-privacidad',
  templateUrl: './politicas-privacidad.component.html',
  styleUrls: ['./politicas-privacidad.component.scss'],
  standalone: true,
  imports: [IonFooter, IonToolbar, IonHeader,
    RouterLink
  ]
})
export class PoliticasPrivacidadComponent  implements OnInit {
  constructor(
    private authService: AuthService,
 
  ) {}
  cerrarSesion() {
    this.authService.logout();
  }
  ngOnInit() {}

}
