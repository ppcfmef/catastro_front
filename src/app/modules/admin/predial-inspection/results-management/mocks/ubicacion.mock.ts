import { TicketStatus } from 'app/shared/enums/ticket-status.enum';
import {IContribuyente} from '../interfaces/contribuyente.interface';
import {IPredio} from '../interfaces/predio.interface';
import {IRegistroTitularidad} from '../interfaces/registro-titularidad.interface';
import {ISuministro} from '../interfaces/suministro.interface';
import {IUbicacion} from '../interfaces/ubicacion.interface';


export const contribuyenteMock: IContribuyente = {
    condContr: '',
    dirFiscal: 'CALLE GIRASOLES (A.H. EL FRISCO) Mz.: H Lt.: 03 ASENTAMIENTO HUMANO EL FRISCO, Dist. DEAN VALDIVIA Prov. ISLAY Dpto. AREQUIPA',
    apMat: 'TOTOCAYO',
    docIden: '60210742',
    codContr: '677',
    apPat: 'HUAÃ‘AHUI',
    tipDoc: '01',
    contribuyente: '',
    nombre: 'EDGAR WILIAN',
    conyuge: '',

};

const predio: IPredio = {
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
    estado: TicketStatus.PENDIENTE_GESTION_RESULTADOS,
    block: '',
    numSumiGas: '',
    contribuyente: contribuyenteMock
};

const suministro: ISuministro = {
    codTit: '04070314-19-0002',
    codTipoSumi: '1',
    numSumis: '040703142243',
    obsSumis: 'oifuef oufuehf uheufiwadfuhfjkjfa',
    estado:TicketStatus.PENDIENTE_GESTION_RESULTADOS,
    contribuyente:null
};
/*
export const regitroTitularidadMock: IRegistroTitularidad = {
    codTit: '04070314-19-0001',
    codTipoTit: '1',
    codUbicacion: '04070314-19-0001',
    predio: predio,
    suministro: null,
    estado: TicketStatus.PENDIENTE_GESTION_RESULTADOS
};


export const regitroTitularidadMock3: IRegistroTitularidad = {
    codTit: '04070314-19-0002',
    codTipoTit: '1',
    codUbicacion: '04070314-19-0002',
    predio: predio,
    suministro: null,
    estado: TicketStatus.PENDIENTE_GESTION_RESULTADOS
};
*/
/*
export const regitroTitularidadMock2: IRegistroTitularidad = {
    codTit: '04070314-19-0003',
    codTipoTit: '2',
    codUbicacion: '04070314-19-0003',
    predio: null,
    suministro: suministro
};

export const regitroTitularidadMock4: IRegistroTitularidad = {

    codTit: '04070314-19-0004',
    codTipoTit: '2',
    codUbicacion: '04070314-19-0004',
    predio: null,
    suministro: suministro
};*/


export const registrosMock: IRegistroTitularidad[]=[

    {   id:1,
        codTit: '04070314-19-0001',
        codTipoTit: 1,
        codUbicacion: '04070314-19-0001',
        predio: predio,
        suministro: null,
        estado: 0
    },

    {   id:2,
        codTit: '04070314-19-0002',
        codTipoTit: 1,
        codUbicacion: '04070314-19-0002',
        predio: predio,
        suministro: null,
        estado: 0
    },
    {   id:3,
        codTit: '04070314-19-0003',
        codTipoTit: 1,
        codUbicacion: '04070314-19-0003',
        predio: predio,
        suministro: null,
        estado: 0
    },
    {   id:4,
        codTit: '04070314-19-0004',
        codTipoTit: 2,
        codUbicacion: '04070314-19-0004',
        predio: null,
        suministro: suministro,
        estado: 0
    }
];


export const ubicacionMock: IUbicacion =
    {   id:3,
        codTipVia: '02',
        numAlt: '',
        nomAlt: 'CUCARDAS (A.H. EL FRISCO)',
        codTipoUU: '01',
        codUsuario: '63',
        nomUU: 'EL FRISCO',
        obsUbicacion: '',
        nomRef: '',
        referencia: '',
        km: '0',
        y: -17.12870163901372,
        lotUrb: '6',
        codUU: '0023',
        numMun: '',
        codTicket: 'G04070300001024',
        codVia: '0213',
        x: -71.8097783060201,
        codUbicacion: '04070314-19-0002',
        nomVia: 'CUCARDAS',
        mznUrb: 'G',
        estado: 0,
        registroTitularidad: [registrosMock[0]],
        ubigeo: '040703'
    };



export const ubicacionMocks: IUbicacion[] = [
    {   id:1,
        codTipVia: '02',
        numAlt: '',
        nomAlt: 'CUCARDAS (A.H. EL FRISCO)',
        codTipoUU: '01',
        codUsuario: '63',
        nomUU: 'EL FRISCO',
        obsUbicacion: '',
        nomRef: '',
        referencia: '',
        km: '0',
        y: -17.12836261,
        lotUrb: '6',
        codUU: '0023',
        numMun: '',
        codTicket: 'G04070300001024',
        codVia: '0213',
        x: -71.80818038,
        codUbicacion: '04070314-19-0002',
        nomVia: 'CUCARDAS',
        mznUrb: 'G',
        estado: 0,
        registroTitularidad: [registrosMock[0]],
        ubigeo: '040703'
    },
     {id:2,
        codTipVia: '02',
        numAlt: '',
        nomAlt: 'CUCARDAS (A.H. EL FRISCO)',
        codTipoUU: '01',
        codUsuario: '63',
        nomUU: 'EL FRISCO',
        obsUbicacion: '',
        nomRef: '',
        referencia: '',
        km: '0',
        y: -17.1286882795,
        lotUrb: '6',
        codUU: '0023',
        numMun: '',
        codTicket: 'G04070300001025',
        codVia: '0213',
        x: -71.80894738,
        codUbicacion: '04070314-19-0002',
        nomVia: 'CUCARDAS',
        mznUrb: 'G',
        estado: 0,
        registroTitularidad: [registrosMock[1],registrosMock[3]],
        ubigeo: '040703'
    },
    {   id:3,
        codTipVia: '02',
        numAlt: '',
        nomAlt: 'CUCARDAS (A.H. EL FRISCO)',
        codTipoUU: '01',
        codUsuario: '63',
        nomUU: 'EL FRISCO',
        obsUbicacion: '',
        nomRef: '',
        referencia: '',
        km: '0',
        y: -17.12870163901372,
        lotUrb: '6',
        codUU: '0023',
        numMun: '',
        codTicket: 'G04070300001024',
        codVia: '0213',
        x: -71.8097783060201,
        codUbicacion: '04070314-19-0002',
        nomVia: 'CUCARDAS',
        mznUrb: 'G',
        estado: 0,
        registroTitularidad: [registrosMock[2]],
        ubigeo: '040703'

    }

];
