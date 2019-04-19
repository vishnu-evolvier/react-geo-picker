import React from "react";

import compose from 'recompose/compose';
import mapProps from 'recompose/mapProps';

import withScriptjs from 'react-google-maps/lib/withScriptjs';
import withGoogleMap from 'react-google-maps/lib/withGoogleMap';
import GoogleMap from 'react-google-maps/lib/components/GoogleMap';
import Marker from 'react-google-maps/lib/components/Marker';

import asGeoPicker from '../asGeoPicker';
import './index.css';

class GoogleMapGeoPicker extends React.Component {
  state = {
    bounds: null,
  };

  handlePlacesChanged = () => {
    const places = this.searchBox.getPlaces();
    if (!places || !places.length) return;
    const place = places[0];

    this.setCenter(place.geometry.location);
  };

  handleCenterChanged = () => this.setCenter(this.map.getCenter());

  setCenter = (center) => {
    const { onCenterChange } = this.props;
    if (!onCenterChange) return ;
    const { lat, lng } = center;
    onCenterChange({
      lat: lat(),
      lng: lng(),
    });
  };

  render() {
    const {
      defaultZoom,
      defaultCenter,
      center = defaultCenter,
    } = this.props;

    return (
      <GoogleMap
        defaultZoom={defaultZoom}
        defaultCenter={defaultCenter}
        defaultOptions={{
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
        }}
        center={center}
        ref={c => this.map = c}
        onCenterChanged={this.handleCenterChanged}
      >
        <Marker position={center} />
          <input
            className="searchBox"
            type="text"
            placeholder="Type to Search"
          />
      </GoogleMap>
    )
  }
}

const defaultCenter = {
  lat: -34.397,
  lng: 150.644,
};

GoogleMapGeoPicker.defaultProps = {
  defaultCenter,
  defaultZoom: 8
};

const propsMapper = ({
  width,
  height,
  apiKey = '',
  ...rest,
}) => ({
  ...rest,
  googleMapURL:
    `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geometry,drawing,places`,
  loadingElement: <div style={{ height: `100%` }} />,
  containerElement: <div style={{ height, width }} />,
  mapElement: <div style={{ height: `100%` }} />,
});

const propNameMap = {
  location: 'center',
  onLocationChange: 'onCenterChange',
  latitude: 'lat',
  longitude: 'lng',
};

export default compose(
  asGeoPicker({ propNameMap }),
  mapProps(propsMapper),
  withScriptjs,
  withGoogleMap,
)(GoogleMapGeoPicker);
