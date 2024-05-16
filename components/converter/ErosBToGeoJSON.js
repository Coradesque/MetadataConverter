let logger = null;

const setLogger = (logFunction) => {
    logger = logFunction;
}


const getErosBGeoJSON = (ErosBObject) => {
    try{

        const root = ErosBObject;

        const ErosBGeoJSON = {
          "type": "FeatureCollection",
          "features": [
            {
              "type": "Feature",
              "properties": {
                "orderId": root?.orderId ?? "NO_DATA",
                "satellite": root?.satellite ?? "NO_DATA",
                "sensor": root?.sensor ?? "NO_DATA",
                "orbitId": root?.orbitId ?? -1,
                "generatingSystem": root?.generatingSystem ?? "NO_DATA",
                "inputdatasetId": root?.productInfo?.inputdatasetId ?? "NO_DATA",
                "productDatasetId ": root?.productInfo?.productDatasetId ?? "NO_DATA",
                "productGenTime": root?.productInfo?.productGenTime ?? "NO_DATA",
                "productFormat": root?.productInfo?.productFormat ?? "NO_DATA",
                "productFormat": root?.productInfo?.productFormat ?? "NO_DATA",
                "startTime": root?.imageInfo?.startTime ?? "NO_DATA",
                "endTime": root?.imageInfo?.endTime ?? "NO_DATA",
                "centreTime": root?.imageInfo?.centreTime ?? "NO_DATA",
                "center_latitude": root?.imageInfo?.centreLocation?.latitude ?? 0,
                "center_longitude": root?.imageInfo?.centreLocation?.longitude ?? 0,
                "numLines": root?.numLines ?? -1,
                "numPixels": root?.numPixels ?? -1,
                "image_width": root?.width ?? -1,
                "image_height": root?.height ?? -1,
                "path": root?.path ?? "NO_DATA",
                "row": root?.row ?? "NO_DATA",
                "orbitSense": root?.orbitSense ?? -1,
                "productOrientation": root?.productOrientation ?? "NO_DATA",
                "correctionLevel": root?.correctionLevel ?? "NO_DATA",
                "mapProjection": root?.correctionParams?.mapProjection ?? "NO_DATA",
                "zoneNumber": root?.correctionParams?.zoneNumber ?? -1,
                "earthEllipsoid": root?.correctionParams?.earthEllipsoid ?? "NO_DATA",
                "resamplingKernel": root?.correctionParams?.resamplingKernel ?? "NO_DATA",
                "elevationCorrection": root?.correctionParams?.elevationCorrection ?? "NO_DATA",
                "baseElevation": root?.correctionParams?.baseElevation ?? -1,
                "pixelSpacing": root?.correctionParams?.pixelSpacing ?? -1,
                "offNadirAngle": root?.opticalParams?.sensorInfo?.offNadirAngle ?? -1,
                "sunAzimuth": root?.opticalParams?.sensorInfo?.sunAzimuth ?? -1,
                "sunElevation": root?.opticalParams?.sensorInfo?.sunElevation ?? -1,
                "pixelSpacing": root?.opticalParams?.sensorInfo?.pixelSpacing ?? -1,
                "lineSpacing": root?.opticalParams?.sensorInfo?.lineSpacing ?? -1,
                "sensor_width": root?.opticalParams?.sensorInfo?.width ?? -1,
                "sensor_height": root?.opticalParams?.sensorInfo?.height ?? -1,
                "cloudCoverQuotes": root?.opticalParams?.sensorInfo?.cloudCoverQuotes?.toString() ?? "NO_DATA",
                "bandSelection": root?.opticalParams?.sensorInfo?.processingInfo?.bandSelection?.toString() ?? "NO_DATA",
                ...ErosBObject.custom,
               },
              "geometry": {
                "coordinates": [
                  [
                    [
                      parseFloat(root.imageInfo.corners.upperLeft.longitude),
                      parseFloat(root.imageInfo.corners.upperLeft.latitude)
                    ],
                    [
                      parseFloat(root.imageInfo.corners.upperRight.longitude),
                      parseFloat(root.imageInfo.corners.upperRight.latitude)
                    ],
                    [
                      parseFloat(root.imageInfo.corners.lowerRight.longitude),
                      parseFloat(root.imageInfo.corners.lowerRight.latitude)
                    ],
                    [
                      parseFloat(root.imageInfo.corners.lowerLeft.longitude),
                      parseFloat(root.imageInfo.corners.lowerLeft.latitude)
                    ],
                    [
                      parseFloat(root.imageInfo.corners.upperLeft.longitude),
                      parseFloat(root.imageInfo.corners.upperLeft.latitude)
                    ]
                  ]
                ],
                "type": "Polygon"
              }
            }
          ]
        }
  
      console.log(`${new Date().toISOString()}: ErosBToGeoJSON - Info Log - ${ErosBObject.custom.cstm_file_name} sucessfully converted.`);
      logger(`${new Date().toISOString()}: ErosBToGeoJSON - Info Log - ${ErosBObject.custom.cstm_file_name} sucessfully converted.`);

      return ErosBGeoJSON;

    } catch (err) {
      console.log(`${new Date().toISOString()}: ErosBToGeoJSON - Error Log - ${ErosBObject.custom.cstm_file_name} converting error. - ${err}`);
      logger(`${new Date().toISOString()}: ErosBToGeoJSON - Error Log - ${ErosBObject.custom.cstm_file_name} converting error. - ${err}`);
      return {}
    }
  
  }
      
  export default getErosBGeoJSON;
  export {setLogger};