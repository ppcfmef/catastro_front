import { ApplicationUI } from '../interfaces/application';

export class ApplicationModel implements ApplicationUI{
    id: number;
    username: number;
    idType: number;
    date: string;
    idStatus: number;
    ubigeo: string;
    lands: any[];
    landsFlat: string;
    constructor( a?: ApplicationUI){
        this.id = a?.id;
        this.username = a?.username;
        this.idType = a?.idType;
        this.date = a?.date;
        this.idStatus = a?.idStatus;
        this.ubigeo = a?.ubigeo;
        this.lands = a?.lands;
    }

}
