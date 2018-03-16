import React, {Component} from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

import MarkerSvg from '../components/MarkerSvg';

const exampleAccessToken =
  `pk.eyJ1Ijoic3VuZmVuZzMyIiwiYSI6ImNqZXRudjg5bTEya3Aydm8xbTByYXZ3czQifQ.hSIbG7jmA_ZVoM2t5jfJyA`;

class MapboxGeoPicker extends Component {
  state = {
    viewport: {
      width: 400,
      height: 400,
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8
    }
  };

  render() {
    const { viewport } = this.state;

    return (
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={exampleAccessToken}
        onViewportChange={(viewport) => this.setState({viewport})}
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

export default MapboxGeoPicker;
