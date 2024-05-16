let logger = null;

const setLogger = (logFunction) => {
    logger = logFunction;
}

const getTriplesatMSGeoJSON = (TriplesatMSObject) => {
  console.log("****************", TriplesatMSObject.SceneMetaData);
    try{
        const root = TriplesatMSObject.SceneMetaData.MetaData[0];
  
        const triplesatMSGeoJson = {
          "type": "FeatureCollection",
          "features": [
            {
              "type": "Feature",
              "properties": {
                "Scene_ID": root?.Scene_ID?.[0] ?? "NO_DATA",
                "Satellite_Name": root?.Satellite_Name?.[0] ?? "NO_DATA",
                "Sensor_Name": root?.Sensor_Name?.[0] ?? "NO_DATA",
                "Acquisition_ID": root?.Acquisition_ID?.[0] ?? "NO_DATA",
                "Begin_Time": root?.Begin_Time?.[0] ?? "NO_DATA",
                "End_Time": root?.End_Time?.[0] ?? "NO_DATA",
                "Rows": parseFloat(root?.Rows?.[0] ?? -1),
                "Cols": parseFloat(root?.Cols?.[0] ?? -1),
                "MS_Resampling_Space": parseFloat(root?.MS_Resampling_Space?.[0] ?? -1),
                "Central_Lat": parseFloat(root?.Central_Lat?.[0] ?? -1),
                "Central_Lon": parseFloat(root?.Central_Lon?.[0] ?? -1),
                "Cloud_Cover": parseFloat(root?.Cloud_Cover?.[0] ?? -1),
                "Roll_Angle": parseFloat(root?.Roll_Angle?.[0] ?? -1),
                "Pitch_Angle": parseFloat(root?.Pitch_Angle?.[0] ?? -1),
                "Sun_Elevation": parseFloat(root?.Sun_Elevation?.[0] ?? -1),
                "Sun_Azimuth": parseFloat(root?.Sun_Azimuth?.[0] ?? -1),
                "Sat_Elevation": parseFloat(root?.Sat_Elevation?.[0] ?? -1),
                "Sat_Azimuth": parseFloat(root?.Sat_Azimuth?.[0] ?? -1),
                ...TriplesatMSObject.custom,
              },
              "geometry": {
                "coordinates": [
                  [
                    [
                        parseFloat(root.UL_Lon[0]),
                        parseFloat(root.UL_Lat[0])
                    ],
                    [
                        parseFloat(root.UR_Lon[0]),
                        parseFloat(root.UR_Lat[0])
                    ],
                    [
                        parseFloat(root.LR_Lon[0]),
                        parseFloat(root.LR_Lat[0])
                    ],
                    [
                        parseFloat(root.LL_Lon[0]),
                        parseFloat(root.LL_Lat[0])
                    ],
                    [
                        parseFloat(root.UL_Lon[0]),
                        parseFloat(root.UL_Lat[0])
                    ]
                  ]
                ],
                "type": "Polygon"
              }
            }
          ]
        }
      
      console.log(`${new Date().toISOString()}: TriplesatMSToGeoJSON - Info Log - ${TriplesatMSObject.custom.cstm_file_name} sucessfully converted.`);
      logger(`${new Date().toISOString()}: TriplesatMSToGeoJSON - Info Log - ${TriplesatMSObject.custom.cstm_file_name} sucessfully converted.`);
      
      return triplesatMSGeoJson;
  
    } catch (err) {
      console.log(`${new Date().toISOString()}: TriplesatMSToGeoJSON - Error Log - ${TriplesatMSObject.custom.cstm_file_name} converting error. - ${err}`);
      logger(`${new Date().toISOString()}: TriplesatMSToGeoJSON - Error Log - ${TriplesatMSObject.custom.cstm_file_name} converting error. - ${err}`);    return {}
    }

}

export default getTriplesatMSGeoJSON;
export {setLogger};