export interface ListarStockObrasResponse {
  datos: MateStockObra[];
  generico: MateGenericoObra[];
  mensaje: string;
}

export interface MateStockObra {
  mate_codigo: string;
  guia_codigo: string;
  guia_numero: string;
  mate_nombre: string;
  mate_skucliente: string;
  mate_medida: string;
  mate_lote: string;
  mate_precio: number;
  stock: number;
  reserva: number;
  alma_reserva: number;
  disponible: number;
  stock_tecnico: number;
  tope_tecnico: number;
  mate_controllote: string;
  mate_controlserie: string;
  mate_categoria: string;
  mate_grupofamilia: string;
  mate_requiereobra: string;
  mate_saldo: number;
  mate_cantidad: number;
}

export interface MateGenericoObra {
  mate_codigo: string;
  mate_nombre: string;
  mate_skucliente: string;
  mate_medida: string;
  stock: number;
  valida: number;
  mate_lote: string;
}
