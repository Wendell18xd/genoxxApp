export interface ActividadesObrasResponse {
  actividades_orden: ActividadesOrden[];
  familia: FamiliaElement[];
  subfamilia: Subfamilia[];
  actividades: Actividade[];
  situacion: Situacion[];
  mensaje: string;
}

export interface Actividade {
  cont_parametro: string;
  cont_campo01: string;
  obliga_horas: string;
  descripcion: string;
}

export interface ActividadesOrden {
  cont_parametro: string;
  cont_campo01: string;
  cont_campo05: string;
  cont_campo06: string;
  familia: string;
  subfamilia: string;
  medida: string;
}

export interface FamiliaElement {
  familia: string;
}

export interface Situacion {
  cont_parametro: string;
  cont_campo01: string;
}

export interface Subfamilia {
  subfamilia: string;
  familia: string;
}
