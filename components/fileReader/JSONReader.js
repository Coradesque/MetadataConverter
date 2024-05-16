import {readFile} from 'fs/promises';
import preProcessObjectString from './ObjectPreProcessor';

let logger = null;

const setLogger = (logFunction) => {
    logger = logFunction;
}
  

async function readJSONMetada(path) {

    console.log(`${new Date().toISOString()}: JSONReader - Info Log - ${path.split('\\').pop()} reading started as JSON.`);
    logger(`${new Date().toISOString()}: JSONReader - Info Log - ${path.split('\\').pop()} reading started as JSON.`);
    
    let dataString = {}
    try {
        dataString = await readFile(path, 'utf8');
        return JSON.parse(dataString);

    } catch (parseErr) {
        if (parseErr.toString().includes("Expected property name")) {
            
            console.log(`${new Date().toISOString()}: JSONReader - Info Log - ${path.split('\\').pop()} pre-process required.`);
            logger(`${new Date().toISOString()}: JSONReader - Info Log - ${path.split('\\').pop()} pre-process required.`);

            const dataObject = preProcessObjectString(dataString)
            return dataObject;
        } else {
            console.log(`${new Date().toISOString()}: JSONReader - Error Log - ${path.split('\\').pop()} JSON reading error. - ${parseErr}`);
            logger(`${new Date().toISOString()}: JSONReader - Error Log - ${path.split('\\').pop()} JSON reading error. - ${parseErr}`);
            return null;
        }
    }
}

export default readJSONMetada;
export {setLogger}