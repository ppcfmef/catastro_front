/* eslint-disable @typescript-eslint/naming-convention */

import { IContribuyente } from '../interfaces/contribuyente.interface';

export class ContribuyenteModel implements IContribuyente{
    condContr: string;
    dirFiscal: string;
    apMat: string;
    docIden: string;
    codContr: string;
    apPat: string;
    tipDoc: string;
    contribuyente: string;
    nombre: string;
    conyuge: string;
    constructor(l?: IContribuyente){
       this.codContr = l?.codContr;
       this.dirFiscal = l?.dirFiscal;
       this.apMat = l?.apMat;
       this.apPat = l?.apPat;
       this.docIden = l?.docIden;
       this.contribuyente = l?.contribuyente;
       this.nombre = l?.nombre;
       this.conyuge = l?.conyuge;
    }

}
