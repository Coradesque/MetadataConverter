import React from "react";
import { MetadataProvider } from "../context/MetadataContext.jsx";
import { CustomDataProvider} from "../context/CustomDataContext.jsx";
import Workspace from '../layout/Workspace.jsx'
import './App.css';


const App = () => {
    
    return (
        <MetadataProvider>
            <CustomDataProvider>
                <Workspace/>
            </CustomDataProvider>
        </MetadataProvider>
    )
}

export default App;