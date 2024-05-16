import {readFile} from 'fs/promises';
import xml2js from 'xml2js';

let logger = null;

const setLogger = (logFunction) => {
    logger = logFunction;
}

async function readXMLMetadata (path) {
    console.log(`${new Date().toISOString()}: XMLReader - Info Log - ${path.split('\\').pop()} reading started as XML.`);
    logger(`${new Date().toISOString()}: XMLReader - Info Log - ${path.split('\\').pop()} reading started as XML.`);
    
    try {
        // Read the contents of the XML file
        const contents = await readFile(path, { encoding: 'utf8' });
        // Return a Promise that resolves with the parsed result
        return new Promise((resolve, reject) => {
            // Parse the XML contents
            xml2js.parseString(contents, {attrkey: "__attr__", charkey: "__value__"}, (err, result) => {
                if (err) {
                    // If parsing fails, reject the Promise with the error
                    reject(err);
                } else {
                    // If parsing succeeds, resolve the Promise with the result
                    resolve(result);
                }
            });
        });
    } catch (err) {
        // If any error occurs during file reading or parsing, catch it
        console.log(`${new Date().toISOString()}: XMLReader - Error Log - ${path.split('\\').pop()} XML reading error. - ${err}.`);
        logger(`${new Date().toISOString()}: XMLReader - Error Log - ${path.split('\\').pop()} XML reading error. - ${err}.`);
        
        // Return an empty object if an error occurs
        return null;
    }
}

export default readXMLMetadata;
export {setLogger}