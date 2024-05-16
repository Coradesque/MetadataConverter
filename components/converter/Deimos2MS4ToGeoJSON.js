let logger = null;
const setLogger = (logFunction) => {
  logger = logFunction;
}

const getDeimos2MS4GeoJSON = (Deimos2MS4Object) => {
  
try {
          const root = Deimos2MS4Object.Dimap_Document;

          // Initialize the result object with default values
          const qualityParameters = {
            "ADJUSTMENT": "NO_DATA",
            "IMAGE_QUALITY_DEGRADATION": -1,
            "ABSOLUTE_ORBIT": -1,
            "ORBIT_DIRECTION": "NO_DATA",
            "CLOUD_COVER_PERCENTAGE": -1,
            "UNIQUE_SCENARIO_ID": -1,
            "FOOTPRINT_CENTER_LAT": 0,
            "FOOTPRINT_CENTER_LON": 0
          };
    
          // Iterate over the tags in the first object
          root.Dataset_Sources[0].Source_Information[0].Quality_Assessment[0].Quality_Parameter.forEach(tag => {
            const parameterDesc = tag.QUALITY_PARAMETER_DESC[0]; // Assuming TagName is always an array with one element
            const parameterValue = tag.QUALITY_PARAMETER_VALUE[0]; // Assuming TagValue is always an array with one element
            
            // Update the result object based on the tag name
            switch (parameterDesc) {
              case "ADJUSTMENT":
                qualityParameters["ADJUSTMENT"] = parameterValue;
                break;
              case "IMAGE_QUALITY_DEGRADATION":
                qualityParameters["IMAGE_QUALITY_DEGRADATION"] = parseInt(parameterValue);
                break;
              case "ABSOLUTE_ORBIT":
                qualityParameters["ABSOLUTE_ORBIT"] = parseInt(parameterValue);
                break;
              case "ORBIT_DIRECTION":
                qualityParameters["ORBIT_DIRECTION"] = parameterValue;
                break;
              case "CLOUD_COVER_PERCENTAGE":
                qualityParameters["CLOUD_COVER_PERCENTAGE"] = parseInt(parameterValue);
                break;
              case "UNIQUE_SCENARIO_ID":
                qualityParameters["UNIQUE_SCENARIO_ID"] = parseInt(parameterValue);
                break;
              case "FOOTPRINT_CENTER_OF":
                qualityParameters["FOOTPRINT_CENTER_LAT"] = parseFloat(parameterValue.__value__.substring(6, parameterValue.__value__.length - 1).split(";")[1]);
                qualityParameters["FOOTPRINT_CENTER_LON"] = parseFloat(parameterValue.__value__.substring(6, parameterValue.__value__.length - 1).split(";")[0]);
                break;
              // Add cases for other tag names if needed
            }
          });
    
      const deimos2GeoJson = {
          "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {
              "BAND_1_DESCRIPTION": root.Image_Interpretation?.[0].Spectral_Band_Info?.[0].BAND_DESCRIPTION?.[0] ?? "NO_DATA",                
              "BAND_2_DESCRIPTION": root.Image_Interpretation?.[0].Spectral_Band_Info?.[1].BAND_DESCRIPTION?.[0] ?? "NO_DATA",
              "BAND_3_DESCRIPTION": root.Image_Interpretation?.[0].Spectral_Band_Info?.[2].BAND_DESCRIPTION?.[0] ?? "NO_DATA",
              "BAND_4_DESCRIPTION": root.Image_Interpretation?.[0].Spectral_Band_Info?.[3].BAND_DESCRIPTION?.[0] ?? "NO_DATA",
              "BYTEORDER": root.Raster_Encoding?.[0].BYTEORDER?.[0] ?? "NO_DATA",
              "DATASET_NAME": root.Dataset_Id?.[0].DATASET_NAME?.[0] ?? "NO_DATA",
              "DATASET_PRODUCTION_DATE": root.Production?.[0].DATASET_PRODUCTION_DATE?.[0] ?? "NO_DATA",
              "DATA_TYPE": root.Raster_Encoding?.[0].DATA_TYPE?.[0] ?? "NO_DATA",
              "DATUM": root.Dataset_Sources?.[0].Source_Information?.[0].Coordinate_Reference_System?.[0].Projection_OGCWKT?.[0].split("DATUM[")?.[1].split(",")[0].replaceAll("\"", "") ?? "NO_DATA",
              "GEOMETRIC_PROCESSING": root.Data_Processing?.[0].GEOMETRIC_PROCESSING?.[0] ?? "NO_DATA",
              "GEO_TABLES": root.Dataset_Sources?.[0].Source_Information?.[0].Coordinate_Reference_System?.[0].GEO_TABLES?.[0] ?? "NO_DATA",
              "IMAGING_DATE": root.Dataset_Sources?.[0].Source_Information?.[0].Scene_Source?.[0].IMAGING_DATE?.[0] ?? "NO_DATA",
              "INSTRUMENT": root.Dataset_Sources?.[0].Source_Information?.[0].Scene_Source?.[0].INSTRUMENT?.[0] ?? "NO_DATA",
              "JOB_ID":  root.Production?.[0].JOB_ID?.[0] ?? "NO_DATA",
              "METADATA_FORMAT": parseFloat(root.Metadata_Id?.[0].METADATA_FORMAT?.[0].__attr__.version ?? -1),
              "METADATA_PROFILE": root.Metadata_Id?.[0].METADATA_PROFILE?.[0] ?? "NO_DATA",
              "MISSION": root.Dataset_Sources?.[0].Source_Information?.[0].Scene_Source?.[0].MISSION?.[0] ?? "NO_DATA",
              "MISSION_INDEX": parseInt(root.Dataset_Sources?.[0].Source_Information?.[0].Scene_Source?.[0].MISSION_INDEX?.[0]) ?? "NO_DATA",
              "NBANDS": parseInt(root.Raster_Dimensions?.[0].NBANDS?.[0] ?? -1),
              "NBITS":  parseInt(root.Raster_Encoding?.[0].NBITS?.[0] ?? -1),
              "NCOLS": parseInt(root.Raster_Dimensions?.[0].NCOLS?.[0] ?? -1),
              "NROWS": parseInt(root.Raster_Dimensions?.[0].NROWS?.[0] ?? -1),
              "PIXEL_RESOLUTION_X_M": parseFloat(root.Dataset_Sources?.[0].Source_Information?.[0].Scene_Source?.[0].PIXEL_RESOLUTION_X?.[0].__value__ ?? -1),
              "PIXEL_RESOLUTION_Y_M": parseFloat(root.Dataset_Sources?.[0].Source_Information?.[0].Scene_Source?.[0].PIXEL_RESOLUTION_Y?.[0].__value__ ?? -1),
              "PRODUCT_TYPE":  root.Production?.[0].PRODUCT_TYPE?.[0] ?? "NO_DATA",
              "SOURCE_ID": root.Dataset_Sources?.[0].Source_Information?.[0].SOURCE_ID?.[0] ?? "NO_DATA",
              "START_TIME": root.Dataset_Sources?.[0].Source_Information?.[0].Scene_Source?.[0].START_TIME?.[0] ?? "NO_DATA",
              "STOP_TIME": root.Dataset_Sources?.[0].Source_Information?.[0].Scene_Source?.[0].STOP_TIME?.[0] ?? "NO_DATA",
              "SUN_AZIMUTH_DEG": parseFloat(root.Dataset_Sources?.[0].Source_Information?.[0].Scene_Source?.[0].SUN_AZIMUTH?.[0].__value__ ?? -1),
              "SUN_ELEVATION_DEG": parseFloat(root.Dataset_Sources?.[0].Source_Information?.[0].Scene_Source?.[0].SUN_ELEVATION?.[0].__value__ ?? -1),
              "VIEWING_ANGLE_DEG": parseFloat(root.Dataset_Sources?.[0].Source_Information?.[0].Scene_Source?.[0].VIEWING_ANGLE?.[0].__value__ ?? -1),
              ...qualityParameters,
              ...Deimos2MS4Object.custom,
              },
            "geometry": {
              "coordinates": [
                [
                  [
                    parseFloat(root.Dataset_Frame[0].Vertex[0].FRAME_LON[0].__value__),
                    parseFloat(root.Dataset_Frame[0].Vertex[0].FRAME_LAT[0].__value__)
                  ],
                  [
                    parseFloat(root.Dataset_Frame[0].Vertex[1].FRAME_LON[0].__value__),
                    parseFloat(root.Dataset_Frame[0].Vertex[1].FRAME_LAT[0].__value__)
                  ],
                  [
                    parseFloat(root.Dataset_Frame[0].Vertex[2].FRAME_LON[0].__value__),
                    parseFloat(root.Dataset_Frame[0].Vertex[2].FRAME_LAT[0].__value__)
                  ],
                  [
                    parseFloat(root.Dataset_Frame[0].Vertex[3].FRAME_LON[0].__value__),
                    parseFloat(root.Dataset_Frame[0].Vertex[3].FRAME_LAT[0].__value__)
                  ],
                  [
                    parseFloat(root.Dataset_Frame[0].Vertex[0].FRAME_LON[0].__value__),
                    parseFloat(root.Dataset_Frame[0].Vertex[0].FRAME_LAT[0].__value__)
                  ],
                ]
              ],
              "type": "Polygon"
            }
          }
        ]

      }

      console.log(`${new Date().toISOString()}: Deimos2MS4ToGeoJSON - Info Log - ${Deimos2MS4Object.custom.cstm_file_name} sucessfully converted.`);
      logger(`${new Date().toISOString()}: Deimos2MS4ToGeoJSON - Info Log - ${Deimos2MS4Object.custom.cstm_file_name} sucessfully converted.`);

      return deimos2GeoJson;

  } catch(err) {

    console.log(`${new Date().toISOString()}: Deimos2MS4ToGeoJSON - Error Log - ${Deimos2MS4Object.custom.cstm_file_name} converting error. - ${err}`);
    logger(`${new Date().toISOString()}: Deimos2MS4ToGeoJSON - Error Log - ${Deimos2MS4Object.custom.cstm_file_name} converting error. - ${err}`);

      return {}
  }
}

export default getDeimos2MS4GeoJSON;
export {setLogger};