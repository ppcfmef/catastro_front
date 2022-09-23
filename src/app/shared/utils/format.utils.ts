import { GestionPredio } from 'app/modules/admin/lands/land-registry/interfaces/gestion-predios.interface';
import { Lote } from 'app/modules/admin/lands/land-registry/interfaces/lote.interface';
import { Predio } from 'app/modules/admin/lands/land-registry/interfaces/predio.interface';
import { LandRegistryMapModel } from 'app/modules/admin/lands/land-registry/models/land-registry-map.model';

export class FormatUtils {


  public static   formatLoteToLandRegistryMapModel(lote?: Lote): LandRegistryMapModel{

    const land = new LandRegistryMapModel();
    //land.idObjectImg = lote.OBJECTID;

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
    land.urbanMza = lote.MZN_URB;
    land.codStreet = lote.COD_VIA;
    //land.idLote= lote.ID_LOTE;
    land.idPlot= lote.ID_LOTE;
    //land.idLandCartographic = lote.ID_PREDIO;
        // atributos adicionales de lote
        land.departure= lote.PARTIDA;
        land.side=lote.LADO;
        land.ranNum=lote.RAN_NUM;
        land.streetBlock=lote.CUADRA;
        land.rangCup = lote.RAN_CPU;

    return land;

}

/* eslint-disable @typescript-eslint/naming-convention */
public static   formatLandRegistryMapModelToGestionPredio(land: LandRegistryMapModel): GestionPredio{
    const gestion: GestionPredio ={

        OBJECTID:  land.idObjectImg,

        UBIGEO: land.ubigeo,

        COD_MZN: land.codMzn,

        COD_SECT: land.codSect,

        COD_UU: land.codUu,


        COD_LOTE: land.codLand,

        TIPO_UU: land.uuType,

        NOM_UU: land.habilitacionName,

        LOT_URB: land.urbanLotNumber,

        TIP_VIA: land.streetType,

        NOM_VIA: land.streetName,

        BLOCK: land.block,

        INTERIOR: land.indoor,

        PISO: land.floor,

        KM: land.km,

        REFERENCIA: land.landmark,

        COORD_Y: land.latitude,

        COORD_X: land.longitude,

        FUENTE: land.sourceInformation,

        ID_ARANC: land.idAranc,

        ID_LOTE: land.idPlot,

        ID_PRED: land.idLandCartographic,

        COD_PRE: '',

        SEC_EJEC: '',

        COD_CPU: '',

        ANIO_CART: 0,

        COD_VIA: land.codStreet,



        MZN_URB: land.urbanMza,

        NUM_MUN: '',


        TIP_DOC: '',

        DOC_IDEN: '',

        COD_CONTR: '',

        NOMBRE: '',

        AP_PAT: '',

        AP_MAT: '',

        DIR_FISCAL: '',

        ESTADO: 0,

        ID_IMG:land.idCartographicImg,
        SECUEN : land.secuen,

        PARTIDA: land.departure,
        LADO: land.side,
        RAN_NUM : land.ranNum,
        CUADRA : land.streetBlock
    };
    return gestion;
}
/* eslint-disable @typescript-eslint/naming-convention */

public static  formatLandRegistryMapModelToPredio(land: LandRegistryMapModel):  Predio{
    const predio: Predio ={

        OBJECTID:null,

        ID_LOTE: land.idPlot,

        UBIGEO: land.ubigeo,

        COD_MZN: land.codMzn,

        COD_SECT: land.codSect,

        COD_UU: land.codUu,


        COD_LOTE: land.codLand,

        TIPO_UU: land.uuType,

        NOM_UU: land.habilitacionName,

        LOT_URB: land.urbanLotNumber,

        TIP_VIA: land.streetType,

        NOM_VIA: land.streetName,

        BLOCK: land.block,

        INTERIOR: land.indoor,

        PISO: land.floor,

        KM: land.km,

        REFEREN: land.landmark,

        COORD_Y: land.latitude,

        COORD_X: land.longitude,

        FUENTE: land.sourceInformation,

        ID_ARANC: land.idAranc,


        ID_PRED: land.idLandCartographic,



        SEC_EJEC: 0,

        COD_CPU: land.cup,

        ANIO_CART: 0,

        COD_VIA: land.codStreet,


        MZN_URB: land.urbanMza,

        NUM_MUN: '',

        COD_PRE: '',


        COD_CUC: '',

        AREA: 0,


         PARTIDA: land.departure,

         LADO: land.side,
         RAN_NUM : land.ranNum,
         CUADRA : land.streetBlock,
         RAN_CPU : parseInt(land.rangCup,10),
         COD_UI: parseInt(land.cup.substring(8,12),10),
         COD_VER : parseInt(land.cup.substring(12,13),10)
    };
    return predio;

}


}
