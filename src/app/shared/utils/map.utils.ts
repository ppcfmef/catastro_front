
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
}
