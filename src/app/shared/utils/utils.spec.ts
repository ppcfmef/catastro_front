/* eslint-disable @typescript-eslint/naming-convention */
import { FormUtils } from './form.utils';
import {FormatUtils} from './format.utils';
import { LandRegistryMapModel } from 'app/modules/admin/lands/land-registry/models/land-registry-map.model';
import { MapUtils } from './map.utils';
import { Lote } from 'app/modules/admin/lands/land-registry/interfaces/lote.interface';

describe('UtilsTest', () => {

    it('should test FormUtils', () => {
        const createFile = (size = 44320, name = 'ecp-logo.png', type = 'image/png') =>
        new File([new ArrayBuffer(size)], name, {
            type: type,
        });
        const payload = {
            null: null,
            key: "value",
            a: 0,
            b: [1,2,3]
        };
        expect(FormUtils.parseToFormData({
            a: true,
            b: 0,
            c: "test",
            d: null,
            file: createFile()
        })).toBeTruthy();
        expect(FormUtils.deleteKeysNullInObject(payload)).toBeTruthy();
        expect(FormUtils.buildQueryParams(payload)).toBeTruthy();
        expect(FormUtils.zeroPad(123, 2)).toBeTruthy();
    });

    it('should test FormatUtils', () => {
        const lote: Lote= {
            ANIO_CART: 1,
            BLOCK: '',
            COD_LOTE: '',
            COD_MZN: '',
            COD_SECT: '',
            COD_UU: '',
            COD_VIA: '',
            COORD_X: 1,
            COORD_Y: 1,
            CUADRA: '',
            FUENTE: '',
            ID_ARANC: '',
            ID_LOTE: '',
            INTERIOR: '',
            KM: '',
            LADO: '',
            LOT_URB: 1,
            MZN_URB: '',
            NOM_UU: '',
            NOM_VIA: '',
            NUM_MUN: '',
            OBJECTID: 1,
            PARTIDA: '',
            PISO: '',
            RAN_NUM: '',
            REFEREN: '',
            TIPO_UU: '',
            TIP_VIA: '',
            UBIGEO: '',
            AREA: 1,
            RAN_CPU:'123-123-123',
            ID_LOTE_P:1
        };
        const land = FormatUtils.formatLoteToLandRegistryMapModel(lote);
        expect(land).toBeInstanceOf(LandRegistryMapModel);
        expect(FormatUtils.formatLandRegistryMapModelToGestionPredio(land)).toBeTruthy();
        expect(FormatUtils.formatLandRegistryMapModelToPredio(land)).toBeTruthy();
    });

    it('should test MapUtils', () => {
        const m = new MapUtils();
        expect(MapUtils.geosjonToArcgis([])).toBeTruthy();
        expect(MapUtils.arcgisToGeoJSON([])).toBeTruthy();
        expect(MapUtils.zoomToFeature("", "", "")).toBeTruthy();
        expect(MapUtils.queryFeaturesInLayer(1, "")).toBeTruthy();
        expect(MapUtils.projectGeometry(1, 1)).toBeTruthy();
    });
});
