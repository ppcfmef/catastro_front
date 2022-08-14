import { Land, LandMapIn } from '../interfaces/land-map-in.interface';
import { LandOwner } from '../interfaces/land-owner.interface';
import { LandRegistryMap } from '../interfaces/land-registry-map.interface';

export class LandMapInModel implements LandMapIn{
    ownerLandId: number;
    //land: Land;
    control: string;

    landId: number;
    ubigeo: string;
    x: number;
    y: number;
    land: LandRegistryMap;
    owner: LandOwner;

    constructor(l?: LandMapIn){

        this.ownerLandId = l?.ownerLandId;
        this.control = l?.control;
        this.landId = l?.landId;
        this.ubigeo = l?.ubigeo;
        this.x = l?.x;
        this.y = l?.y;
        this.owner = l?.owner;
        /*this.ownerLandId = l?.ownerLandId;
        this.land = l?.land;
        this.control = l?.control;*/
    }

}

/*
export class LandModel implements Land{
    landId: number;
    ubigeo: string;
    x: number;
    y: number;
    constructor(l?: Land){
        this.landId = l?.landId;
        this.ubigeo = l?.ubigeo;
        this.x = l?.x;
        this.y = l?.y;
    }
}
*/
