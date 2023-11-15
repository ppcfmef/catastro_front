import { IContribuyente } from './contribuyente.interface';


export interface IPredioInspeccion{
    id: number;
    piso: string;
    numSumiAgua: string;
    codTipoPredio: string;
    numSumiLuz: string;
    usoEspecifico: string;
    interior: string;
    obsPredio: string;
    codTit: string;
    codCpu: string;
    codPre: string;
    numDpto: string;
    codigoUso: string;
    estado: number;
    block: string;
    numSumiGas: string;
    predioContribuyente: IPredioContribuyente[];
    status: number;
    ubigeo: string;
}

export interface IPredioContribuyente{
    codContrInspec: number;
    codPre: string;
    codPredInspec: number;
    codTit: string;
    docIden: string;
    ubigeo: string;
    contribuyente: IContribuyente;
}
