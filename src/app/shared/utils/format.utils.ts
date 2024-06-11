import { GestionPredio } from 'app/modules/admin/lands/land-registry/interfaces/gestion-predios.interface';
import { Lote } from 'app/modules/admin/lands/land-registry/interfaces/lote.interface';
import { Predio } from 'app/modules/admin/lands/land-registry/interfaces/predio.interface';
import { LandRegistryMapModel } from 'app/modules/admin/lands/land-registry/models/land-registry-map.model';
import { ResultUI } from 'app/modules/admin/lands/maintenance/interfaces/result.interface';
import moment from 'moment';

export class FormatUtils {


  public static   formatLoteToLandRegistryMapModel(lote?: Lote): LandRegistryMapModel{

    const land = new LandRegistryMapModel();
    //land.idObjectImg = lote.OBJECTID;

    land.ubigeo =lote.UBIGEO;
    land.landArea =lote.AREA;
    land.codMzn= lote.COD_MZN;
    land.codSect =lote.COD_SECT;
    land.codUu =lote.COD_UU;
    land.codMzn =lote.COD_MZN;
    land.codLand =lote.COD_LOTE;
    land.uuType = lote.TIPO_UU;
    land.habilitacionName= lote.NOM_UU;
    land.urbanLotNumber = lote.LOT_URB;
    land.streetType = lote.TIP_VIA;
    land.streetName = lote.NOM_VIA;
    land.block = lote.BLOCK;
    land.indoor = lote.INTERIOR;
    land.floor = lote.PISO;
    land.km =lote.KM;
    land.landmark =lote.REFEREN;
    land.latitude = lote.COORD_Y;
    land.longitude = lote.COORD_X;
    land.sourceInformation=lote.FUENTE;
    land.idAranc =lote.ID_ARANC;
    land.urbanMza = lote.MZN_URB;
    land.codStreet = lote.COD_VIA;
    //land.idLote= lote.ID_LOTE;
    land.idPlot= lote.ID_LOTE;
    //land.idLandCartographic = lote.ID_PREDIO;
        // atributos adicionales de lote
        land.departure= lote.PARTIDA;
        land.side=lote.LADO;
        land.ranNum=lote.RAN_NUM;
        land.streetBlock=lote.CUADRA;
        land.rangCup = lote.RAN_CPU;
        land.municipalNumber = lote.NUM_MUN;
        land.idLoteP = lote.ID_LOTE_P;
    return land;

}

/* eslint-disable @typescript-eslint/naming-convention */
public static   formatLandRegistryMapModelToGestionPredio(land: LandRegistryMapModel): GestionPredio{
    const gestion: GestionPredio ={
        OBJECTID: land.idObjectImg,
        ID_LOTE_P : land.idLoteP,
        UBIGEO: land.ubigeo,
        
        COD_MZN: land.codMzn,

        COD_SECT: land.codSect,

        COD_UU: land.codUu,


        COD_LOTE: land.codLand,

        TIPO_UU: land.uuType,

        NOM_UU: land.habilitacionName,

        LOT_URB: land.urbanLotNumber,

        TIP_VIA: land.streetType,

        NOM_VIA: land.streetName,

        BLOCK: land.block,

        INTERIOR: land.indoor,

        PISO: land.floor,

        KM: land.km,

        REFERENCIA: land.landmark,

        COORD_Y: land.latitude,

        COORD_X: land.longitude,

        FUENTE: land.sourceInformation,

        ID_ARANC: land.idAranc,

        ID_LOTE: land.idPlot,

        ID_PRED: land.idLandCartographic,

        NUM_MUN: land.municipalNumber,
        NUM_ALT: land.municipalNumberAlt,
        COD_PRE: land.cpm,

        SEC_EJEC: '',

        COD_CPU: '',

        ANIO_CART: 0,

        COD_VIA: land.codStreet,


        MZN_URB: land.urbanMza,



        TIP_DOC: '',

        DOC_IDEN: '',

        COD_CONTR: '',

        NOMBRE: '',

        AP_PAT: '',

        AP_MAT: '',

        DIR_FISCAL: '',

        ESTADO: 0,

        ID_IMG: land.idCartographicImg,
        SECUEN: land.secuen,

        PARTIDA: land.departure,
        LADO: land.side,
        RAN_NUM: land.ranNum,
        CUADRA: land.streetBlock,
        NOM_USER: '',
        NOM_PC: '',
        ZONA_UTM: 0
    };
    return gestion;
}
/* eslint-disable @typescript-eslint/naming-convention */

public static  formatLandRegistryMapModelToPredio(land: LandRegistryMapModel):  Predio{
    const predio: Predio ={
        OBJECTID: null,
        ID_LOTE_P : land.idLoteP,
        ID_LOTE: land.idPlot,

        UBIGEO: land.ubigeo,

        COD_MZN: land.codMzn,

        COD_SECT: land.codSect,

        COD_UU: land.codUu,


        COD_LOTE: land.codLand,

        TIPO_UU: land.uuType,

        NOM_UU: land.habilitacionName,

        LOT_URB: land.urbanLotNumber,

        TIP_VIA: land.streetType,

        NOM_VIA: land.streetName,

        BLOCK: land.block,

        INTERIOR: land.indoor,

        PISO: land.floor,

        KM: land.km,

        REFEREN: land.landmark,

        COORD_Y: land.latitude,

        COORD_X: land.longitude,

        FUENTE: land.sourceInformation,

        ID_ARANC: land.idAranc,


        ID_PRED: land.idLandCartographic,



        SEC_EJEC: 0,

        COD_CPU: land.cup,

        ANIO_CART: 0,

        COD_VIA: land.codStreet,


        MZN_URB: land.urbanMza,

        NUM_MUN: land.municipalNumber,
        NUM_ALT: land.municipalNumberAlt,
        COD_PRE: land.cpm,


        COD_CUC: '',

        AREA: 0,



        PARTIDA: land.departure,

        LADO: land.side,
        RAN_NUM: land.ranNum,
        CUADRA: land.streetBlock,
        RAN_CPU: land.cup ? parseInt(land.cup.split('-')[0], 10) : null,
        COD_UI: land.cup ? parseInt(land.cup.split('-')[1], 10) : null,
        COD_VER: land.cup ? parseInt(land.cup.split('-')[2], 10) : null,
        NOM_USER: '',
        NOM_PC: '',
        ZONA_UTM: 0,
        VAL_ACT: 0,
        ESTADO:1,
    };
    return predio;

}

/* eslint-disable @typescript-eslint/naming-convention */

public static  formatResultUIToResultUI(r: ResultUI):  ResultUI{
    const result: ResultUI ={
        id: r.id,
        hasApplications: r.hasApplications,
        idPlot: r.idPlot,
        idCartographicImg:  r.idCartographicImg,
        secEjec: r.secEjec,
        ubigeo: r.ubigeo,
        cup:  r.cup,
        codSect: r.codSect,
        cpm: r.cpm,
        codUu: r.codUu,
        codMzn: r.codMzn,
        codLand: r.codLand,
        codCuc: r.codCuc,
        uuType: r.uuType,
        habilitacionName: r.habilitacionName,
        referenceName: r.referenceName,
        urbanMza: r.urbanMza,
        urbanLotNumber: r.urbanLotNumber,
        streetType: r.streetType,
        streetName: r.streetName,
        streetNameAlt: r.streetNameAlt,
        municipalNumber: r.municipalNumber,
        block: r.block,
        indoor: r.indoor,
        floor: r.floor,
        km: r.km,
        site: r.site,
        landmark: r.landmark,
        municipalAddress: r.municipalAddress,
        urbanAddress: r.urbanAddress,
        assignedAddress: null,
        latitude: r.latitude,
        longitude: r.longitude,
        idAranc: r.idAranc,
        documentType: r.documentType,
        document: r.document,
        codOwner: r.codOwner,
        name: null,
        paternalSurname: null,
        maternalSurname: null,
        descriptionOwner: null,
        taxAddress: null,
        status: r.status,
        inactiveReason: '',
        landArea: r.landArea,
        frontLength: null,
        locationPark: null,
        groupUseDesc: null,
        numberInhabitants: null,
        classificationLandDesc: null,
        buildStatusDesc: null,
        propertyType: null,
        selfAssessmentTotal: null,
        condominium: null,
        deduction: null,
        selfAssessmentAffection: null,
        sourceInformation: null,
        resolutionType: r.resolutionType,
        resolutionDocument: r.resolutionDocument,
        apartmentNumber: r.apartmentNumber,
        statusImg: null,
        idLote: null,
        idImg: null,
        secuen: r.secuen,
        idLandCartographic: null,
        departure: null,
        side: null,
        ranNum: null,
        streetBlock: r.streetBlock,
        rangCup:null,
        creationDate: null,
        resolutionDate: moment(r.resolutionDate).format('YYYY-MM-DD')
    };
    return result;

}

}
