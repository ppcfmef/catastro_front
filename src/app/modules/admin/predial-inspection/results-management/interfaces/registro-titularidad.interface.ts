import { ICaracteristica } from './caracteristica.interface';
import { IFoto } from './foto.interface';
import { IInstalacion } from './instalacion.interface';
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
    fotos: IFoto[];
    instalaciones: IInstalacion[];
    caracteristicas: ICaracteristica[];
}
