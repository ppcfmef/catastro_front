import { IPredio } from "./predio.interface";
import { ISuministro } from "./suministro.interface";

export interface IRegistroTitularidad{
    codTit: string;
    codTipoTit: string;
    codUbicacion: string;
    predio: IPredio;
    suministro: ISuministro;
}
