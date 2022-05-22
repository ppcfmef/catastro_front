export interface IPagination<T> {
    count: number;
    next: string;
    previous: string;
    results: Array<T>;
}

export interface Department {
    code: string;
    name: string;
}

export interface Province {
    code: string;
    name: string;
    department: string;
}

export interface District {
    code: string;
    name: string;
    department: string;
    province: string;
}

export interface Institute {
    id: number;
    name: string;
}

export interface DistrictResource {
    code: string;
    name: string;
    department: string;
    province: string;
    extensions: Extension[];
    resources: Resource[];
}


export interface Extension {
    id: number;
    xMin: string;
    xMax: string;
    yMin: string;
    yMax: string;
    x: string;
    y: string;
}

export interface Resource {
    id: number;
    source: string;
    utm: number;
    gisService: string;
    ubigeo: string;
}


export interface ITabLayout<T = string> {
    label: string;
    route: string;
    title?: string;
    queryParams?: any;
    disable?: boolean;
    hidden?: boolean;
    target?: string;
    pathId?: T;
}
