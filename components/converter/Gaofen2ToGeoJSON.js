let logger = null;

const setLogger = (logFunction) => {
    logger = logFunction;
}

const getGaofen2GeoJSON = (Gaofen2Object) => {
    try{

        const root = Gaofen2Object.ProductMetaData;

        const Gaofen2GeoJSON = {
          "type": "FeatureCollection",
          "features": [
            {
              "type": "Feature",
              "properties": {
                "SatelliteID": root.SatelliteID?.[0] ?? "NO_DATA",
                "SensorID": root.SensorID?.[0] ?? "NO_DATA",
                "ReceiveTime": root.ReceiveTime?.[0] ?? "NO_DATA",
                "OrbitID": parseFloat(root.OrbitID?.[0] ?? -1),
                "ProduceType": root.ProduceType?.[0] ?? "NO_DATA",
                "SceneID": parseFloat(root.SceneID?.[0] ?? -1),
                "ProductID": parseFloat(root.ProductID?.[0] ?? -1),
                "ProductLevel": root.ProductLevel?.[0] ?? "NO_DATA",
                "ProductFormat": root.ProductFormat?.[0] ?? "NO_DATA",
                "ProduceTime": root.ProduceTime?.[0] ?? "NO_DATA",
                "Bands": root.Bands?.[0] ?? "NO_DATA",
                "ScenePath": parseFloat(root.ScenePath?.[0] ?? -1),
                "SceneRow": parseFloat(root.SceneRow?.[0] ?? -1),
                "SatPath": parseFloat(root.SatPath?.[0] ?? -1),
                "SatRow": parseFloat(root.SatRow?.[0] ?? -1),
                "SceneCount": parseFloat(root.SceneCount?.[0] ?? -1),
                "SceneShift": parseFloat(root.SceneShift?.[0] ?? -1),
                "StartTime": root.StartTime?.[0] ?? "NO_DATA",
                "EndTime": root.EndTime?.[0] ?? "NO_DATA",
                "CenterTime": root.CenterTime?.[0] ?? "NO_DATA",
                "ImageGSD": parseFloat(root.ImageGSD?.[0] ?? -1),
                "WidthInPixels": parseFloat(root.WidthInPixels?.[0] ?? -1),
                "HeightInPixels": parseFloat(root.HeightInPixels?.[0] ?? -1),
                "CloudPercent": parseFloat(root.CloudPercent?.[0] ?? -1),
                "RollViewingAngle": parseFloat(root.RollViewingAngle?.[0] ?? -1),
                "PitchViewingAngle": parseFloat(root.PitchViewingAngle?.[0] ?? -1),
                "RollSatelliteAngle": parseFloat(root.RollSatelliteAngle?.[0] ?? -1),
                "PitchSatelliteAngle": parseFloat(root.PitchSatelliteAngle?.[0] ?? -1),
                "YawSatelliteAngle": parseFloat(root.YawSatelliteAngle?.[0] ?? -1),
                "SolarAzimuth": parseFloat(root.SolarAzimuth?.[0] ?? -1),
                "SolarZenith": parseFloat(root.SolarZenith?.[0] ?? -1),
                "SatelliteAzimuth": parseFloat(root.SatelliteAzimuth?.[0] ?? -1),
                "SatelliteZenith": parseFloat(root.SatelliteZenith?.[0] ?? -1),
                "GainMode": root.GainMode?.[0] ?? "NO_DATA",
                "IntegrationTime":parseFloat(root.IntegrationTime?.[0] ?? -1),
                "IntegrationLevel": root.IntegrationLevel?.[0]?? "NO_DATA",
                "EarthEllipsoid": root.EarthEllipsoid?.[0] ?? "NO_DATA",
                "PixelBits": root.PixelBits?.[0] ?? "NO_DATA",
                ...Gaofen2Object.custom,
               },
              "geometry": {
                "coordinates": [
                  [
                    [
                      parseFloat(root.TopLeftLongitude[0]),
                      parseFloat(root.TopLeftLatitude[0])
                    ],
                    [
                      parseFloat(root.TopRightLongitude[0]),
                      parseFloat(root.TopRightLatitude[0])
                    ],
                    [
                      parseFloat(root.BottomRightLongitude[0]),
                      parseFloat(root.BottomRightLatitude[0])
                    ],
                    [
                      parseFloat(root.BottomLeftLongitude[0]),
                      parseFloat(root.BottomLeftLatitude[0])
                    ],
                    [
                      parseFloat(root.TopLeftLongitude[0]),
                      parseFloat(root.TopLeftLatitude[0])
                    ]
                  ]
                ],
                "type": "Polygon"
              }
            }
          ]
        }
  
        console.log(`${new Date().toISOString()}: Gaofen2ToGeoJSON - Info Log - ${Gaofen2Object.custom.cstm_file_name} sucessfully converted.`);
        logger(`${new Date().toISOString()}: Gaofen2ToGeoJSON - Info Log - ${Gaofen2Object.custom.cstm_file_name} sucessfully converted.`);

      return Gaofen2GeoJSON;

    } catch (err) {
      console.log(`${new Date().toISOString()}: Gaofen2ToGeoJSON - Error Log - ${Gaofen2Object.custom.cstm_file_name} converting error. - ${err}`);
      logger(`${new Date().toISOString()}: Gaofen2ToGeoJSON - Error Log - ${Gaofen2Object.custom.cstm_file_name} converting error. - ${err}`);
      return {}
    }
  
  }
      
  export default getGaofen2GeoJSON;
  export {setLogger};