import React from 'react';
import { reduxForm, Field } from 'redux-form';

import createMapboxGeoPicker from '../../../src/forms/redux-form/createMapboxGeoPicker';
import createGoogleMapGeoPicker from '../../../src/forms/redux-form/createGoogleMapGeoPicker';

import './BasicDemo.css';

import { berkeley, googleMapApiKey, mapboxAccessToken } from '../constants';

const formName = 'redux-form-demo';

const MapboxGeoPicker = createMapboxGeoPicker({ formName });
const GoogleMapGeoPicker = createGoogleMapGeoPicker({ formName });

class BasicDemo extends React.Component {
  render() {
    return (
      <div>
        <h2>ReduxForm Demo</h2>
        <div className="input-control">
          <label>Latitude:</label>
          <Field
            className="input"
            name="latitude"
            component="input"
            type="number"
            step="0.0000001"
            min={-90}
            max={90}
          />
        </div>
        <div className="input-control">
          <label>Latitude:</label>
          <Field
            className="input"
            name="longitude"
            component="input"
            type="number"
            step={0.0000001}
            min={-180}
            max={180}
          />
        </div>
        <MapboxGeoPicker apiKey={mapboxAccessToken} defaultValue={berkeley} />
        <GoogleMapGeoPicker apiKey={googleMapApiKey} />
      </div>
    )
  }
}

export default reduxForm({ form: formName })(BasicDemo);
