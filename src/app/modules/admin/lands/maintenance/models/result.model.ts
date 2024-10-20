import { ResultUI } from '../interfaces/result.interface';

export class ResultModel  implements ResultUI {
    id: number;
    hasApplications: boolean;
    idPlot: string | null;
    idCartographicImg: string | null;
    secEjec: number;
    ubigeo: string;
    cup: string; // codigo unico patrimonial
    codSect: string;
    cpm: string; // codigo patrimonial municipio
    codUu: string;
    codMzn: string;
    codLand: string;
    codCuc: string;
    uuType: string;
    habilitacionName: string;
    referenceName: string;
    urbanMza: string;
    urbanLotNumber: number;
    codStreet?: string;
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
    inactiveReason: string;
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

    sourceInformation: string;
    resolutionType: string;
    resolutionDocument: string;

    apartmentNumber: string;
    statusImg: number;
    idLote: string;

    owner?: number | null;
    idImg: string;
    secuen: number;
    idLandCartographic: string;
    // atributos adicionales de lote
    departure: string;
    side: string;
    ranNum: string;
    streetBlock: string;
    rangCup: string;
    creationDate: string;
    resolutionDate: any;
    constructor(l?: ResultUI){
        this.id= l?.id;
        this.hasApplications =l?.hasApplications;
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
        //this.idImg = l?.idImg;
        this.secuen =l?.secuen;

        this.idCartographicImg = l?.idCartographicImg;
        this.idPlot = l?.idPlot;

        this.idLandCartographic = l?.idLandCartographic;


        this.departure=l?.departure;
        this.side=l?.side;
        this.ranNum=l?.ranNum;
        this.streetBlock=l?.streetBlock;
        this.rangCup= l?.rangCup;
        this.creationDate=l?.creationDate;
        this.resolutionDate = l?.resolutionDate;
    }

}
