import { LandOwner } from './land-owner.interface';
import { LandRegistryMap } from './land-registry-map.interface';

export interface Land{
    landId: number;
    ubigeo: string;
    x: number;
    y: number;
}

export interface LandMapIn{
    ownerLandId: number;
    //land: Land;
    control: string;

    landId: number;
    ubigeo: string;
    x: number;
    y: number;
    land: LandRegistryMap;
    owner: LandOwner;

}
