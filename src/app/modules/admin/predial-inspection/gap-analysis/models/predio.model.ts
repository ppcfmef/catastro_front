/* eslint-disable @typescript-eslint/naming-convention */
import { PredioUI } from '../interfaces/predio.interface';



export class PredioModel implements PredioUI{
    COD_CPU: string;
    COD_PRE: string;
    SEC_EJEC: number;
    ID_PRED: string;
    ANIO_CART: number;
    BLOCK: string;
    COD_LOTE: string;
    COD_MZN: string;
    COD_SECT: string;
    COD_UU: string;
    COD_VIA: string;
    COORD_X: number;
    COORD_Y: number;
    CUADRA: string;
    FUENTE: string;
    ID_ARANC: string;
    ID_LOTE: string;
    INTERIOR: string;
    KM: string;
    LADO: string;
    LOT_URB: number;
    MZN_URB: string;
    NOM_UU: string;
    NOM_VIA: string;
    NUM_MUN: string;
    OBJECTID: number;
    PARTIDA: string;
    PISO: string;
    RAN_NUM: string;
    REFEREN: string;
    TIPO_UU: string;
    TIP_VIA: string;
    UBIGEO: string;
    COD_CUC: string;
    AREA: number;
    RAN_CPU: number;
    COD_UI: number;
    COD_VER: number;
    NOM_USER: string;
    NOM_PC: string;
    ID_LOTE_P: number;
    constructor(l?: PredioUI){
        this.COD_CPU= l?.COD_CPU;
        this.COD_PRE= l?.COD_PRE;
        this.SEC_EJEC = l?.SEC_EJEC;
        this.ID_PRED= l?.ID_PRED;
        this.ANIO_CART = l?.ANIO_CART;
        this.BLOCK = l?.BLOCK;
        this.COD_LOTE = l?.COD_LOTE;
        this.COD_MZN = l?.COD_MZN;
        this.COD_SECT = l?.COD_SECT;
        this.COD_UU = l?.COD_UU;
        this.COD_VIA = l?.COD_VIA;
        this.COORD_X = l?.COORD_X;
        this.COORD_Y = l?.COORD_Y;
        this.CUADRA = l?.CUADRA;
        this.FUENTE = l?.FUENTE;
        this.ID_ARANC = l?.ID_ARANC;
        this.ID_LOTE = l?.ID_LOTE;
        this.INTERIOR = l?.INTERIOR;
        this.KM = l?.KM;
        this.LADO = l?.LADO;
        this.LOT_URB = l?.LOT_URB;
        this.MZN_URB = l?.MZN_URB;
        this.NOM_UU = l?.NOM_UU;
        this.NOM_VIA = l?.NOM_VIA;
        this.NUM_MUN = l?.NUM_MUN;
        this.OBJECTID= l?.OBJECTID;
        this.PARTIDA = l?.PARTIDA;
        this.PISO = l?.PISO;
        this.RAN_NUM = l?.RAN_NUM;
        this.REFEREN = l?.REFEREN;
        this.TIPO_UU = l?.TIPO_UU;
        this.TIP_VIA = l?.TIP_VIA;
        this.UBIGEO = l?.UBIGEO;
        this.AREA = l?.AREA;
        this.RAN_CPU = l?.RAN_CPU;
        this.ID_LOTE_P = l?.ID_LOTE_P;
        this.COD_MZN = l?.COD_MZN;
        this.COD_SECT = l?.COD_SECT;
        this.NOM_USER = l?.NOM_USER;
        this.NOM_PC = l?.NOM_PC;
        this.ID_LOTE_P= l?.ID_LOTE_P;

    }

}
