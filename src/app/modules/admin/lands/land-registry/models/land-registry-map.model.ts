
import { GestionPredios } from '../interfaces/gestion-predios.interface';
import { LandRegistryMap } from '../interfaces/land-registry-map.interface';
import { Lote } from '../interfaces/lote.interface';

export class LandRegistryMapModel implements LandRegistryMap{
    id: number;
    idPlot: string | null;
    idCartographicImg: string | null;
    secEjec: number;
    ubigeo: string;
    cup: string;  // codigo unico patrimonial
    codSect: string;
    cpm: string;  // codigo patrimonial municipio
    codUu: string;
    codMzn: string;
    codLand: string;
    codCuc: string;
    uuType: string;
    habilitacionName: string;
    referenceName: string;
    urbanMza: string;
    urbanLotNumber: number;
    streetType: string;
    streetName: string;
    streetNameAlt: string;
    municipalNumber: string;
    block: string;
    indoor: string;
    floor: string;
    km: string;
    site: number;
    landmark: string;
    municipalAddress: string;
    urbanAddress: string;
    assignedAddress: string;
    latitude: number;
    longitude: number;

    idAranc: string;

    documentType: string;
    document: string;

    codOwner: string;
    name: string;
    paternalSurname: string;
    maternalSurname: string;
    descriptionOwner: string;
    taxAddress: string;
    status: number;
    landArea: number;
    frontLength: number;
    locationPark: string;
    groupUseDesc: string;
    numberInhabitants: number;
    classificationLandDesc: string;
    buildStatusDesc: string;
    propertyType: string;
    selfAssessmentTotal: number;
    condominium: number;
    deduction: number;
    selfAssessmentAffection: number;
    apartmentNumber: string;
    statusImg: number;
    sourceInformation: string;
    resolutionType: string;
    resolutionDocument: string;
    idLote: number;

    constructor(l?: LandRegistryMap){
        this.id= l?.id;
        this.secEjec=l?.secEjec;
        this.ubigeo=l?.ubigeo;
        this.cup =l?.cup;  // codigo unico patrimonial
        this.codSect=l?.codSect ;
        this.cpm=l?.cpm;  // codigo patrimonial municipio
        this.codUu=l?.codUu;
        this.codMzn=l?.codMzn;
        this.codLand=l?.codLand;
        this.codCuc=l?.codCuc;
        this.uuType=l?.uuType;
        this.habilitacionName=l?.habilitacionName;
        this.referenceName=l?.referenceName;
        this.urbanMza=l?.urbanMza;
        this.urbanLotNumber=l?.urbanLotNumber;
        this.streetType=l?.streetType;
        this.streetName=l?.streetName;
        this.streetNameAlt=l?.streetNameAlt;
        this.municipalNumber=l?.municipalNumber;
        this.block=l?.block;
        this.indoor=l?.indoor;
        this.floor=l?.floor;
        this.km=l?.km;
        this.site=l?.site;
        this.landmark=l?.landmark;
        this.municipalAddress=l?.municipalAddress;
        this.urbanAddress=l?.urbanAddress;
        this.assignedAddress=l?.assignedAddress;
        this.latitude=l?.latitude;
        this.longitude=l?.longitude;

        this.idAranc=l?.idAranc;

        this.documentType=l?.documentType;
        this.document=l?.document;

        this.codOwner=l?.codOwner;
        this.name=l?.name;
        this.paternalSurname=l?.paternalSurname;
        this.maternalSurname=l?.maternalSurname;
        this.descriptionOwner=l?.descriptionOwner;
        this.taxAddress=l?.taxAddress;
        this.status=l?.status;
        this.landArea=l?.landArea;
        this.frontLength=l?.frontLength;
        this.locationPark=l?.locationPark;
        this.groupUseDesc=l?.groupUseDesc;
        this.numberInhabitants=l?.numberInhabitants;
        this.classificationLandDesc=l?.classificationLandDesc;
        this.buildStatusDesc=l?.buildStatusDesc;
        this.propertyType=l?.propertyType;
        this.selfAssessmentTotal=l?.selfAssessmentTotal;
        this.condominium=l?.condominium;
        this.deduction=l?.deduction;
        this.selfAssessmentAffection=l?.selfAssessmentAffection;

        this.sourceInformation=l?.sourceInformation;
        this.resolutionType=l?.resolutionType;
        this.resolutionDocument=l?.resolutionDocument;
        this.idLote=l?.idLote;

    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    loteToLandRegistryMapModel(lote?: Lote){

        this.ubigeo =lote.UBIGEO;
        this.landArea =lote.AREA;
        this.codMzn= lote.COD_MZN;
        this.codSect =lote.COD_SECT;
        this.codUu =lote.COD_UU;
        this.codMzn =lote.COD_MZN;
        this.codLand =lote.COD_LOTE;
        this.uuType = lote.TIPO_UU;
        this.habilitacionName= lote.NOM_UU;
        this.urbanLotNumber = lote.LOT_URB;
        this.streetType = lote.TIP_VIA;
        this.streetName = lote.NOM_VIA;
        this.block = lote.BLOCK;
        this.indoor = lote.INTERIOR;
        this.floor = lote.PISO;
        this.km =lote.KM;
        this.landmark =lote.REFEREN;
        this.latitude = lote.COOR_Y;
        this.longitude = lote.COOR_X;
        this.sourceInformation=lote.FUENTE;
        this.idAranc =lote.ID_ARANC;
        this.idLote= lote.ID_LOTE;

    }

    getGestionPredios(): GestionPredios{
        const gestion: GestionPredios ={
            // eslint-disable-next-line @typescript-eslint/naming-convention
            UBIGEO: this.ubigeo,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            COD_MZN: this.codMzn,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            COD_SECT: this.codSect,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            COD_UU: this.codUu,

            // eslint-disable-next-line @typescript-eslint/naming-convention
            COD_LOTE: this.codLand,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            TIPO_UU: this.uuType,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            NOM_UU: this.habilitacionName,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            LOT_URB: this.urbanLotNumber,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            TIP_VIA: this.streetType,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            NOM_VIA: this.streetName,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            BLOCK: this.block,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            INTERIOR: this.indoor,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            PISO: this.floor,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            KM: this.km,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            REFERENCIA: this.landmark,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            COOR_X: this.longitude,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            COOR_Y: this.latitude,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            FUENTE: this.sourceInformation,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            ID_ARANC: this.idAranc,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            ID_LOTE: this.idLote,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            ID_PRED: 0,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            COD_PRE: '',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            SEC_EJEC: '',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            COD_CPU: '',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            ANIO_CART: 0,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            COD_VIA: '',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            CUADRA: '',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            LADO: '',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            MZN_URB: '',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            NUM_MUN: '',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            PARTIDA: '',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            RAN_NUM: '',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            TIP_DOC: '',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            DOC_IDEN: '',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            COD_CONTR: '',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            NOMBRE: '',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            AP_PAT: '',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            AP_MAT: '',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            DIR_FISCAL: '',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            ESTADO: ''
        };
        return gestion;

    }


}
