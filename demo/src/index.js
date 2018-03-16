import React, {Component} from 'react'
import {render} from 'react-dom'

import MapboxGeoPicker from '../../src/mapbox';
import GoogleMapGeoPicker from '../../src/google-map';

class Demo extends Component {
  state = {
    location,
  };

  onLocationChange = (location) => this.setState({ location });

  render() {
    return <div>
      <h1>react-geo-picker Demo</h1>
      <MapboxGeoPicker value={this.state.location} onChange={this.onLocationChange} />
      <GoogleMapGeoPicker value={this.state.location} onChange={this.onLocationChange} />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'));
