import { setLogger as BSGLogger} from '../converter/BlackSkyToGeoJSON';
import { setLogger as MetaAdderLogger} from '../fileReader/CustomMetadataAdder';
import { setLogger as JSONReaderLogger} from '../fileReader/JSONReader';
import { setLogger as CSGLogger} from '../converter/CSGToGeoJSON';
import { setLogger as CSKLogger} from '../converter/CSKToGeoJSON';
import { setLogger as D2MS4Logger} from '../converter/Deimos2MS4ToGeoJSON';
import { setLogger as D2PanLogger} from '../converter/Deimos2PanToGeoJSON';
import { setLogger as ERBLogger} from '../converter/ErosBToGeoJSON';
import { setLogger as GF2Logger} from '../converter/Gaofen2ToGeoJSON';
import { setLogger as IceLogger} from '../converter/IceyeToGeoJSON';
import { setLogger as JSONWriterLogger} from '../fileWriter/JSONWriter'
import { setLogger as MetaConverterLogger} from '../converter/MetadataConverter';
import { setLogger as MetadataReaderLogger} from '../fileReader/MetadataReader';
import { setLogger as ProdIdentLogger} from '../converter/ProductIdentifier';
import { setLogger as PreProcessLogger} from '../fileReader/ObjectPreProcessor';
import { setLogger as TriplesatMSLogger} from '../converter/TriplesatMSToGeoJSON';
import { setLogger as XMLReaderLogger} from '../fileReader/XMLReader';

import { setEventListener as JSONWriterListener } from '../fileWriter/JSONWriter';

const setAllLoggers = (logOnRenderer) => {
    console.log(`${new Date().toISOString()}: Logger - Info Log - setting loggers.`);
    logOnRenderer(`${new Date().toISOString()}: Logger - Info Log - setting loggers.`);

    BSGLogger(logOnRenderer);
    ProdIdentLogger(logOnRenderer);
    CSGLogger(logOnRenderer);
    CSKLogger(logOnRenderer);
    D2MS4Logger(logOnRenderer);
    D2PanLogger(logOnRenderer);
    ERBLogger(logOnRenderer);
    GF2Logger(logOnRenderer);
    IceLogger(logOnRenderer);
    JSONReaderLogger(logOnRenderer);
    MetaAdderLogger(logOnRenderer);
    MetaConverterLogger(logOnRenderer);
    MetadataReaderLogger(logOnRenderer);
    PreProcessLogger(logOnRenderer);
    JSONWriterLogger(logOnRenderer);
    TriplesatMSLogger(logOnRenderer);
    XMLReaderLogger(logOnRenderer);
}

const setAllListeners = (eventFunction) => {
    JSONWriterListener(eventFunction);
}

export default setAllLoggers;
export {setAllListeners}