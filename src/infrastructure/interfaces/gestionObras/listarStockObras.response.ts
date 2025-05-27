export interface ListarStockObrasResponse {
  datos: MateStockObra[];
  generico: MateGenericoObra[];
  mensaje: string;
}

export interface MateStockObra {
  guia_codigo: string;
  guia_numero: string;
  tipo_perfil: string;
  mate_medida: string;
  codi_perfil: string;
  nom_perfil: string;
  mate_codigo: string;
  mate_nombre: string;
  mate_controllote: string;
  mate_cantidad: number;
  mate_skucliente: string;
  mate_saldo: number;
  mate_lote: string;
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
