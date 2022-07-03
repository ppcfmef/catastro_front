import { LandRegistryMap } from '../interfaces/land-registry-map.interface';
import { Lote } from '../interfaces/lote.interface';

class LandRegistryMapModel implements LandRegistryMap{
    id!: number;
    cup!: string;
    cpm!: string;
    habilitacionName!: string;
    streetType!: string;
    streetName!: string;
    urbanMza!: string;
    urbanLotNumber!: number;
    site!: number;
    indoor!: number;
    block!: string;
    latitude!: number;
    longitude!: number;
    landArea!: number;
    owner!: number;

    constructor(l?: LandRegistryMap){
        this.id= l.id;
        this.cup= l.cup;
        this.cpm=l.cpm;
        this.habilitacionName=l.habilitacionName;
        this.streetType=l.streetType;
        this.streetName=l.streetName;
        this.urbanMza=l.urbanMza;
        this.urbanLotNumber=l.urbanLotNumber;
        this.site = this.site;
        this.indoor = this.indoor;
        this.block = this.block;
        this.latitude = this.latitude;
        this.longitude = this.longitude;
        this.landArea = this.landArea;
        this.owner = this.owner;
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    loteToLandRegistryMapModel(lote?: Lote){
        this.habilitacionName= lote.NOM_UU;
        this.urbanLotNumber = lote.LOT_URB;
        this.streetType = lote.TIP_VIA;
        this.streetName = lote.NOM_VIA;
        this.block = lote.BLOCK;
        this.indoor = lote.INTERIOR;
        this.latitude = lote.LATITUDE;
        this.longitude = lote.LONGITUDE;
        this.landArea =lote.AREA;
    }
    //LoteToLandLandRegistryMapModel(lote: )

}
