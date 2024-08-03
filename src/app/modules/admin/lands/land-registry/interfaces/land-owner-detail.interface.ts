export interface LandOwnerDetail {
    id:                  number;
    nivelesConstruccion: NivelesConstruccion[];
    secEjec:             string;
    predioCodigo:        null;
    cpm:                 string;
    cup:                 string;
    code:                string;
    areaTerreno:         number;
    areaTotTerrComun:    number;
    areaConstruida:      number;
    areaTotConsComun:    number;
    porPropiedad:        number;
    fecTransferencia:    null;
    longitudFrente:      number;
    cantidadHabitantes:  number;
    preInhabitable:      number;
    parRegistral:        string;
    numeroDj:            string;
    fechaDj:             Date;
    usuarioAuditoria:    string;
    estadoDj:            number;
    motivoDj:            null;
    fecha:               Date;
    anioDeterminacion:   number;
    fechaAdquisicion:    null;
    predialNumero:       null;
    land:                number;
    owner:               number;
    tipTransferencia:    number;
    tipUsoPredio:        number;
    tipPropiedad:        number;
    ubigeo:              string;
}


export interface NivelesConstruccion {
    id:                           number;
    numPiso:                      number;
    anioConstruccion:             number;
    mesConstruccion:              number;
    areaConstruida:               number;
    areaConstruidaComun:          number;
    porAreaConstruidaComun:       number;
    categoriaMuroColumna:         string;
    categoriaPuertaVentana:       string;
    categoriaRevestimiento:       string;
    categoriaBano:                string;
    categoriaInstElectricaSanita: string;
    estado:                       number;
    ubigeo:                       string;
    landOwnerDetail:              number;
    tipNivel:                     number;
    tipMaterial:                  number;
    estConservacion:              number;
}
