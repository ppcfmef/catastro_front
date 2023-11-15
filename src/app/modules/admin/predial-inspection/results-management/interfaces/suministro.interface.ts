import { IContribuyente } from './contribuyente.interface';

export interface ISuministro{
    codSuministro: string;
    codTit: string;
    codTipoSumi: string;
    numSumis: string;
    obsSumis: string;
    estado: number;
    contribuyente: IContribuyente;
    tipoSumi: string;
    codContr: number;
}
