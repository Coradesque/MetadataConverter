import React, {createContext, useState } from "react";

export const CustomDataContext = createContext();
export const CustomDataProvider = ({children}) => {
    const [CustomDataState, setCustomDataState] = useState({responsible: "", date: new Date().toISOString(), client:"", order:"", project: "", ooi: "", notes:""});

    const setCustomDataJSON = async (newCustomDataArray) => { 
        setCustomDataState({...newCustomDataArray, date: new Date().toISOString(), responsible: await pre.getUser()})
    }

    const getNewDate = () => { 
        setCustomDataState({...CustomDataState, date: new Date().toISOString()})
        return CustomDataState.date;
    }

    return (
        <CustomDataContext.Provider value = {{CustomDataState, getNewDate, setCustomDataJSON}}>
            {children}
        </CustomDataContext.Provider>
    )
}
