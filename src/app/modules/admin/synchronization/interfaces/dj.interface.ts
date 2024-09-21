export interface DJResponse {
    data:      DJ[];
    pageable: Pageable;
}

export interface DJ {
    logIntegracionId:    number;
    municipalidadId:     number;
    municipalidadAbr:    string;
    djPredialNumero:     number;
    contribuyenteNumero: number;
    fechaProceso:        string;
    procesado:           number;
    procesadoDes:        string;
    observaciones:       string;
    usuarioAud:          string;
    fechaAud:            string;
    terminalAud:         string;
}

export interface Pageable {
    pageNumber:    number;
    pageSize:      number;
    totalElements: number;
}
