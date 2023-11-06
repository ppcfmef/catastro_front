import { IContribuyente } from './contribuyente.interface';


export interface IPredio{
    piso: string;
    numSumiAgua: string;
    codTipoPredio: string;
    numSumiLuz: string;
    usoEspecifico: string;
    interior: string;
    obsPredio: string;
    codTit: string;
    codCPU: string;
    codPre: string;
    numDpto: string;
    codigoUso: string;
    estado: number;
    block: string;
    numSumiGas: string;
    contribuyente: IContribuyente;
    status: number;
}
