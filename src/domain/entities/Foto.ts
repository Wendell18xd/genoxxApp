export interface Foto {
  foto: string;
  comentario: string;
}

export interface ParamsFoto {
  maxFotos: number;
  minFotos: number;
  isComentario: boolean;
  isSave: boolean;
  onSave?: (fotos: Foto[]) => Promise<void>;
}
