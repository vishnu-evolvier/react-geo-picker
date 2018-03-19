import React, {Component} from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

import asGeoPicker from '../asGeoPicker';
import MarkerSvg from '../components/MarkerSvg';

const exampleAccessToken =
  `pk.eyJ1Ijoic3VuZmVuZzMyIiwiYSI6ImNqZXRudjg5bTEya3Aydm8xbTByYXZ3czQifQ.hSIbG7jmA_ZVoM2t5jfJyA`;

class MapboxGeoPicker extends Component {
  state = {
    viewport: {
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8
    }
  };

  onViewportChange = viewport =>
    this.setState({ viewport }, () => {
      const { onLocationChange } = this.props;
      if (onLocationChange) {
        onLocationChange({
          latitude: viewport.latitude,
          longitude: viewport.longitude,
        });
      }
    });


  render() {
    const { width, height, location } = this.props;
    const viewport = {
      ...this.state.viewport,
      ...location,
    };

    return (
      <ReactMapGL
        {...viewport}
        width={width}
        height={height}
        mapboxApiAccessToken={exampleAccessToken}
        onViewportChange={this.onViewportChange}
      >
        <Marker
          latitude={viewport.latitude}
          longitude={viewport.longitude}
          offsetTop={- MarkerSvg.size.height}
          offsetLeft={- MarkerSvg.size.width / 2}
        >
          <MarkerSvg />
        </Marker>
      </ReactMapGL>
    )
  }
}

MapboxGeoPicker.defaultProps = {
  width: 400,
  height: 300,
  location: undefined,
};

export default asGeoPicker()(MapboxGeoPicker);
