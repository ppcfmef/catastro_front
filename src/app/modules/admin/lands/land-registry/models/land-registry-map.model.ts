import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { LandRegistryMap } from '../interfaces/land-registry-map.interface';
import { Lote } from '../interfaces/lote.interface';

class LandRegistryMapModel implements LandRegistryMap{
    id: number;
    secEjec:number;
    ubigeo:string;
    cup: string;  // codigo unico patrimonial
    codSect:string;
    cpm: string;  // codigo patrimonial municipio
    codUu: string;
    codMzn:string;
    codLand:string;
    codCuc:string;
    uuType:string;
    habilitacionName: string;
    referenceName:string;
    urbanMza: string;
    urbanLotNumber: number;
    streetType: string;
    streetName: string;
    streetNameAlt:string;
    municipalNumber:string;
    block: string;
    indoor: string;
    floor:string;
    km:string;
    site: number;
    landmark:string;
    municipalAddress:string;
    urbanAddress:string;
    assignedAddress:string;
    latitude: number;
    longitude: number;
 
    idAranc:string;
   
    documentType:string;
    document:string;
    
    codOwner:string;
    name:string;
    paternalSurname:string;
    maternalSurname:string;
    descriptionOwner:string;
    taxAddress:string;
    status:number;
    landArea: number;
    frontLength:number;
    locationPark:string;
    groupUseDesc:string;
    numberInhabitants:number;
    classificationLandDesc:string;
    buildStatusDesc:string;
    propertyType:string;
    selfAssessmentTotal:number;
    condominium:number;
    deduction:number;
    selfAssessmentAffection:number;

    sourceInformation:string;
    resolutionType:string;
    resolutionDocument:string;
    idLote:number;
    constructor(){


    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    loteToLandRegistryMapModel(lote?: Lote){

        this.ubigeo =lote.UBIGEO;

        this.landArea =lote.AREA;
        
        this.codMzn= lote.COD_MZN
        this.codSect =lote.COD_SECT
        this.codUu =lote.COD_UU
        this.codMzn =lote.COD_MZN
        this.codLand =lote.COD_LOTE
        this.uuType = lote.TIPO_UU;
        this.habilitacionName= lote.NOM_UU;
        
        this.urbanLotNumber = lote.LOT_URB;
        this.streetType = lote.TIP_VIA;
        this.streetName = lote.NOM_VIA;
        this.block = lote.BLOCK;
        this.indoor = lote.INTERIOR;
        this.floor = lote.PISO;
        this.km =lote.KM;
        this.landmark =lote.REFEREN
        this.latitude = lote.COOR_X;
        this.longitude = lote.COOR_Y;
        this.sourceInformation=lote.FUENTE;
        this.idAranc =lote.ID_ARANC;


    }
   

}
