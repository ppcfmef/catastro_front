
import { loadModules } from 'esri-loader';
import proj4 from 'proj4';
import { arcgisToGeoJSON } from '@esri/arcgis-to-geojson-utils';
import { geojsonToArcGIS } from '@esri/arcgis-to-geojson-utils';
import { FormUtils } from './form.utils';

export class MapUtils {


    static  async geosjonToArcgis(features: any[], proj4DestWkid: number =4326): Promise<any[]> {
        const arcgisJson = [];
        /* eslint-disable @typescript-eslint/naming-convention */
        const [Graphic, Polyline, projection, SpatialReference] =
            await loadModules([
                'esri/Graphic',
                'esri/geometry/Polyline',
                'esri/geometry/projection',
                'esri/geometry/SpatialReference',
            ]);
        /* eslint-enable @typescript-eslint/naming-convention */

        const outSpatialReference = new SpatialReference(proj4DestWkid);

        return projection.load().then(() => {
            features.forEach((feature) => {
                const attr = feature.properties;

                for (const key in attr) {
                    if (!attr[key] || key === 'OBJECTID') {
                        delete attr[key];
                    }
                }

                if (feature.geometry) {
                    const geoFeature = geojsonToArcGIS(feature);
                    const newGeometry = projection.project(
                        geoFeature.geometry,
                        outSpatialReference
                    );
                    geoFeature.geometry = {
                        paths: newGeometry.paths,
                        spatialReference: {
                            wkid: newGeometry.spatialReference.wkid,
                        },
                    };
                    arcgisJson.push(geoFeature);
                }
            });
            return Promise.all(arcgisJson);
            //  return arcgisJson;
        });

        //return arcgisJson;
    }



    static async arcgisToGeoJSON(
        features: any[],
        proj4DestWkid: number =4326,
        isProject: boolean = false,
    ): Promise<any> {
        if (features.length < 1) {
            return null;
        }

        const geojson = {
            type: 'FeatureCollection',
            features: [],
        };
        const type = 'shapefile';
        let featureID = 1;

        await features.forEach(async (feature) => {

            const attr = feature.attributes;
            if (typeof attr.feature === 'object') {
                delete attr.feature;
            }
            //console.log('feature>>',feature);

            for (const key in attr) {
                if (key.includes('.')) {
                    delete attr[key];
                }
                /*else if (key === 'OBJECTID') {
                    delete attr[key];
                }*/
            }

            if (feature.geometry) {
                if (isProject) {
                    const g = MapUtils.projectGeometry(feature.geometry,proj4DestWkid);
                    feature.geometry = g;
                }

                const geoFeature = arcgisToGeoJSON(feature);
                const geom = geoFeature.geometry;

                if (
                    type === 'shapefile' &&
                    (geom.type === 'MultiPolygon' ||
                        geom.type === 'MultiLineString')
                ) {
                    const props = geoFeature.properties;
                    for (
                        let i = 0, len = geom.coordinates.length;
                        i < len;
                        i++
                    ) {
                        const feat = {
                            geometry: {
                                type: geom.type.replace('Multi', ''),
                                coordinates: geom.coordinates[i],
                            },
                            id: featureID++,
                            properties: props,
                            type: 'Feature',
                        };
                        geojson.features.push(feat);
                    }
                } else {
                    geoFeature.id = featureID++;
                    geojson.features.push(geoFeature);
                }
            } else {
            }
        });

        return geojson;
    }


    static async zoomToFeature(view: any, layer: any, query: string): Promise<any> {

        const queryLayer = layer?.createQuery();
        queryLayer.where = query;
        queryLayer.outSpatialReference = view.spatialReference;

        const res=await layer.queryExtent(queryLayer);
        console.log('res>>',res);
        if(view){
            view.extent=res.extent;
        }

        return res;
      /* return  layer.queryExtent(queryLayer).then( (response) => {

          view.goTo(response.extent).catch( (error)=> {
             console.error(error);
             return response
          });
        });*/

    }

