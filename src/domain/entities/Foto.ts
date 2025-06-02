export interface Foto {
  foto: string;
  comentario: string;
}

export interface ParamsFoto {
  maxFotos: number;
  minFotos: number;
  isComentario: boolean;
  onSave: (fotos: Foto[]) => void;
}
