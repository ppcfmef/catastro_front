import { Land, LandMapIn } from '../interfaces/land-map-in.interface';

export class LandMapInModel implements LandMapIn{
    ownerLandId: number;
    land: Land;
    control: string;

    constructor(l?: LandMapIn){
        this.ownerLandId = l?.ownerLandId;
        this.land = l?.land;
        this.control = l?.control;
    }

}


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
