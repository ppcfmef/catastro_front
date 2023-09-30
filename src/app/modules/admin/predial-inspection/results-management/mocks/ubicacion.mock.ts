import { IPredio } from "../interfaces/predio.interface";
import { IRegistroTitularidad } from "../interfaces/registro-titularidad.interface";
import { ISuministro } from "../interfaces/suministro.interface";
import { IUbicacion } from "../interfaces/ubicacion.interface";




const predio: IPredio = {
    piso: "",
    numSumiAgua: "",
    codTipoPredio: "PU",
    numSumiLuz: "",
    usoEspecifico: "RESIDENCIAL - CASA HABITACION",
    interior: "",
    obsPredio: "",
    codTit: "04070314-10-0001",
    codCPU: "30807399-0001-2",
    codPre: "14-10-0001",
    numDpto: "",
    codigoUso: "",
    estado: "",
    block: "",
    numSumiGas: "",
}

const suministro : ISuministro ={
    codTit: "04070314-19-0002",
    codTipoSumi: "1",
    numSumis: "040703142243",
    obsSumis: "oifuef oufuehf uheufiwadfuhfjkjfa"
} 

export const regitroTitularidadMock: IRegistroTitularidad ={
    codTit: "04070314-19-0002",
    codTipoTit: "1",
    codUbicacion: "04070314-19-0002",
    predio: predio,
    suministro: suministro
}


export const regitroTitularidadMock2: IRegistroTitularidad ={
    codTit: "04070314-19-0002",
    codTipoTit: "1",
    codUbicacion: "04070314-19-0002",
    predio: predio,
    suministro: suministro
}


export const ubicacionMocks: IUbicacion[]=[{
    codTipVia: "02",
    numAlt: "",
    nomAlt: "CUCARDAS (A.H. EL FRISCO)",
    codTipoUU: "01",
    codUsuario: "63",
    nomUU: "EL FRISCO",
    obsUbicacion: "",
    nomRef: "",
    referencia: "",
    km: "0",
    y: -17.12836261,
    lotUrb: "6",
    codUU: "0023",
    numMun: "",
    codTicket: "G04070300001024",
    codVia: "0213",
    x: -71.80818038,
    codUbicacion: "04070314-19-0002",
    nomVia: "CUCARDAS",
    mznUrb: "G",
    codEstado:0,
    registroTitularidad: [regitroTitularidadMock],
    
},

{
    codTipVia: "02",
    numAlt: "",
    nomAlt: "CUCARDAS (A.H. EL FRISCO)",
    codTipoUU: "01",
    codUsuario: "63",
    nomUU: "EL FRISCO",
    obsUbicacion: "",
    nomRef: "",
    referencia: "",
    km: "0",
    y: -17.12836261,
    lotUrb: "6",
    codUU: "0023",
    numMun: "",
    codTicket: "G04070300001024",
    codVia: "0213",
    x: -71.80818038,
    codUbicacion: "04070314-19-0002",
    nomVia: "CUCARDAS",
    mznUrb: "G",
    codEstado:0,
    registroTitularidad: [regitroTitularidadMock2]
}

]


