export interface User {
  empr_codigo: string;
  empr_nombre: string;
  empr_pais: string;
  empr_timezone: string;
  usua_codigo: string;
  usua_tipo: string;
  usua_nombre: string;
  usua_perfil: string;
  trab_documento: string;
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
