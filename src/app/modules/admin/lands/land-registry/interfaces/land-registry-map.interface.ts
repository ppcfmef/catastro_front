export interface LandRegistryMap {
    id: number;
    idPlot: string | null;
    idCartographicImg: string | null;
    secEjec: number;
    ubigeo: string;
    cup: string; // codigo unico patrimonial
    codSect: string;
    cpm: string; // codigo patrimonial municipio
    codUu: string;
    codMzn: string;
    codLand: string;
    codCuc: string;
    uuType: string;
    habilitacionName: string;
    referenceName: string;
    urbanMza: string;
    urbanLotNumber: number;
    codStreet?: string;
    streetType: string;
    streetName: string;
    streetNameAlt: string;
    municipalNumber: string;
    block: string;
    indoor: string;
    floor: string;
    km: string;
    site: number;
    landmark: string;
    municipalAddress: string;
    urbanAddress: string;
    assignedAddress: string;
    latitude: number;
    longitude: number;

    idAranc: string;

    documentType: string;
    document: string;

    codOwner: string;
    name: string;
    paternalSurname: string;
    maternalSurname: string;
    descriptionOwner: string;
    taxAddress: string;
    status: number;
    landArea: number;
    frontLength: number;
    locationPark: string;
    groupUseDesc: string;
    numberInhabitants: number;
    classificationLandDesc: string;
    buildStatusDesc: string;
    propertyType: string;
    selfAssessmentTotal: number;
    condominium: number;
    deduction: number;
    selfAssessmentAffection: number;

    sourceInformation: string;
    resolutionType: string;
    resolutionDocument: string;

    idLote: string;
    owner?: number | null;
    idImg:string;
    secuen :number;
}
