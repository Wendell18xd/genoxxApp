import { ReporteStock } from '../../../../domain/entities/ReporteStock';

export interface ReporteStockResponse {
    datos:        ReporteStock[];
    mensaje:      string;
    datosresumen: Datosresuman[];
}

export interface ReporteStockResponse {
    alma_stock:                   string;
    codi_perfil:                  string;
    empr_codigo:                  string;
    mate_codigo:                  string;
    mate_medida:                  string;
    mate_nombre:                  string;
    mate_skucliente:              string;
    mate_lote:                    string;
    rut_perfil:                   string;
    nom_perfil:                   string;
    stock_reservado:              string;
    reserva:                      number;
    stock_contable:               number;
    punto_pedido:                 string;
    stock_minimo:                 string;
    stock_maximo:                 string;
    ubicacion_1:                  string;
    ubicacion_2:                  string;
    ubicacion_3:                  string;
    stock_transito:               number;
    tipo_perfil:                  string;
    mate_tipo:                    string;
    mate_categoria:               string;
    mate_grupo:                   string;
    mate_naturaleza:              string;
    mate_controlserie:            string;
    mate_preciomaterial:          string;
    mate_total:                   string;
    mate_controllote:             string;
    mate_liquidar:                string;
    mate_estado:                  string;
    mate_recurrente:              string;
    mate_manejakardex:            string;
    mate_requiereobra:            string;
    mate_critico:                 string;
    mate_activo_fijo:             string;
    mate_tipoembalaje:            string;
    mate_condicionalmacenamiento: string;
    mate_nivelapilamiento:        string;
    mate_tiempoentrega:           string;
    mate_loteminimocompra:        string;
    proy_alias:                   string;
    cliente_nombre:               string;
}

export enum ClienteNombre {
    Claro = 'CLARO',
    Empty = '',
}

export enum MateCategoria {
    Acometidas = 'ACOMETIDAS',
    CablesTelecomunicac = 'CABLES TELECOMUNICAC',
    Cajas = 'CAJAS',
    Conectores = 'CONECTORES',
    Empty = '',
    Epis = 'EPIS',
    EpisAsignables = 'EPIS ASIGNABLES',
    EquiposInst = 'EQUIPOS INST',
    EquiposProcesoInfo = 'EQUIPOS PROCESO INFO',
    Herramienta = 'HERRAMIENTA',
    OtrosInformatica = 'OTROS INFORMATICA',
    PequeñaHerramienta = 'PEQUEÑA HERRAMIENTA',
    PequeñoMaterial = 'PEQUEÑO MATERIAL',
    Telefonos = 'TELEFONOS',
}

export enum MateGrupo {
    Epis = 'EPIS',
    Equiprocinf = 'EQUIPROCINF',
    Material = 'MATERIAL',
    MaterialCesion = 'MATERIAL CESION',
    MaterialOficina = 'MATERIAL OFICINA',
    Mobiliario = 'MOBILIARIO',
    PrestServ = 'PREST. SERV',
}

export enum MateLoteminimocompra {
    The00 = '.00',
}

export enum MateMedida {
    Empty = '',
    Jgo = 'JGO',
    Kg = 'KG',
    Kit = 'KIT',
    Lt = 'LT',
    Mts = 'MTS',
    Par = 'PAR',
    Resma = 'RESMA',
    Unidad = 'UNIDAD',
}

export enum MateNaturaleza {
    Comprherr = 'COMPRHERR',
    Comprmat = 'COMPRMAT',
    Comprmatces = 'COMPRMATCES',
    Comprmatcl = 'COMPRMATCL',
    Epis = 'EPIS',
    Matoficina = 'MATOFICINA',
    Prestserv = 'PRESTSERV',
}

export enum MateTipo {
    FueraDeInventario = 'FUERA DE INVENTARIO',
    Inventario = 'INVENTARIO',
}

export enum ProyAlias {
    AtencionFallaCto = 'ATENCION FALLA CTO',
    BucleZ3Atc = 'BUCLE_Z3_ATC',
    BucleZ3Pext = 'BUCLE_Z3_PEXT',
    BucleZ6Atc = 'BUCLE_Z6_ATC',
    BucleZ6Pext = 'BUCLE_Z6_PEXT',
    ClaroAtc = 'CLARO ATC',
    ClaroEmpalme = 'CLARO_EMPALME',
    ClaroPex = 'CLARO_PEX',
    Comando = 'COMANDO',
    DesplAtp = 'DESPL_ATP',
    DesplMOV = 'DESPL_MOV',
    EntelAtt = 'ENTEL ATT',
    EntelMovil = 'ENTEL_MOVIL',
    Estructura = 'ESTRUCTURA',
    FonMOV = 'FON_MOV',
    FotTel = 'FOT_TEL',
    Gtd = 'GTD',
    Huawei = 'HUAWEI',
    IsptcTelefonica = 'ISPTC TELEFONICA',
    OnnetBucle = 'ONNET_BUCLE',
    Pyme = 'PYME',
    Repliegue = 'REPLIEGUE',
    TelecoChile = 'TELECO_CHILE',
    Vtr = 'VTR',
    VtrPex = 'VTR_PEX',
    Wom = 'WOM',
    WomAtc = 'WOM ATC',
    WomFon = 'WOM_FON',
    WomMovil = 'WOM_MOVIL',
}

export enum TipoPerfil {
    Alma = 'ALMA',
}

export interface Datosresuman {
    codi_perfil: string;
    rut_perfil:  string;
    nom_perfil:  string;
    mate_total:  string;
}
