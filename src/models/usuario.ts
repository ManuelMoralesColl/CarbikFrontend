export interface Usuario {
  id: number;//acabo de quitar la ? de id?:
  nombre: string;
  apellidos: string;
  nombreUsuario: string;
  correo: string;
  contrasena: string;
  fotoPerfil?: string;
  verificado?: boolean;
  fechaRegistro?: Date;
  privado?: boolean;
}
