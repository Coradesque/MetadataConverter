let logger = null;

const setLogger = (logFunction) => {
    logger = logFunction;
}

const getIceyeGeoJSON = (IceyeObject) => {
  try{
      const root = IceyeObject.Metadata;

      const iceyeGeoJson = {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {
              "spec_version": parseFloat(root?.spec_version?.[0] ?? -1),
              "product_name": root?.product_name?.[0] ?? "NO_DATA",
              "product_type": root?.product_type?.[0] ?? "NO_DATA",
              "product_level": root?.product_level?.[0] ?? "NO_DATA",
              "satellite_name": root?.satellite_name?.[0] ?? "NO_DATA",
              "acquisition_mode": root?.acquisition_mode?.[0] ?? "NO_DATA",
              "look_side": root?.look_side?.[0] ?? "NO_DATA",
              "satellite_look_angle": parseFloat(root?.satellite_look_angle?.[0] ?? -1),
              "processing_time": root?.processing_time?.[0] ?? "NO_DATA",
              "processor_version": root?.processor_version?.[0] ?? "NO_DATA",
              "acquisition_start_utc": root?.acquisition_start_utc?.[0] ?? "NO_DATA",
              "acquisition_end_utc": root?.acquisition_end_utc?.[0] ?? "NO_DATA",
              "orbit_direction": root?.orbit_direction?.[0] ?? "NO_DATA",
              "sample_precision": root?.sample_precision?.[0] ?? "NO_DATA",
              "polarization": root?.polarization?.[0] ?? "NO_DATA",
              "azimuth_looks": parseInt(root?.azimuth_looks?.[0]) ?? "NO_DATA",
              "range_looks": parseInt(root?.range_looks?.[0]) ?? "NO_DATA",
              "gcp_terrain_model": root?.gcp_terrain_model?.[0] ?? "NO_DATA",
              "geo_ref_system": root?.geo_ref_system?.[0] ?? "NO_DATA",
              "mean_orbit_altitude": parseFloat(root?.mean_orbit_altitude?.[0] ?? -1),
              "coord_center_lat": parseFloat(root?.coord_center?.[0].split(" ")[2] ?? 0),
              "coord_center_long": parseFloat(root?.coord_center?.[0].split(" ")[3] ?? 0),
              "heading": parseFloat(root?.heading?.[0] ?? -1),
              "incidence_near": parseFloat(root?.incidence_near?.[0] ?? -1),
              "incidence_center": parseFloat(root?.incidence_center?.[0] ?? -1),
              "incidence_far": parseFloat(root?.incidence_far?.[0] ?? -1),
              "calibration_factor": root?.calibration_factor?.[0] ?? "NO_DATA",
              "orbit_processing_level": root?.orbit_processing_level?.[0] ?? "NO_DATA",
              "data_orientation": root?.data_orientation?.[0] ?? "NO_DATA",
              "acquisition_id": parseInt(root?.acquisition_id?.[0] ?? -1),
              "azimuth_resolution": parseFloat(root?.azimuth_resolution?.[0] ?? -1),
              "range_resolution_near": parseFloat(root?.range_resolution_near?.[0] ?? -1),
              "range_resolution_center": parseFloat(root?.range_resolution_center?.[0] ?? -1),
              "range_resolution_far": parseFloat(root?.range_resolution_far?.[0] ?? -1),
              ...IceyeObject.custom,
            },
            "geometry": {
              "coordinates": [
                [
                  [
                    parseFloat(root.coord_first_near[0].split(" ")[3]),
                    parseFloat(root.coord_first_near[0].split(" ")[2])
                  ],
                  [
                    parseFloat(root.coord_first_far[0].split(" ")[3]),
                    parseFloat(root.coord_first_far[0].split(" ")[2])
                  ],
                  [
                    parseFloat(root.coord_last_far[0].split(" ")[3]),
                    parseFloat(root.coord_last_far[0].split(" ")[2])
                  ],
                  [
                    parseFloat(root.coord_last_near[0].split(" ")[3]),
                    parseFloat(root.coord_last_near[0].split(" ")[2])
                  ],
                  [
                    parseFloat(root.coord_first_near[0].split(" ")[3]),
                    parseFloat(root.coord_first_near[0].split(" ")[2])
                  ]
                ]
              ],
              "type": "Polygon"
            }
          }
        ]
      }
    
    console.log(`${new Date().toISOString()}: IceyeToGeoJSON - Info Log - ${IceyeObject.custom.cstm_file_name} sucessfully converted.`);
    logger(`${new Date().toISOString()}: IceyeToGeoJSON - Info Log - ${IceyeObject.custom.cstm_file_name} sucessfully converted.`);
    
    return iceyeGeoJson;

  } catch (err) {
    console.log(`${new Date().toISOString()}: IceyeToGeoJSON - Error Log - ${IceyeObject.custom.cstm_file_name} converting error. - ${err}`);
    logger(`${new Date().toISOString()}: IceyeToGeoJSON - Error Log - ${IceyeObject.custom.cstm_file_name} converting error. - ${err}`);    return {}
  }

}
    
export default getIceyeGeoJSON;
export {setLogger};