import { IUbicacion } from "./ubicacion.interface";

export interface ITicket{
    id: number;
    obsTicketUsuario: string;
    codEstTrabajoTicket: number,
    codUsuario: number;
    fecInicioTrabajo: string;
    fecAsignacion: string;
    fecUltimaActualizacion: string;
    codEstEnvioTicket: number;
    codTicket: string;
    codTipoTicket: number;
    obsTicketGabinete: string;
    ubicacion: IUbicacion[];
}
