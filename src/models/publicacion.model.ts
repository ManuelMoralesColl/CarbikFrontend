import { FotoPublicacion } from "./foto-publicacion.model";

export interface Publicacion {
  id: number;
  usuario: any; // También puedes poner Usuario si ya tienes ese modelo
  pieDeFoto: string;
  fechaPublicacion: string;
  seccion: any; // Puedes tipar como Seccion si lo necesitas
  fotos: FotoPublicacion[];
}
