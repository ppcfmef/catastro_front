
import { loadModules } from 'esri-loader';
import proj4 from 'proj4';
export class MapUtils {

    static async zoomToFeature(view: any, layer: any, query: string): Promise<any> {

        const queryLayer = layer.createQuery();
        queryLayer.where = query;
        queryLayer.outSpatialReference = view.spatialReference;

        layer.queryExtent(queryLayer).then( (response) => {
          view.goTo(response.extent).catch( (error)=> {
             console.error(error);

          });
        });
    }

  static async queryFeaturesInLayer(layer, query): Promise<any[]> {
    let features = [];
    console.log('query>>>',query);
    const queryResult = await layer.queryFeatures(query);

    console.log('queryResult>>>',queryResult);
    /*if (abortFunction && abortFunction()){
        return false;
    }*/
    console.log('layer.maxRecordCount>>',layer.sourceJSON.maxRecordCount);
    features = features.concat(queryResult.features);
    if (queryResult.exceededTransferLimit){

        query.start = !query.start ? layer.sourceJSON.maxRecordCount : query.start + layer.sourceJSON.maxRecordCount;
        query.num = layer.sourceJSON.maxRecordCount;
        console.log('quey2>>',query);
        const featuresSecondResult = await MapUtils.queryFeaturesInLayer(layer, query);
        if (featuresSecondResult){
            features = features.concat(featuresSecondResult);
        }
    }

    return features;
  }


    /* eslint-disable @typescript-eslint/naming-convention */
    static  async projectGeometry(geometry: any,proj4DestWkid: number): Promise<any> {
        const [SpatialReference, Point, projection] = await loadModules([
            'esri/geometry/SpatialReference',
            'esri/geometry/Point',
            'esri/geometry/projection',
        ]);

        const outSpatialReference = new SpatialReference(proj4DestWkid);
        await projection.load();
        const geometryProject = projection.project(
            geometry,
            outSpatialReference
        );

        return geometryProject;

        /*
    let pt = null;
        let newPt = null;
    let type ='point';
        if (geometry.paths || geometry.rings) {
          type ='polyline';

        }
    switch (type) {
    case 'point':

        newPt = this.projectPoint(geometry);


        geometry = new Point({
            x: newPt.x,
            y: newPt.y,
            spatialReference: new SpatialReference(this.proj4DestWkid)
        });
        break;

    case 'polyline':
    case 'polygon':
        const paths = geometry.paths || geometry.rings;
        const len = paths.length;
        for (let k = 0; k < len; k++) {
            const len2 = paths[k].length;
            for (let j = 0; j < len2; j++) {
                pt = geometry.getPoint(k, j);
                //console.log('oldPt',pt)
                newPt = this.projectPoint(pt);
                //console.log('newPt',newPt)
                geometry.setPoint(k, j, new Point({
                    x: newPt.x,
                    y: newPt.y,
                    spatialReference: new SpatialReference(this.proj4DestWkid)
                }));
            }
        }
        geometry.spatialReference=new SpatialReference(this.proj4DestWkid);
        break;

    default:
        break;
    }

    return geometry;*/
    }

    /* eslint-disable @typescript-eslint/naming-convention */

  projectPoint(point: any,proj4SrcKey: string,proj4DestKey: string): any {
    return proj4(
        proj4.defs[proj4SrcKey],
        proj4.defs[proj4DestKey]
    ).forward(point);
}
}
