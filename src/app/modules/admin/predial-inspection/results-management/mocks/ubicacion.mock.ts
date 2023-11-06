import { TicketStatus } from 'app/shared/enums/ticket-status.enum';
import {IContribuyente} from '../interfaces/contribuyente.interface';
import {IPredio} from '../interfaces/predio.interface';
import {IRegistroTitularidad} from '../interfaces/registro-titularidad.interface';
import {ISuministro} from '../interfaces/suministro.interface';
import {IUbicacion} from '../interfaces/ubicacion.interface';
import { ICaracteristica } from '../interfaces/caracteristica.interface';
import { IInstalacion } from '../interfaces/instalacion.interface';
import { IFoto } from '../interfaces/foto.interface';


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
    codCPU: '',
    codPre: '14-10-0001',
    numDpto: '',
    codigoUso: '',
    estado: TicketStatus.PENDIENTE_GESTION_RESULTADOS,
    block: '',
    numSumiGas: '',
    contribuyente: contribuyenteMock,
    status: 0
};

const predio2: IPredio = {
    piso: '',
    numSumiAgua: '',
    codTipoPredio: 'PU',
    numSumiLuz: '',
    usoEspecifico: 'RESIDENCIAL - CASA HABITACION',
    interior: '',
    obsPredio: '',
    codTit: '04070314-10-0002',
    codCPU: '',
    codPre: '14-10-0002',
    numDpto: '',
    codigoUso: '',
    estado: TicketStatus.PENDIENTE_GESTION_RESULTADOS,
    block: '',
    numSumiGas: '',
    contribuyente: contribuyenteMock,
    status: 1
};

const suministro: ISuministro = {
    codTit: '04070314-19-0002',
    codTipoSumi: '1',
    numSumis: '040703142243',
    obsSumis: 'oifuef oufuehf uheufiwadfuhfjkjfa',
    estado:TicketStatus.PENDIENTE_GESTION_RESULTADOS,
    contribuyente:null
};

const  caracteristica: ICaracteristica[] =[{
    categoriaElectrica: 'A',
    piso: '1',
    estadoConserva: 'Bueno',
    anioConstruccion: 2002,
    catergoriaTecho: 'A',
    longitudFrente: 6,
    categoriaMuroColumna: 'A',
    catergoriaPuertaVentana: 'B',
    arancel: 45,
    materialPred: '',
    codTit: '04070314-10-0001',
    categoriaRevestimiento: 'C',
    areaTerreno: 200.0,
    clasificacionPred: 'Casa',
    catergoriaPiso: 'G',
    catergoriaBano: 'G',
    areaConstruida: 18.0
},

{
    categoriaElectrica: 'A',
    piso: '1',
    estadoConserva: 'Bueno',
    anioConstruccion: 2002,
    catergoriaTecho: 'A',
    longitudFrente: 6,
    categoriaMuroColumna: 'A',
    catergoriaPuertaVentana: 'B',
    arancel: 45,
    materialPred: '',
    codTit: '04070314-10-0001',
    categoriaRevestimiento: 'C',
    areaTerreno: 200.0,
    clasificacionPred: 'Casa',
    catergoriaPiso: 'G',
    catergoriaBano: 'G',
    areaConstruida: 20
}

];

const instalaciones: IInstalacion[]=[       {
    'codTit': '04070314-19-0002',
    'codInst': '04070314-19-0002-01',
    'codTipoInst': '1',
    'anioConstruccion': '2012',
    'estadoConserva': 'bueno',
    'dimension': '15'
},
{
    'codTit': '04070314-19-0002',
    'codInst': '04070314-19-0002-02',
    'codTipoInst': '2',
    'anioConstruccion': '2013',
    'estadoConserva': 'malo',
    'dimension': '14'
}];

