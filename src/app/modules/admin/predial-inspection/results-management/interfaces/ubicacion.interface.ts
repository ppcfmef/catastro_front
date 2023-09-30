import { IRegistroTitularidad } from "./registro-titularidad.interface";

export interface IUbicacion{
    codTipVia: string;
    numAlt: string;
    nomAlt: string;
    codTipoUU: string;
    codUsuario: string;
    nomUU: string;
    obsUbicacion: string;
    nomRef: string;
    referencia: string;
    km: string;
    y: number;
    lotUrb: string;
    codUU: string;
    numMun: string
    codTicket: string;
    codVia: string;
    x: number;
    codUbicacion: string;
    nomVia: string;
    mznUrb: string;
    codEstado: number;
    registroTitularidad: IRegistroTitularidad[];

}

