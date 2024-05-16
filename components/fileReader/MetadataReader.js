import readJSONMetada from "./JSONReader";
import readXMLMetadata from "./XMLReader";
import addCustomMetadata from "./CustomMetadataAdder";

let logger = null;

const setLogger = (logFunction) => {
    logger = logFunction;
}

// Method to read all XML files in a folder asynchronously
const readMetadata = async (pathArray) => {

    // Initialize an array to store parsed XML results
    const metadataArray = [];
    try {

        // Iterate over each XML file found in the folder
        for (const path of pathArray) {
            // Get the file extension and convert it to lowercase
            const fileExtension = path.split('.').pop().toLowerCase();
            const fileName = path.split("\\").pop();

            // Check if the file has an XML or DIM extension
            if (fileExtension.includes('xml') || fileExtension.includes('dim')) {
                console.log(`${new Date().toISOString()}: MetadataReader - Info Log - reading ${fileName} as XML.`);
                logger(`${new Date().toISOString()}: MetadataReader - Info Log - reading ${fileName} as XML.`);
                const metadata = await readXMLMetadata(path);
                if (metadata) {
                    const editedMetadata = addCustomMetadata(metadata, path)
                    metadataArray.push(editedMetadata);
                    console.log(`${new Date().toISOString()}: MetadataReader - Info Log - ${fileName} reading finished.`);
                    logger(`${new Date().toISOString()}: MetadataReader - Info Log - ${fileName} reading finished.`);
                } else {
                    console.log(`${new Date().toISOString()}: MetadataReader - Error Log - could not read ${fileName}.`);
                    logger(`${new Date().toISOString()}: MetadataReader - Error Log - could not read ${fileName}.`);
                }

            } else if (fileExtension.includes('json') || fileExtension.includes('kmeta')) {
                console.log(`${new Date().toISOString()}: MetadataReader - Info Log - reading ${fileName} as JSON.`);
                logger(`${new Date().toISOString()}: MetadataReader - Info Log - reading ${fileName} as JSON.`);
                const metadata = await readJSONMetada(path);
                if (metadata) {
                    const editedMetadata = addCustomMetadata(metadata, path)
                    metadataArray.push(editedMetadata);
                    console.log(`${new Date().toISOString()}: MetadataReader - Info Log - ${fileName} reading finished.`);
                    logger(`${new Date().toISOString()}: MetadataReader - Info Log - ${fileName} reading finished.`);
                } else {
                    console.log(`${new Date().toISOString()}: MetadataReader - Error Log - could not read ${fileName}.`);
                    logger(`${new Date().toISOString()}: MetadataReader - Error Log - could not read ${fileName}.`);
                }

            } else {
                // Log skipped files
                console.log(`${new Date().toISOString()}: MetadataReader - Error Log - skipping ${fileName}, not an Metadata file.`);
                logger((`${new Date().toISOString()}: MetadataReader - Error Log - skipping ${fileName}, not an Metadata file.`));
            }
        }
        // Log that XML files are read successfully

        console.log(`${new Date().toISOString()}: MetadataReader - Info Log - Metadata files read successfully.`);
        logger((`${new Date().toISOString()}: MetadataReader - Info Log - Metadata files read successfully.`));

        // Return the array of parsed XML results
        return metadataArray;
    } catch (err) {
        // If any error occurs during file reading or parsing, catch it
        console.log((`${new Date().toISOString()}: MetadataReader - Error Log - ${err}.`));
        logger((`${new Date().toISOString()}: MetadataReader - Error Log - ${err}.`));
        // Return an empty object if an error occurs
        return [];
    }
} 

export default readMetadata;
export {setLogger};