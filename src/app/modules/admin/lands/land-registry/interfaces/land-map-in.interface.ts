export interface Land{
    landId: number;
    ubigeo: string;
    x: number;
    y: number;
}

export interface LandMapIn{
    ownerLandId: number;
    land: Land;
    control: string;
}
