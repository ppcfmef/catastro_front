
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

    const queryResult = await layer.queryFeatures(query);

    console.log('queryResult>>>',queryResult);
    /*if (abortFunction && abortFunction()){
        return false;
    }*/

    features = features.concat(queryResult.features);
    if (queryResult.exceededTransferLimit){
        query.start = !query.start ? layer.maxRecordCount : query.start + layer.maxRecordCount;
        query.num = layer.maxRecordCount;
        const featuresSecondResult = await MapUtils.queryFeaturesInLayer(layer, query);
        if (featuresSecondResult){
            features = features.concat(featuresSecondResult);
        }
    }

    return features;
  }
}
