import { Component, OnInit } from '@angular/core';
import { AuthRequest } from 'src/models/auth-request';
import { Router } from '@angular/router';
import { Usuario } from 'src/models/usuario';
import { ToastController } from '@ionic/angular';
import {
  IonItem,
  IonContent,
  IonLabel,
  IonInput,
  IonButton,
  IonToggle,
} from '@ionic/angular/standalone';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    IonToggle,
    CommonModule,
    FormsModule,

    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,

    ReactiveFormsModule,
  ],
})
export class LoginComponent implements OnInit {
  segment: 'login' | 'registro' = 'login';
  registroForm: FormGroup;
  submitted = false;
  errorMessages: { [key: string]: string } = {};
  credentials: AuthRequest = {
    username: '',
    password: '',
  };

  nuevoUsuario: Partial<Usuario> = {
    nombreUsuario: '',
    correo: '',
    contrasena: '',
    nombre: '',
    privado: false, // Valor por defecto
  };
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private toastController: ToastController
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellidos: [''],
      nombreUsuario: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      privado: [false],
    });
  }
  ngOnInit() {
    const token = this.authService.obtenerToken();
    if (token) {
      this.router.navigate(['/home']);
    }
  }
  async showToast(message: string, color: string = 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'top',
    });
    await toast.present();
  }

  login() {
    this.authService.login(this.credentials).subscribe({
      next: (res) => {
        this.authService.guardarToken(res.token);
        this.router.navigate(['/home']);
      },
      error: () => {
        this.showToast('Credenciales incorrectas');
      },
    });
  }

  comprobacionPrivacidad(event: CustomEvent) {
    const isPrivado = event.detail.checked;
    this.nuevoUsuario.privado = isPrivado;
    console.log('Privacidad del usuario:', this.nuevoUsuario.privado);
  }
  register() {
    this.submitted = true;
    this.errorMessages = {};

    if (this.registroForm.invalid) {
      return;
    }

    const formValue = this.registroForm.value;
    this.authService.registrarUsuario(formValue).subscribe({
      next: (res) => {
        this.showToast(
          'Usuario registrado correctamente. Ahora puedes iniciar sesión.',
          'primary'
        );
        this.segment = 'login';
        this.registroForm.reset();
        this.submitted = false;
      },
      error: (err) => {
        if (err.status === 409) {
          // Conflicto (usuario/correo ya existe)
          const errorField = err.error.field; // 'nombreUsuario' o 'correo'
          const errorMessage = err.error.message;

          this.errorMessages[errorField] = errorMessage;

          // También puedes marcar el campo específico como "touched" para mostrar el error
          if (errorField === 'nombreUsuario') {
            this.registroForm.get('nombreUsuario')?.markAsTouched();
          } else if (errorField === 'correo') {
            this.registroForm.get('correo')?.markAsTouched();
          }
        } else if (err.error.errors) {
          // Manejar otros errores de validación del backend
          err.error.errors.forEach((error: any) => {
            this.errorMessages[error.field] = error.message;
          });
        } else {
          this.showToast(
            'No se pudo registrar el usuario: ' +
              (err.error.message || 'Error desconocido')
          );
        }
      },
    });
  }
  // Helper para acceder fácil a los controles del formulario
  get f() {
    return this.registroForm.controls;
  }
}
