import { IFoto } from './foto.interface';
import { IRegistroTitularidad } from './registro-titularidad.interface';

export interface IUbicacion{
    id: number;
    codTipVia: string;
    numAlt: string;
    nomAlt: string;
    codTipoUu: string;
    codUsuario: string;
    nomUu: string;
    obsUbicacion: string;
    nomRef: string;
    referencia: string;
    km: string;
    y: number;
    lotUrb: string;
    codUU: string;
    numMun: string;
    codTicket: string;
    codVia: string;
    x: number;
    codUbicacion: string;
    nomVia: string;
    mznUrb: string;
    status: number;
    registrosTitularidad: IRegistroTitularidad[];
    ubigeo: string;
    fotos: IFoto[];
    address?: string;
}
