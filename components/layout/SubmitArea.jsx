import React, {useContext, useState} from "react";
import { MetadataContext } from "../context/MetadataContext.jsx";
import { CustomDataContext} from "../context/CustomDataContext.jsx"
import updateCustomData from '../fileWriter/CustomDataUpdater.js';
import {Button} from 'react-bootstrap';
import { BsFillInfoSquareFill } from "react-icons/bs";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { TbSquareCheckFilled } from "react-icons/tb";
import InfoModal from "../infoModal/InfoModal.jsx";
import LogModal from "../logModal/logModal.jsx";
import CompletionModal from "../completionModal/CompletionModal.jsx";

import './SubmitArea.css';

const SubmitArea = () => {
    const [infoModalShow, setInfoModalShow] = useState(false);
    const [logModalShow, setLogModalShow] = useState(false);
    const [processFinished, setProcessFinished] = useState(false);
    const [writtenData, setWrittenData] = useState([]);
    
    const submitData = (geoJSONArray, customData) => {
        updateCustomData(geoJSONArray, customData);
        pre.saveMetadata(geoJSONArray);
    }

    const updateState = (data) => {
        setProcessFinished(true);
        setWrittenData(data);
    }


    window.pre.eventListener((event, message) => {
        console.log(`${new Date().toISOString()}: SubmitArea - Info Log - ${message.eventName}.`);
        if (message.eventName === "writingFinished") {
            updateState(message.eventData);
        }
      });


    const metadataHandler = useContext(MetadataContext);
    const customDataHandler = useContext(CustomDataContext);
    const geoJSONArray = metadataHandler.metadataState;
    const customData = customDataHandler.CustomDataState;

    return (
        <>
            <InfoModal 
                show={infoModalShow}
                onHide = {() => setInfoModalShow(false)}
            />
            <LogModal 
                show={logModalShow}
                onHide = {() => setLogModalShow(false)}
            />
            <CompletionModal 
                show={processFinished}
                onHide = {() => setProcessFinished(false)}
            />
            <div className="submitArea">
                <div 
                    className="infoIcon"
                    onClick = {() => setInfoModalShow(true)}>
                    <BsFillInfoSquareFill />
                </div>
                <div 
                    className="warningIcon"
                    onClick = {() => setLogModalShow(true)}>
                    <BiSolidMessageSquareDetail />
                </div>
                {writtenData.length > 0 && <div 
                    className="completeIcon"
                    onClick = {() => setProcessFinished(true)}>
                    <TbSquareCheckFilled />
                </div>}
                <Button 
                    className="submitBtn"
                    variant="primary"
                    size="lg"
                    onClick={() => {submitData(geoJSONArray, customData)}}
                >
                    Enviar
                </Button>{' '}
            </div>
        </>
    )
}

export default SubmitArea
