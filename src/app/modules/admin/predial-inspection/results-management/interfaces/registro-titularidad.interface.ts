import { ICaracteristica } from './caracteristica.interface';
import { IFoto } from './foto.interface';
import { IInstalacion } from './instalacion.interface';
import { IPredioInspeccion } from './predio-inspeccion.interface';
import { ISuministro } from './suministro.interface';

export interface IRegistroTitularidad{
    id: number;
    codTit: string;
    codTipoTit: number;
    codUbicacion: string;

    //"tipoSumi": "Suministro de Agua",

    predioInspeccion: IPredioInspeccion;
    predioPadron: IPredioInspeccion;
    suministro: ISuministro;
    status: number;

    instalaciones: IInstalacion[];
    caracteristicas: ICaracteristica;
    inicio: boolean;

}
