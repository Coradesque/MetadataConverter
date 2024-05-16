import React, {useContext} from "react";
import { MetadataContext } from "../context/MetadataContext.jsx";
import {Container, Row, Button} from 'react-bootstrap';
import CustomMetadataForm from "../inputForm/CustomMetadataForm.jsx";
import './UploadArea.css';

const UploadArea = () => {
    const metadataHandler = useContext(MetadataContext);
    return (
        <div className="uploadArea">
            <Container>
                <Row>
                    <CustomMetadataForm/>
                </Row>
                <Row className="selectBtn">
                    <Button 
                        variant="primary"
                        onClick={async () => {
                            const geoJSONArray = await pre.openMetadata();
                            metadataHandler.setGeoJSON(geoJSONArray);
                        }}
                        >Selecionar
                    </Button>{' '}
                </Row>
            </Container>
        </div>
    )
}

export default UploadArea

