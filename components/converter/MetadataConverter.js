import findProductType from './ProductIdentifier';
import getBlackSkyGeoJSON from './BlackSkyToGeoJSON.js';
import getCSGGeoJSON from '../converter/CSGToGeoJSON.js';
import getCSKGeoJSON from './CSKToGeoJSON.js';
import getDeimos2MS4GeoJSON from '../converter/Deimos2MS4ToGeoJSON.js';
import getDeimos2PanGeoJSON from '../converter/Deimos2PanToGeoJSON.js';
import getErosBGeoJSON from './ErosBToGeoJSON.js';
import getGaofen2GeoJSON from './Gaofen2ToGeoJSON.js';
import getIceyeGeoJSON from '../converter/IceyeToGeoJSON.js';
import getTriplesatMSGeoJSON from './TriplesatMSToGeoJSON.js';

let logger = null;

const setLogger = (logFunction) => {
	logger = logFunction;
};

const convertMetadata = (fileDataArray) => {
	const geoJSONArray = [];
	fileDataArray.forEach((fileData) => {
		
		console.log(`${new Date().toISOString()}: MetadataConverter - Info Log - ${fileData?.custom?.cstm_file_name ?? "NULL_OBJECT"} starting product identification.`);
    	logger(`${new Date().toISOString()}: MetadataConverter - Info Log - ${fileData?.custom?.cstm_file_name ?? "NULL_OBJECT"} starting product identification.`);
		
		const productType = findProductType(fileData);
		
		if (productType != null) {

			console.log(`${new Date().toISOString()}: MetadataConverter - Info Log - ${fileData.custom.cstm_file_name} is a ${productType} metadata`);
			logger(`${new Date().toISOString()}: MetadataConverter - Info Log - ${productType} metadata`);

			let geoJSONData = {};

			switch (productType) {
				case 'ICE':
					geoJSONData = getIceyeGeoJSON(fileData);
					geoJSONData.features[0].properties.cstm_product = 'ICE';
					geoJSONArray.push(geoJSONData);
					break;

				case 'CSG':
					geoJSONData = getCSGGeoJSON(fileData);
					geoJSONData.features[0].properties.cstm_product = 'CSG';
					geoJSONArray.push(geoJSONData);
					break;

				case 'BSG':
					geoJSONData = getBlackSkyGeoJSON(fileData);
					geoJSONData.features[0].properties.cstm_product = 'BSG';
					geoJSONArray.push(geoJSONData);
					break;

				case 'CSK':
					geoJSONData = getCSKGeoJSON(fileData);
					geoJSONData.features[0].properties.cstm_product = 'CSK';
					geoJSONArray.push(geoJSONData);
					break;

				case 'D2MS4':
					geoJSONData = getDeimos2MS4GeoJSON(fileData);
					geoJSONData.features[0].properties.cstm_product = 'D2MS4';
					geoJSONArray.push(geoJSONData);
					break;

				case 'D2PAN':
					geoJSONData = getDeimos2PanGeoJSON(fileData);
					geoJSONData.features[0].properties.cstm_product = 'D2PAN';
					geoJSONArray.push(geoJSONData);
					break;

				case 'GF2':
					geoJSONData = getGaofen2GeoJSON(fileData);
					geoJSONData.features[0].properties.cstm_product = 'GF2';
					geoJSONArray.push(geoJSONData);
					break;

				case 'ERB':
					geoJSONData = getErosBGeoJSON(fileData);
					geoJSONData.features[0].properties.cstm_product = 'ERB';
					geoJSONArray.push(geoJSONData);
					break;

				case 'TRP_MS':
					geoJSONData = getTriplesatMSGeoJSON(fileData);
					geoJSONData.features[0].properties.cstm_product = 'TRP_MS';
					geoJSONArray.push(geoJSONData);
					break;

				default:
					break;
			}
		} else {
            console.log(`${new Date().toISOString()}: MetadataConverter - Error Log - ${fileData.custom.cstm_file_name} type was not identified.`);
			logger(`${new Date().toISOString()}: MetadataConverter - Error Log - ${productType} type was not identified`);
        }
	});

	return geoJSONArray;
};

export default convertMetadata;
export { setLogger };
