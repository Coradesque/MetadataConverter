
let logger = null;

const setLogger = (logFunction) => {
    logger = logFunction;
}


const getBlackSkyGeoJSON = (BlackSkyObject) => {

    try{

        const root = BlackSkyObject;

        const BlackSkyGeoJSON = {
            "type": "FeatureCollection",
            "features": [
            {
                "type": "Feature",
                "properties": {
                "id": root?.id ?? -1,
                "acquisitionDate": root?.acquisitionDate ?? "NO_DATA",
                "sensorName": root?.sensorName ?? "NO_DATA",
                "cloudCoverPercent": root?.cloudCoverPercent ?? -1,
                "waterPercent": root?.waterPercent -1,
                "offNadirAngle": root?.offNadirAngle ?? -1,
                "sunElevation": root?.sunElevation ?? -1,
                "sunAzimuth": root?.sunAzimuth ?? -1,
                "satelliteElevation": root?.satelliteElevation ?? -1,
                "satelliteAzimuth": root?.satelliteAzimuth ?? -1,
                "georeferenced": root?.georeferenced?.toString() ?? "NO_DATA",
                "orthorectified": root?.orthorectified?.toString() ?? "NO_DATA",
                "width": root?.width ?? -1,
                "height": root?.height ?? -1,
                "ibitsPerPixeld": root?.bitsPerPixel ?? -1,
                "imageSpecVersion": root?.imageSpecVersion ?? -1,
                "integrationTime": root?.integrationTime ?? -1,
                "catalogImageId": root?.gemini?.imageId ?? -1,
                "imageId": root?.gemini?.imageId -1,
                ...BlackSkyObject.custom,
                },
                "geometry": {
                "coordinates": [
                    [
                    [
                        parseFloat(root.geometry.coordinates[0][0][0]),
                        parseFloat(root.geometry.coordinates[0][0][1])
                    ],
                    [
                        parseFloat(root.geometry.coordinates[0][1][0]),
                        parseFloat(root.geometry.coordinates[0][1][1]),
                    ],
                    [
                        parseFloat(root.geometry.coordinates[0][2][0]),
                        parseFloat(root.geometry.coordinates[0][2][1]),
                    ],
                    [
                        parseFloat(root.geometry.coordinates[0][3][0]),
                        parseFloat(root.geometry.coordinates[0][3][1]),
                    ],
                    [
                        parseFloat(root.geometry.coordinates[0][0][0]),
                        parseFloat(root.geometry.coordinates[0][0][1])
                    ]
                    ]
                ],
                "type": "Polygon"
                }
            }
            ]
        }
        
        console.log(`${new Date().toISOString()}: BlackSkyToGeoJSON - Info Log - ${BlackSkyObject.custom.cstm_file_name} sucessfully converted.`);
        logger(`${new Date().toISOString()}: BlackSkyToGeoJSON - Info Log - ${BlackSkyObject.custom.cstm_file_name} sucessfully converted.`);
        
        return BlackSkyGeoJSON;
    } catch (err) {
        console.log(`${new Date().toISOString()}: BlackSkyToGeoJSON - Error Log - ${BlackSkyObject.custom.cstm_file_name} converting error. - ${err}`);
        logger(`${new Date().toISOString()}: BlackSkyToGeoJSON - Error Log - ${BlackSkyObject.custom.cstm_file_name} converting error. - ${err}`);
        return {}
    }
      
}

export default getBlackSkyGeoJSON;
export {setLogger};