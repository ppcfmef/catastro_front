import { IPredio } from './predio.interface';
import { ISuministro } from './suministro.interface';

export interface IRegistroTitularidad{
    id: number;
    codTit: string;
    codTipoTit: number;
    codUbicacion: string;
    predio: IPredio;
    suministro: ISuministro;
    estado: number;
}
