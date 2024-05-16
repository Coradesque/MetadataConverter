
let logger = null;

const setLogger = (logFunction) => {
    logger = logFunction;
}
  
const preProcessObjectString = (objectString) => {

    let finalString = objectString.replaceAll(" =", ":");
    finalString = finalString.replaceAll(";", ",");
    finalString = finalString.replaceAll(": ,", ": \"NO_DATA\", ");
    finalString = finalString.replaceAll("\'", "\"");
    finalString = finalString.replaceAll("}", "},");
    finalString = finalString.replaceAll("]", "],");
    finalString = finalString.replaceAll(" =", ":");
    finalString = finalString.replaceAll("None", "\"NO_DATA\"");
    finalString = finalString.replaceAll(/:\s*0+([^.])/g, ': $1');
    finalString = finalString + "}"
    
    
    try {
        const dataObject = eval( "(" + finalString + ")" );
        return dataObject;

    } catch (err) {
        console.log(`${new Date().toISOString()}: ObjectPreProcessor - Error Log - could not pre-processes the object. - ${err}.`);
        logger(`${new Date().toISOString()}: ObjectPreProcessor - Error Log - could not pre-processes the object. - ${err}.`);
        
        return {};
    }
}

export default preProcessObjectString;
export {setLogger}
