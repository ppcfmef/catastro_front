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
