import GeoPicker from '../../../lib/mapbox/index';
import createReduxFormAdaptor from './createAdaptor';

export default options => createReduxFormAdaptor(options)(GeoPicker);
