import { userInfo } from "os";

let logger = null;

const setLogger = (logFunction) => {
    logger = logFunction;
}
  

const addCustomMetadata = (metadataObject, path) => {
    console.log(`${new Date().toISOString()}: CustomMetadataAdder - Info Log - ${path.split('\\').pop()} adding custom metadata.`);
    logger(`${new Date().toISOString()}: CustomMetadataAdder - Info Log - ${path.split('\\').pop()} adding custom metadata.`);

    try {
        metadataObject['custom'] = {};
        metadataObject['custom']['cstm_product'] = "NO_DATA";
        metadataObject['custom']['cstm_client'] = "NO_DATA";
        metadataObject['custom']['cstm_order'] = "NO_DATA";
        metadataObject['custom']['cstm_project'] = "NO_DATA";
        metadataObject['custom']['cstm_ooi'] = "NO_DATA";
        metadataObject['custom']['cstm_notes'] = "NO_DATA";
        metadataObject['custom']['cstm_quicklook_url'] = "NO_DATA";
        metadataObject['custom']['cstm_file_name'] = path.split('\\').pop();
        metadataObject['custom']['cstm_upload_date'] = new Date().toISOString();
        metadataObject['custom']['cstm_upload_resp'] = userInfo().username

        return metadataObject

    } catch(addErr) {
        
        console.log(`${new Date().toISOString()}: CustomMetadataAdder - Error Log - ${path.split('\\').pop()} could not add custom metadata.`);
        logger(`${new Date().toISOString()}: CustomMetadataAdder - Error Log - ${path.split('\\').pop()} could not add custom metadata.`);
        
        return {}
    }
}

export default addCustomMetadata;
export {setLogger}