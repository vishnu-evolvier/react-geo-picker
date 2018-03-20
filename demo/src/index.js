import React, {Component} from 'react'
import {render} from 'react-dom'

import MapboxGeoPicker from '../../src/mapbox';
import GoogleMapGeoPicker from '../../src/google-map';

import './index.css';

class Demo extends Component {
  state = {
    location: {
      latitude: 31.1094,
      longitude: 121.4114,
    },
  };

  onLocationChange = (location) => this.setState({
    location: {
      ...this.state.location,
      ...location,
    }
  });

  handleLatitudeChange = (event) => this.onLocationChange({
    latitude: Number(event.target.value),
  });

  handleLongitudeChange = (event) => this.onLocationChange({
    longitude: Number(event.target.value),
  });

  render() {
    const { location } = this.state;

    return (
      <div className="container">
        <h1>react-geo-picker Demo</h1>
        <div className="input-control">
          <label>Latitude:</label>
          <input
            className="input"
            type="number"
            step="0.0000001"
            min={-90}
            max={90}
            value={location.latitude}
            onChange={this.handleLatitudeChange}
          />
        </div>
        <div className="input-control">
          <label>Latitude:</label>
          <input
            className="input"
            type="number"
            step={0.0000001}
            min={-180}
            max={180}
            value={location.longitude}
            onChange={this.handleLongitudeChange}
          />
        </div>
        <MapboxGeoPicker value={location} onChange={this.onLocationChange} />
        <GoogleMapGeoPicker value={location} onChange={this.onLocationChange} />
      </div>
    )
  }
}

render(<Demo/>, document.querySelector('#demo'));
