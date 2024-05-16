import React, {useContext} from "react";
import { MetadataContext } from "../context/MetadataContext.jsx";
import Table from 'react-bootstrap/Table';
import { BiSolidTrashAlt } from "react-icons/bi";

import './StatusTable.css'

const  StatusTable = () => {
  
    const metadataHandler = useContext(MetadataContext);
    const geoJSONArray = metadataHandler.metadataState;
    
    let count = 0;

    const removeGeoJSON = (fileName) => {
      const newJSONArray = geoJSONArray.filter( (metadata) => {
        return metadata.features[0].properties.cstm_file_name != fileName;
      });
      
      metadataHandler.setGeoJSON(newJSONArray);
    }

    {if (geoJSONArray.length > 0) {
      return(
        <Table responsive striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th><BiSolidTrashAlt/></th>
              <th>Tipo</th>
              <th>Nome do Arquivo</th>
            </tr>
          </thead>
          <tbody>
            {
              geoJSONArray.map(metadata => {
                count++;
                return (
                  <tr key = {metadata.features[0].properties.cstm_file_name}>
                    <td>{count}</td>
                    <td ><div onClick={() => {removeGeoJSON(metadata.features[0].properties.cstm_file_name)}}><BiSolidTrashAlt/></div></td>
                    <td>{metadata.features[0].properties.cstm_product}</td>
                    <td className="tableFileName">{metadata.features[0].properties.cstm_file_name}</td>
                  </tr>
                )
            })}
         </tbody>
        </Table>
    )

    } else {
          //TODO Improve warning
          return (
            <h1 className="warning">Carregue metadados!</h1> 
          )
       
    }}
    
}

export default StatusTable 