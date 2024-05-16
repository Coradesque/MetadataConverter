
const updateCustomData = (geoJSONArray, customData) => {

    geoJSONArray.forEach(element => {
        const prop =  element.features[0].properties;
        if (customData.client && customData.client.toString().trim() != "") {
            prop.cstm_client = customData.client
        } else {
            prop.cstm_client = "NO_DATA";
        }; 
        
        if (customData.order && customData.order.toString().trim() != "") {
            prop.cstm_order = customData.order
        } else {
            prop.cstm_order = "NO_DATA";
        };

        

        if (customData.ooi && customData.ooi.toString().trim() != "") {
            prop.cstm_ooi = customData.ooi
        } else {
            prop.cstm_ooi = "NO_DATA";
        }; 
        
        if (customData.project && customData.project.toString().trim() != "") {
            prop.cstm_project = customData.project
        } else {
            prop.cstm_project = "NO_DATA";
        };


        
        
        if (customData.notes && customData.notes.toString().trim() != "") {
            prop.cstm_notes = customData.notes
        } else {
            prop.cstm_notes = "NO_DATA";
        };
        
    });

}

export default updateCustomData;