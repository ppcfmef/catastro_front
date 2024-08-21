export interface LandOwnerDetail {
    id:                  number;
    nivelesConstruccion: NivelesConstruccion[];
    secEjec:             string;
    predioCodigo:        number;
    cpm:                 string;
    cup:                 string;
    code:                string;
    areaTerreno:         number;
    areaTotTerrComun:    number;
    areaConstruida:      number;
    areaTotConsComun:    number;
    porPropiedad:        number;
    fecTransferencia:    string;
    longitudFrente:      number;
    cantidadHabitantes:  number;
    preInhabitable:      number;
    parRegistral:        string;
    numeroDj:            string;
    fechaDj:             string;
    usuarioAuditoria:    string;
    estadoDj:            number;
    motivoDj:            number;
    fecha:               string;
    anioDeterminacion:   number;
    fechaAdquisicion:    string;
    predialNumero:       number;
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
    categoriaTecho?:              string;
    categoriaPiso?:               string;
    categoriaPuertaVentana?:       string;
    categoriaRevestimiento?:       string;
    categoriaBano?:                string;
    categoriaInstElectricaSanita?: string;
    estado:                       number;
    ubigeo:                       string;
    landOwnerDetail:              number;
    tipNivel:                     number;
    tipMaterial:                  number;
    estConservacion:              number;
}
