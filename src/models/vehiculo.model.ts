import { FotoVehiculo } from "./foto-vehiculo.model";

export interface Vehiculo {
  id: number;
  usuario: any; // Puedes tiparlo como Usuario si lo tienes
  modelo: string;
  marca: string;
  ano: number;
  descripcion: string;
  infoAdicional: string;
  precio: number;
  publicado: boolean;
  enVenta: boolean;
  disponibilidadDeVenta: boolean;
  fotos: FotoVehiculo[];
  seccion: { id: number }; // ✅ aquí también se llamará "seccion", no "seccionId"

}

