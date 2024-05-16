import path from 'path';
import { writeFile } from 'fs/promises';

let logger = null;

const setLogger = (logFunction) => {
    logger = logFunction;
}

let eventListener = null;

const setEventListener = (eventFunction) => {
    eventListener = eventFunction;
}

const writeGeoJSON = async (saveDialogResult, geoJSONArray) => {
    const writtenData = [];

    const folderPath = saveDialogResult.filePaths[0];

    for (const geoJSONFile of geoJSONArray) {
        const fileName = `${path.parse(geoJSONFile.features[0].properties.cstm_file_name).name}.json`;
        const filePath = path.join(folderPath, fileName);
        const jsonData = JSON.stringify(geoJSONFile, null, 2); // null and 2 for pretty formatting

        console.log(`${new Date().toISOString()}: JSONWriter - Info Log - ${fileName} GEOJSON started.`);
        logger(`${new Date().toISOString()}: JSONWriter - Info Log - ${fileName} GEOJSON started.`);

        try {
            await writeFile(filePath, jsonData);
            writtenData.push(fileName);
            console.log(`${new Date().toISOString()}: JSONWriter - Info Log - ${fileName} has been saved.`);
            logger(`${new Date().toISOString()}: JSONWriter - Info Log - ${fileName} has been saved.`);
        } catch (err) {
            console.log(`${new Date().toISOString()}: JSONWriter - Error Log - ${fileName} writing error. - ${err}`);
            logger(`${new Date().toISOString()}: JSONWriter - Error Log - ${fileName} writing error. - ${err}`);
        }
    }

    console.log(`${new Date().toISOString()}: JSONWriter - Info Log - GEOJSON writing finished.`);
    logger(`${new Date().toISOString()}: JSONWriter - Info Log - GEOJSON writing finished.`);
    eventListener({ eventName: "writingFinished", eventData: writtenData });
};

export default writeGeoJSON;
export { setLogger, setEventListener };
