import React, {createContext, useState } from "react";

export const MetadataContext = createContext();
export const MetadataProvider = ({children}) => {
    const [metadataState, setMetadataState] = useState([]);

    const setGeoJSON = (newGeoJSONArray) => {
        setMetadataState([...newGeoJSONArray])
    }

    return (
        <MetadataContext.Provider value = {{metadataState, setGeoJSON}}>
            {children}
        </MetadataContext.Provider>
    )
}
