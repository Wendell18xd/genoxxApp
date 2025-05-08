export interface LoginRequest {
  usuaCodigo: string;
  usuaClave: string;
  emprCodigo: string;
  recorded: boolean;
}

export interface ForgotRequest {
  usuaCodigo: string;
}

export interface UpdatePasswordRequest {
  usuaCodigo: string;
  tipoLogin: string;
  usuaClave: string;
  usuaClave2: string;
  trabFecnaci: string;
}