const fotos: IFoto[]= [
    {
    'codFoto': '140923135959',
    'codUbicacion': '04070314-19-0002',
    'codTipoFoto': '1',
    'urlFoto': 'ahpuiasldmvasldvnuasnruvnarvn'
},
{
    'codFoto': '140923135959',
    'codUbicacion': '04070314-19-0002',
    'codTipoFoto': '1',
    'urlFoto': 'ahpuiasldmvasldvnuasnruvnarvn'
},
{
    'codFoto': '140923135959',
    'codUbicacion': '04070314-19-0002',
    'codTipoFoto': '1',
    'urlFoto': 'ahpuiasldmvasldvnuasnruvnarvn'
}
];

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
        estado: 0,
        fotos:fotos,
        instalaciones:instalaciones,
        caracteristicas:caracteristica

    },

    {   id:2,
        codTit: '04070314-19-0002',
        codTipoTit: 1,
        codUbicacion: '04070314-19-0002',
        predio: predio2,
        suministro: null,
        estado: 0,
        fotos:fotos,
        instalaciones:instalaciones,
        caracteristicas:caracteristica
    },
    {   id:3,
        codTit: '04070314-19-0003',
        codTipoTit: 1,
        codUbicacion: '04070314-19-0003',
        predio: predio,
        suministro: null,
        estado: 0,
        fotos:fotos,
        instalaciones:instalaciones,
        caracteristicas:caracteristica
    },
    {   id:4,
        codTit: '04070314-19-0004',
        codTipoTit: 2,
        codUbicacion: '04070314-19-0004',
        predio: null,
        suministro: suministro,
        estado: 0,
        fotos:fotos,
        instalaciones:instalaciones,
        caracteristicas:caracteristica
    },
    {   id:5,
        codTit: '04070314-19-0005',
        codTipoTit: 1,
        codUbicacion: '04070314-19-0004',
        predio: predio2,
        suministro: null,
        estado: 0,
        fotos:fotos,
        instalaciones:instalaciones,
        caracteristicas:caracteristica
    },
    {   id:6,
        codTit: '04070314-19-0006',
        codTipoTit: 1,
        codUbicacion: '04070314-19-0004',
        predio: predio,
        suministro: null,
        estado: 0,
        fotos:fotos,
        instalaciones:instalaciones,
        caracteristicas:caracteristica
    },
    {   id:7,
        codTit: '04070314-19-0007',
        codTipoTit: 1,
        codUbicacion: '04070314-19-0004',
        predio: predio,
        suministro: null,
        estado: 0,
        fotos:fotos,
        instalaciones:instalaciones,
        caracteristicas:caracteristica
    }
    ,
    {   id:8,
        codTit: '04070314-19-0008',
        codTipoTit: 2,
        codUbicacion: '04070314-19-0004',
        predio: null,
        suministro: suministro,
        estado: 0,
        fotos:fotos,
        instalaciones:instalaciones,
        caracteristicas:caracteristica
    },
    {   id:9,
        codTit: '04070314-19-0009',
        codTipoTit: 1,
        codUbicacion: '04070314-19-0004',
        predio: predio,
        suministro: null,
        estado: 0,
        fotos:fotos,
        instalaciones:instalaciones,
        caracteristicas:caracteristica
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
        y: -17.127261122644466,
        lotUrb: '6',
        codUU: '0023',
        numMun: '',
        codTicket: 'G04070300001024',
        codVia: '0213',
        x: -71.80572539909576,
        codUbicacion: '04070314-19-0002',
        nomVia: 'CUCARDAS',
        mznUrb: 'G',
        estado: 0,
        registroTitularidad: [registrosMock[2]],
        ubigeo: '040703'

    },

    {id:4,
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
        registroTitularidad: [registrosMock[4],registrosMock[5],registrosMock[7]],
        ubigeo: '040703'
    },
    {   id:5,
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
        y: -17.131704059055085,
        lotUrb: '6',
        codUU: '0023',
        numMun: '',
        codTicket: 'G04070300001024',
        codVia: '0213',
        x: -71.8134378337222,
        codUbicacion: '04070314-19-0002',
        nomVia: 'CUCARDAS',
        mznUrb: 'G',
        estado: 0,
        registroTitularidad: [registrosMock[6]],
        ubigeo: '040703'

    },
    {   id:6,
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
        registroTitularidad: [registrosMock[8]],
        ubigeo: '040703'

    }

];
