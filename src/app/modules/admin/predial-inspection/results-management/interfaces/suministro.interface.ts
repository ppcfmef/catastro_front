import { IContribuyente } from './contribuyente.interface';

export interface ISuministro{

    codTit:string;
    codTipoSumi:string;
    numSumis:string;
    obsSumis:string;
    estado: number;
    contribuyente: IContribuyente;
}