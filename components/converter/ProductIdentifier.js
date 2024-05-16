let logger = null;

const setLogger = (logFunction) => {
    logger = logFunction;
}
  
  // Function to find the "product_name" key
  const findProductType = (metadataObject) => {
    
    for (let key in metadataObject) {

      // Check if the current key is "product_name"
      if (key === 'product_name') {
        if (metadataObject[key][0].includes('ICEYE')) {
          console.log(`${new Date().toISOString()}: ProductIdentifier - Info Log - identified as ICEYE.`);
          logger(`${new Date().toISOString()}: ProductIdentifier - Info Log - identified as ICEYE.`);
          return 'ICE';  
        }
        else {
          return null;
        }
        
      }

      // Check if the current key is "MISSION"
      else if (key === 'MissionId') {
        if (metadataObject[key][0].includes('CSG')) {
          console.log(`${new Date().toISOString()}: ProductIdentifier - Info Log - identified as COSMOS SECOND GENERATION.`);
          logger(`${new Date().toISOString()}: ProductIdentifier - Info Log - identified as COSMOS SECOND GENERATION.`);
          return 'CSG';  
        }

        else if (metadataObject[key][0].includes('CSK')) {
          console.log(`${new Date().toISOString()}: ProductIdentifier - Info Log - identified as COSMOS FIRST GENERATION.`);
          logger(`${new Date().toISOString()}: ProductIdentifier - Info Log - identified as COSMOS FIRST GENERATION.`);
          return 'CSK'
        }

        else {
          return null;
        }
      }

      // Check if the current key is "MISSION"
      else if (key === 'DATASET_NAME') {
        if (metadataObject[key][0].includes('DE2_MS4')) {
          console.log(`${new Date().toISOString()}: ProductIdentifier - Info Log - identified as DEIMOS 2 MULTI.`);
          logger(`${new Date().toISOString()}: ProductIdentifier - Info Log - identified as DEIMO 2 MULTI.`);
          return 'D2MS4';  
        }
        else if (metadataObject[key][0].includes('DE2_PAN')) {
          console.log(`${new Date().toISOString()}: ProductIdentifier - Info Log - identified as DEIMOS 2 PAN.`);
          logger(`${new Date().toISOString()}: ProductIdentifier - Info Log - identified as DEIMOS 2 PAN.`);
          return 'D2PAN';  
        }
        else {
          return null;
        }
      }

      // Check if the current key is "MISSION"
      else if (key === 'id') {
        console.log(`${new Date().toISOString()}: ProductIdentifier - Info Log - identified as BlackSky.`);
        logger(`${new Date().toISOString()}: ProductIdentifier - Info Log - identified as BlackSky.`);
        if (metadataObject[key].includes('BSG')) {
          return 'BSG';  
        }
        else {
          return null;
        }
      }

      // Check if the current key is "MISSION"
      else if (key === 'SatelliteID') {
        if (metadataObject[key][0].includes('GF2')) {
          console.log(`${new Date().toISOString()}: ProductIdentifier - Info Log - identified as GAOFEN 2.`);
          logger(`${new Date().toISOString()}: ProductIdentifier - Info Log - identified as GAOFEN 2.`);
          return 'GF2';  
        }
        else {
          return null;
        }
      }

      
      // Check if the current key is "MISSION"
      else if (key === 'satellite') {
        if (metadataObject[key].includes('EROS-B')) {
          console.log(`${new Date().toISOString()}: ProductIdentifier - Info Log - identified as EROSB.`);
          logger(`${new Date().toISOString()}: ProductIdentifier - Info Log - identified as EROSB.`);
          return 'ERB';  
        }
        else {
          return null;
        }
      }

      // Check if the current key is "Scene_ID"
      else if (key === 'Scene_ID') {

        if (metadataObject[key][0].includes('TRIPLESAT')) {
          
          if (metadataObject[key][0].includes('_MS_')) {

            console.log(`${new Date().toISOString()}: ProductIdentifier - Info Log - identified as TRP_MS.`);
            logger(`${new Date().toISOString()}: ProductIdentifier - Info Log - identified as TRP_MS.`);
            return 'TRP_MS';  

          } else {
            return null;
          }
 
        }
        else {
          return null;
        }
      }


      // If the current value is another object, recursively search inside it
      else if (typeof metadataObject[key] === 'object') {
        const result = findProductType(metadataObject[key]);
        if (result) {
          return result;
        }
      }
    }
    
    // If the key is not found, return null
    return null;
  }

  export default findProductType;
  export {setLogger}