  static async queryFeaturesInLayer(layer, query): Promise<any[]> {
    let features = [];
    const queryResult = await layer?.queryFeatures(query);
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
    static   async projectGeometry(geometry: any,proj4DestWkid: number): Promise<any> {
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


 /* eslint-disable @typescript-eslint/naming-convention */
static async createArcgisJSON(
    features: any[],
    projectionWkid: number
): Promise<any[]> {
    const arcgisJson = [];
    /* eslint-disable @typescript-eslint/naming-convention */
    const [Graphic, Polyline, Point, projection, SpatialReference] =
        await loadModules([
            'esri/Graphic',
            'esri/geometry/Polyline',
            'esri/geometry/Point',
            'esri/geometry/projection',
            'esri/geometry/SpatialReference',
        ]);
    /* eslint-enable @typescript-eslint/naming-convention */
    const outSpatialReference = new SpatialReference(projectionWkid);

    return projection.load().then(() => {
        features.forEach((feature: any) => {
            if (projectionWkid !== 4326) {
                const geometryIni = new Point({
                    x: feature.COORD_X,
                    y: feature.COORD_Y,
                    spatialReference: {
                        wkid: 4326,
                    },
                });
                const pointProject = projection.project(
                    geometryIni,
                    outSpatialReference
                );
                feature.COORD_X = pointProject.x;
                feature.COORD_Y = pointProject.y;
            }

            const geometry = {
                x: feature.COORD_X,
                y: feature.COORD_Y,
            };

            const attributes = FormUtils.deleteKeysNullInObject(feature);
            const geoFeature = {
                geometry,
                attributes,
            };
            arcgisJson.push(geoFeature);
        });
        return Promise.all(arcgisJson);
    });
}

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    static   async queryIntersectFeaturelayer(layer: any, geometry: any, distance: number=10,units: string='meters' ) {
        const query = {
            spatialRelationship: 'intersects', // Relationship operation to apply
            geometry: geometry, // The sketch feature geometry
            returnGeometry: true,
            outFields: ['*'],
            distance : distance,
            units: units
        };

        const results = await layer.queryFeatures(query);
        let feature = {};
        if (results.features && results.features.length > 0) {
            feature = results.features[0];
        }
        return feature;
    }


        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        static   async queryIntersectFeaturelayerResults(layer: any, geometry: any, distance: number=10,units: string='meters' ) {
            const query = {
                spatialRelationship: 'intersects', // Relationship operation to apply
                geometry: geometry, // The sketch feature geometry
                returnGeometry: true,
                outFields: ['*'],
                distance : distance,
                units: units
            };

            const results = await layer.queryFeatures(query);
            let features = [];
            if (results.features && results.features.length > 0) {
                features = results.features;
            }
            return features;
        }

 // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    static  async queryFeaturelayer(layer: any,whereClause: string  ) {
        const query = {
            where: whereClause,  // Set by select element
            returnGeometry: true,
            outFields: ['*'],

        };

        const results = await layer.queryFeatures(query);

        return results.features;
    }

    /*
    const parcelQuery = {
        where: whereClause,  // Set by select element
        spatialRelationship: "intersects", // Relationship operation to apply
        geometry: extent, // Restricted to visible extent of the map
        outFields: ["APN","UseType","TaxRateCity","Roll_LandValue"], // Attributes to return
        returnGeometry: true
       };

       parcelLayer.queryFeatures(parcelQuery)

       .then((results) => {

         console.log("Feature count: " + results.features.length)

       }).catch((error) => {
         console.log(error.error);
       });*/
    static getCenterOfPolyline(polyline: any): any {
        const paths = polyline.paths;
    
        let totalMidpointX = 0;
        let totalMidpointY = 0;
        let totalSegments = 0;
    
        paths.forEach((path) => {
          for (let i = 0; i < path.length - 1; i++) {
            const startPoint = path[i];
            const endPoint = path[i + 1];
            
            const midpointX = (startPoint[0] + endPoint[0]) / 2;
            const midpointY = (startPoint[1] + endPoint[1]) / 2;
        
            totalMidpointX += midpointX;
            totalMidpointY += midpointY;
            totalSegments++;
          }
        });
    
        const centerOfPolyline = {
           x:totalMidpointX / totalSegments,
           y:totalMidpointY / totalSegments
        };
        return centerOfPolyline;
    
    }
projectPoint(point: any,proj4SrcKey: string,proj4DestKey: string): any {
    return proj4(
        proj4.defs[proj4SrcKey],
        proj4.defs[proj4DestKey]
    ).forward(point);
}


}
