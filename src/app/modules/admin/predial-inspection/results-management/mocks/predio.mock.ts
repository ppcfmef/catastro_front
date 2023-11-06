import { IContribuyente } from '../interfaces/contribuyente.interface';
import { IPredio } from '../interfaces/predio.interface';

export const contribuyenteMock: IContribuyente ={
    condContr: '',
    dirFiscal: 'CALLE GIRASOLES (A.H. EL FRISCO) Mz.: H Lt.: 03 ASENTAMIENTO HUMANO EL FRISCO, Dist. DEAN VALDIVIA Prov. ISLAY Dpto. AREQUIPA',
    apMat: 'TOTOCAYO',
    docIden: '60210742',
    codContr: '677',
    apPat: 'HUAÃ‘AHUI',
    tipDoc: '01',
    contribuyente: '',
    nombre: 'EDGAR WILIAN',
    conyuge: ''

};

export const predioMock: IPredio ={
piso: '',
numSumiAgua: '',
codTipoPredio: 'PU',
numSumiLuz: '',
usoEspecifico: 'RESIDENCIAL - CASA HABITACION',
interior: '',
obsPredio: '',
codTit: '04070314-10-0001',
codCPU: '30807399-0001-2',
codPre: '14-10-0001',
numDpto: '',
codigoUso: '',
estado: 0,
block: '',
numSumiGas: '',
contribuyente:contribuyenteMock,
status:0
};
