
let logger = null;

const setLogger = (logFunction) => {
    logger = logFunction;
}

const getCSGGeoJSON = (CSGObject) => {
    try{

      const root = CSGObject.DeliveryNote;

      const ancillaryDataReference = {
        "EllipsoidDesignator": "NO_DATA"
      }
      
      root.AncillaryDataReference[0].Tag.forEach(tag => {
        const tagName = tag.TagName[0]; // Assuming TagName is always an array with one element
        const tagValue = tag.TagValue[0]; // Assuming TagValue is always an array with one element
        
        // Update the result object based on the tag name
        switch (tagName) {
          case "Ellipsoid Designator":
            ancillaryDataReference["EllipsoidDesignator"] = tagValue || "Error"; // Convert to integer, set to -1 if not a valid number
            break;
        }
      });

      // Initialize the result object with default values
      const algorithms = {
        "EquivalentNumberOfLooks": -1,
        "AzimuthProcessingNumberOfLooks": -1,
        "RangeProcessingNumberOfLooks": -1
      };

      // Iterate over the tags in the first object
      root.Algorithms[0].Tag.forEach(tag => {
        const tagName = tag.TagName[0]; // Assuming TagName is always an array with one element
        const tagValue = tag.TagValue[0]; // Assuming TagValue is always an array with one element
        
        // Update the result object based on the tag name
        switch (tagName) {
          case "Equivalent Number of Looks":
            algorithms["EquivalentNumberOfLooks"] = parseInt(tagValue); // Convert to integer, set to -1 if not a valid number
            break;
          case "Azimuth Processing Number of Looks":
            algorithms["AzimuthProcessingNumberOfLooks"] = parseInt(tagValue);
            break;
          case "Range Processing Number of Looks":
            algorithms["RangeProcessingNumberOfLooks"] = parseInt(tagValue);
            break;
          // Add cases for other tag names if needed
        }
      });

        const CSGGeoJSON = {
          "type": "FeatureCollection",
          "features": [
            {
              "type": "Feature",
              "properties": {
                "ProductName": root.ProductInfo?.[0].ProductName?.[0] ?? "NO_DATA",
                "ProductId": parseInt(root.ProductInfo?.[0].ProductId?.[0] ?? -1),
                "MissionId": root.ProductInfo?.[0]?.MissionId?.[0] ?? "NO_DATA",
                "UniqueIdentifier": root.ProductInfo?.[0].UniqueIdentifier?.[0] ?? "NO_DATA",
                "ProductGenerationDate": root.ProductInfo?.[0].ProductGenerationDate?.[0] ?? "NO_DATA",
                "UserRequestId": parseInt(root.ProductInfo?.[0].UserRequestId?.[0] ?? -1),
                "ServiceRequestName": parseInt(root.ProductInfo?.[0].ServiceRequestName?.[0] ?? -1),
                "ProductType": root.ProductDefinitionData?.[0].ProductType?.[0] ?? "NO_DATA",
                "SceneSensingStartUTC": root.ProductDefinitionData?.[0].SceneSensingStartUTC?.[0] ?? "NO_DATA",
                "SceneSensingStopUTC": root.ProductDefinitionData?.[0].SceneSensingStopUTC?.[0] ?? "NO_DATA",
                "GeoCoordSceneCentre_lat": parseFloat(root.ProductDefinitionData?.[0].GeoCoordSceneCentre?.[0].split(" ")[0]) ?? 0,
                "GeoCoordSceneCentre_long": parseFloat(root.ProductDefinitionData?.[0].GeoCoordSceneCentre?.[0].split(" ")[1]) ?? 0,
                "SatelliteId": root.ProductDefinitionData?.[0].SatelliteId?.[0] ?? "NO_DATA",
                "AcquisitionMode": root.ProductDefinitionData?.[0].AcquisitionMode?.[0] ?? "NO_DATA",
                "LookSide": root.ProductDefinitionData?.[0].LookSide?.[0] ?? "NO_DATA",
                "NearLookAngle": parseFloat(root.ProductDefinitionData?.[0].NearLookAngle?.[0] ?? -1),
                "FarLookAngle": parseFloat(root.ProductDefinitionData?.[0].FarLookAngle?.[0] ?? -1),
                "ProjectionId": root.ProductDefinitionData?.[0].ProjectionId?.[0] ?? "NO_DATA",
                "AcquisitionStationId": root.ProductDefinitionData?.[0].AcquisitionStationId?.[0] ?? "NO_DATA",
                "ProcessingLevel": root.ProcessingInfo?.[0].ProcessingLevel?.[0] ?? "NO_DATA",
                "FormatType": root.FormatInfo?.[0].FormatType?.[0] ?? "NO_DATA",
                "ProcessingCentre": root.OtherInfo?.[0].ProcessingCentre?.[0] ?? "NO_DATA",
                "ProviderId": root.OtherInfo?.[0].ProviderId?.[0] ?? "NO_DATA",
                ...ancillaryDataReference,
                ...algorithms,
                ...CSGObject.custom,
               },
              "geometry": {
                "coordinates": [
                  [
                    [
                      parseFloat(root.ProductDefinitionData[0].GeoCoordTopLeft[0].split(" ")[1]),
                      parseFloat(root.ProductDefinitionData[0].GeoCoordTopLeft[0].split(" ")[0])
                    ],
                    [
                      parseFloat(root.ProductDefinitionData[0].GeoCoordTopRight[0].split(" ")[1]),
                      parseFloat(root.ProductDefinitionData[0].GeoCoordTopRight[0].split(" ")[0])
                    ],
                    [
                      parseFloat(root.ProductDefinitionData[0].GeoCoordBottomRight[0].split(" ")[1]),
                      parseFloat(root.ProductDefinitionData[0].GeoCoordBottomRight[0].split(" ")[0])
                    ],
                    [
                      parseFloat(root.ProductDefinitionData[0].GeoCoordBottomLeft[0].split(" ")[1]),
                      parseFloat(root.ProductDefinitionData[0].GeoCoordBottomLeft[0].split(" ")[0])
                    ],
                    [
                      parseFloat(root.ProductDefinitionData[0].GeoCoordTopLeft[0].split(" ")[1]),
                      parseFloat(root.ProductDefinitionData[0].GeoCoordTopLeft[0].split(" ")[0])
                    ]
                  ]
                ],
                "type": "Polygon"
              }
            }
          ]
        }
      
      console.log(`${new Date().toISOString()}: CSGToGeoJSON - Info Log - ${CSGObject.custom.cstm_file_name} sucessfully converted.`);
      logger(`${new Date().toISOString()}: CSGToGeoJSON - Info Log - ${CSGObject.custom.cstm_file_name} sucessfully converted.`);
  
      return CSGGeoJSON;
    } catch (err) {
      console.log(`${new Date().toISOString()}: CSGToGeoJSON - Error Log - ${CSGObject.custom.cstm_file_name} converting error. - ${err}`);
      logger(`${new Date().toISOString()}: CSGToGeoJSON - Error Log - ${CSGObject.custom.cstm_file_name} converting error. - ${err}`);
      return {}
    }
  
  }
      
  export default getCSGGeoJSON;
  export {setLogger};