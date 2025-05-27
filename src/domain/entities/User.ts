export class User {
  constructor(
    public empr_codigo: string,
    public empr_nombre: string,
    public empr_pais: string,
    public empr_timezone: string,
    public usua_codigo: string,
    public usua_tipo: string,
    public usua_login: string,
    public usua_nombre: string,
    public usua_perfil: string,
    public trab_documento: string,
    public time_login: number,
  ) {}

  get usua_tipoopera(): 'IPER' | 'ISCO' {
    return this.usua_tipo === 'PERS' ? 'IPER' : 'ISCO';
  }
}

export interface Menu {
  menu_padre: string;
  menu_codigo: string;
  menu_nombre: string;
  menu_icoweb: string;
  menu_icoapp: string;
  menu_descripcion: string;
  menu_color_icoweb: string;
  menu_fileapp: string;
  menu_fileweb: string;
  menu_hijo: Menu[];
}
