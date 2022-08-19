import { GestionPredio } from "app/modules/admin/lands/land-registry/interfaces/gestion-predios.interface";
import { Lote } from "app/modules/admin/lands/land-registry/interfaces/lote.interface";
import { Predio } from "app/modules/admin/lands/land-registry/interfaces/predio.interface";
import { LandRegistryMapModel } from "app/modules/admin/lands/land-registry/models/land-registry-map.model";

export class FormatUtils {

    
  public static   formatLoteToLandRegistryMapModel(lote?: Lote): LandRegistryMapModel{

    let land = new LandRegistryMapModel();

    land.ubigeo =lote.UBIGEO;
    land.landArea =lote.AREA;
    land.codMzn= lote.COD_MZN;
    land.codSect =lote.COD_SECT;
    land.codUu =lote.COD_UU;
    land.codMzn =lote.COD_MZN;
    land.codLand =lote.COD_LOTE;
    land.uuType = lote.TIPO_UU;
    land.habilitacionName= lote.NOM_UU;
    land.urbanLotNumber = lote.LOT_URB;
    land.streetType = lote.TIP_VIA;
    land.streetName = lote.NOM_VIA;
    land.block = lote.BLOCK;
    land.indoor = lote.INTERIOR;
    land.floor = lote.PISO;
    land.km =lote.KM;
    land.landmark =lote.REFEREN;
    land.latitude = lote.COORD_Y;
    land.longitude = lote.COORD_X;
    land.sourceInformation=lote.FUENTE;
    land.idAranc =lote.ID_ARANC;
    //land.idLote= lote.ID_LOTE;
    land.idPlot= lote.ID_LOTE;
    //land.idLandCartographic = lote.ID_PREDIO;
    
    return land;

}


public static   formatLandRegistryMapModelToGestionPredio(land:LandRegistryMapModel): GestionPredio{
    const gestion: GestionPredio ={
        // eslint-disable-next-line @typescript-eslint/naming-convention
        UBIGEO: land.ubigeo,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        COD_MZN: land.codMzn,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        COD_SECT: land.codSect,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        COD_UU: land.codUu,

        // eslint-disable-next-line @typescript-eslint/naming-convention
        COD_LOTE: land.codLand,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        TIPO_UU: land.uuType,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        NOM_UU: land.habilitacionName,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        LOT_URB: land.urbanLotNumber,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        TIP_VIA: land.streetType,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        NOM_VIA: land.streetName,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        BLOCK: land.block,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        INTERIOR: land.indoor,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        PISO: land.floor,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        KM: land.km,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        REFERENCIA: land.landmark,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        COORD_Y: land.latitude,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        COORD_X: land.longitude,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        FUENTE: land.sourceInformation,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        ID_ARANC: land.idAranc,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        ID_LOTE: land.idPlot,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        ID_PRED: land.idLandCartographic,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        COD_PRE: '',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        SEC_EJEC: '',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        COD_CPU: '',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        ANIO_CART: 0,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        COD_VIA: '',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        CUADRA: '',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        LADO: '',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        MZN_URB: '',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        NUM_MUN: '',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        PARTIDA: '',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        RAN_NUM: '',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        TIP_DOC: '',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        DOC_IDEN: '',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        COD_CONTR: '',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        NOMBRE: '',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        AP_PAT: '',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        AP_MAT: '',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        DIR_FISCAL: '',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        ESTADO: '',
          // eslint-disable-next-line @typescript-eslint/naming-convention
        ID_IMG:land.idCartographicImg,
        SECUEN : land.secuen
    };
    return gestion;
}


public static  formatLandRegistryMapModelToPredio(land:LandRegistryMapModel):  Predio{
    const predio: Predio ={
        // eslint-disable-next-line @typescript-eslint/naming-convention
        ID_LOTE: land.idPlot,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        UBIGEO: land.ubigeo,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        COD_MZN: land.codMzn,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        COD_SECT: land.codSect,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        COD_UU: land.codUu,

        // eslint-disable-next-line @typescript-eslint/naming-convention
        COD_LOTE: land.codLand,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        TIPO_UU: land.uuType,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        NOM_UU: land.habilitacionName,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        LOT_URB: land.urbanLotNumber,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        TIP_VIA: land.streetType,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        NOM_VIA: land.streetName,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        BLOCK: land.block,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        INTERIOR: land.indoor,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        PISO: land.floor,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        KM: land.km,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        REFEREN: land.landmark,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        COORD_Y: land.latitude,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        COORD_X: land.longitude,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        FUENTE: land.sourceInformation,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        ID_ARANC: land.idAranc,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        // eslint-disable-next-line @typescript-eslint/naming-convention
        ID_PRED: land.idLandCartographic,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        //COD_PRE: land.cod,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        SEC_EJEC: 0,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        COD_CPU: land.cup,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        ANIO_CART: 0,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        COD_VIA: '',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        CUADRA: '',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        LADO: '',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        MZN_URB: '',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        NUM_MUN: '',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        PARTIDA: '',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        RAN_NUM: '',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        COD_PRE: '',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        OBJECTID: null,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        COD_CUC: '',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        AREA: 0
    };
    return predio;

}


}