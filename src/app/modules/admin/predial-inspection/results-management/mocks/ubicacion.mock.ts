import { TicketStatus } from 'app/shared/enums/ticket-status.enum';
import {IContribuyente} from '../interfaces/contribuyente.interface';
import {IPredioInspeccion} from '../interfaces/predio-inspeccion.interface';
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

const predio: IPredioInspeccion = {
    id:1,
    piso: '',
    numSumiAgua: '',
    codTipoPredio: 'PU',
    numSumiLuz: '',
    usoEspecifico: 'RESIDENCIAL - CASA HABITACION',
    interior: '',
    obsPredio: '',
    codTit: '04070314-10-0001',
    codCpu: '',
    codPre: '14-10-0001',
    numDpto: '',
    codigoUso: '',
    estado: TicketStatus.PENDIENTE_GESTION_RESULTADOS,
    block: '',
    numSumiGas: '',
    predioContribuyente: null,
    status: 0,
    ubigeo:''
};

const predio2: IPredioInspeccion = {
    id: 2,
    piso: '',
    numSumiAgua: '',
    codTipoPredio: 'PU',
    numSumiLuz: '',
    usoEspecifico: 'RESIDENCIAL - CASA HABITACION',
    interior: '',
    obsPredio: '',
    codTit: '04070314-10-0002',
    codCpu: '',
    codPre: '14-10-0002',
    numDpto: '',
    codigoUso: '',
    estado: TicketStatus.PENDIENTE_GESTION_RESULTADOS,
    block: '',
    numSumiGas: '',
    predioContribuyente: null,
    status: 1,
    ubigeo: ''
};

const suministro: ISuministro = {
    codSuministro:'1',
    codTit: '04070314-19-0002',
    codTipoSumi: '1',
    numSumis: '040703142243',
    tipoSumi: 'Suministri de Agua',
    obsSumis: 'oifuef oufuehf uheufiwadfuhfjkjfa',
    estado:TicketStatus.PENDIENTE_GESTION_RESULTADOS,
    contribuyente: {
        condContr: '',
        dirFiscal: '',
        apMat: '',
        docIden: '',
        codContr: '',
        apPat: '',
        tipDoc: '',
        contribuyente: '',
        nombre: '',
        conyuge: ''
    },
    codContr:null
};

const  caracteristica: ICaracteristica= {
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
};

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
    'foto': 'ahpuiasldmvasldvnuasnruvnarvn'
},
{
    'codFoto': '140923135959',
    'codUbicacion': '04070314-19-0002',
    'codTipoFoto': '1',
    'foto': 'ahpuiasldmvasldvnuasnruvnarvn'
},
{
    'codFoto': '140923135959',
    'codUbicacion': '04070314-19-0002',
    'codTipoFoto': '1',
    'foto': 'ahpuiasldmvasldvnuasnruvnarvn'
}
];





export const registrosMock: IRegistroTitularidad[]=[

    {   id:1,
        codTit: '04070314-19-0001',
        codTipoTit: 1,
        codUbicacion: '04070314-19-0001',
        predioInspeccion: predio,
        predioPadron: null,
        suministro: null,
        status: 0,

        instalaciones:instalaciones,
        caracteristicas:caracteristica,inicio:false


    },

    {   id:2,
        codTit: '04070314-19-0002',
        codTipoTit: 1,
        codUbicacion: '04070314-19-0002',
        predioInspeccion: predio2,
        predioPadron: null,
        suministro: null,
        status: 0,

        instalaciones:instalaciones,
        caracteristicas:caracteristica,inicio:false
    },
    {   id:3,
        codTit: '04070314-19-0003',
        codTipoTit: 1,
        codUbicacion: '04070314-19-0003',
        predioInspeccion: predio,
        predioPadron: null,
        suministro: null,
        status: 0,

        instalaciones:instalaciones,
        caracteristicas:caracteristica,inicio:false
    },
    {   id:4,
        codTit: '04070314-19-0004',
        codTipoTit: 2,
        codUbicacion: '04070314-19-0004',
        predioInspeccion: null,
        suministro: suministro,
        predioPadron: null,
        status: 0,

        instalaciones:instalaciones,
        caracteristicas:caracteristica,inicio:false
    },
    {   id:5,
        codTit: '04070314-19-0005',
        codTipoTit: 1,
        codUbicacion: '04070314-19-0004',
        predioInspeccion: predio2,
        predioPadron: null,
        suministro: null,
        status: 0,

        instalaciones:instalaciones,
        caracteristicas:caracteristica,inicio:false
    },
    {   id:6,
        codTit: '04070314-19-0006',
        codTipoTit: 1,
        codUbicacion: '04070314-19-0004',
        predioInspeccion: predio,
        predioPadron: null,
        suministro: null,
        status: 0,

        instalaciones:instalaciones,
        caracteristicas:caracteristica,inicio:false
    },
    {   id:7,
        codTit: '04070314-19-0007',
        codTipoTit: 1,
        codUbicacion: '04070314-19-0004',
        predioInspeccion: predio,
        predioPadron: null,
        suministro: null,
        status: 0,

        instalaciones:instalaciones,
        caracteristicas:caracteristica,inicio:false
    }
    ,
    {   id:8,
        codTit: '04070314-19-0008',
        codTipoTit: 2,
        codUbicacion: '04070314-19-0004',
        predioInspeccion: null,
        predioPadron: null,
        suministro: suministro,
        status: 0,

        instalaciones:instalaciones,
        caracteristicas:caracteristica,inicio:false
    },
    {   id:9,
        codTit: '04070314-19-0009',
        codTipoTit: 1,
        codUbicacion: '04070314-19-0004',
        predioInspeccion: predio,
        predioPadron: null,
        suministro: null,
        status: 0,

        instalaciones:instalaciones,
        caracteristicas:caracteristica,inicio:false
    }
];


export const ubicacionMock: IUbicacion =
    {
        id: 3,
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
        status: 0,
        registrosTitularidad: [registrosMock[0]],
        ubigeo: '040703',
        fotos: []
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
        status: 0,
        registrosTitularidad: [registrosMock[0]],
        ubigeo: '040703',
        fotos:[]
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
        status: 0,
        registrosTitularidad: [registrosMock[1],registrosMock[3]],
        ubigeo: '040703',
        fotos:[]

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
        status: 0,
        registrosTitularidad: [registrosMock[2]],
        ubigeo: '040703',
        fotos:[]

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
        status: 0,
        registrosTitularidad: [registrosMock[4],registrosMock[5],registrosMock[7]],
        ubigeo: '040703',
        fotos:[]
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
        status: 0,
        registrosTitularidad: [registrosMock[6]],
        ubigeo: '040703',
        fotos:[]

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
        status: 0,
        registrosTitularidad: [registrosMock[8]],
        ubigeo: '040703',
        fotos:[]

    }

];
