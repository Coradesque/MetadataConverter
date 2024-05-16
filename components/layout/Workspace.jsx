import React from "react";
import UploadArea from './UploadArea.jsx'
import StatusArea from './StatusArea.jsx'
import SubmitArea from './SubmitArea.jsx'
import './Workspace.css'

const Workspace = () => {
    return (
        <div className="wokspace">
            <UploadArea/> 
            <StatusArea/>
            <SubmitArea/>
        </div>
    )
}

export default Workspace;