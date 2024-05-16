import React, {useContext, useEffect} from "react";
import { CustomDataContext } from "../context/CustomDataContext.jsx";
import {Container, Row, Col} from 'react-bootstrap';
import { Form } from "react-bootstrap";
import './CustomMetadataForm.css'

const CustomMetadataForm = () => {
    const customDataHandler = useContext(CustomDataContext);
    let {responsible, date, client, order, project, ooi, notes} = customDataHandler.CustomDataState;

    useEffect(() => {
        customDataHandler.setCustomDataJSON({});
    },[])

        // Ensure default values for state variables
        responsible = responsible || "";
        date = date || new Date().toISOString();
        client = client || "";
        order = order || "";
        project = project || "";
        ooi = ooi || "";
        notes = notes || "";

        const changeHandler = (event) => {
            customDataHandler.getNewDate();
            const newDataObject = { ...customDataHandler.CustomDataState };
            switch (event.target.id) {
                case "formResp":
                    newDataObject.responsible = event.target.value;
                    break;

                case "formClient":
                    newDataObject.client = event.target.value;
                    break;

                case "formOrder":
                    newDataObject.order = event.target.value;
                    break;

                case "formProject":
                    newDataObject.project = event.target.value;
                    break;

                case "formOOI":
                    newDataObject.ooi = event.target.value;
                    break;

                case "formNotes":
                    newDataObject.notes = event.target.value;
                    break;

                default:
                    break;
            }
            customDataHandler.setCustomDataJSON(newDataObject);
        };
    return (
        <Container>
            <Form>
                <Row>
                    <Col>
                        <Form.Group  controlId="formResp">
                        <Form.Control type="text" placeholder={"Responsável"} value={responsible} onChange={changeHandler} disabled/>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group className="mb-1" controlId="formDate">
                        <Form.Control type="text" placeholder={date} disabled />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-1" controlId="formClient">
                        <Form.Control type="text" placeholder="Cliente" value={client} onChange={changeHandler}/>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group className="mb-1" controlId="formOrder">
                        <Form.Control type="text" placeholder="Pedido" value={order} onChange={changeHandler}/>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-1" controlId="formProject">
                        <Form.Control type="text" placeholder="Projeto" value={project} onChange={changeHandler}/>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group className="mb-1" controlId="formOOI">
                        <Form.Control type="text" placeholder="Alvo" value={ooi} onChange={changeHandler}/>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Form.Group className="mb-1" controlId="formNotes">
                    <Form.Control as="textarea" placeholder="Anotações" value={notes} onChange={changeHandler}/>
                    </Form.Group>
                </Row>
            </Form>
        </Container>
    )

}

export default CustomMetadataForm;

