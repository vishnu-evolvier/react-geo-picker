import GeoPicker from '../../../lib/google-map/index';
import createReduxFormAdaptor from './createAdaptor';

export default options => createReduxFormAdaptor(options)(GeoPicker);
