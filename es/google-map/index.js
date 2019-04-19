var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";

import compose from 'recompose/compose';
import mapProps from 'recompose/mapProps';

import withScriptjs from 'react-google-maps/lib/withScriptjs';
import withGoogleMap from 'react-google-maps/lib/withGoogleMap';
import GoogleMap from 'react-google-maps/lib/components/GoogleMap';
import Marker from 'react-google-maps/lib/components/Marker';

import asGeoPicker from '../asGeoPicker';
import './index.css';

var GoogleMapGeoPicker = function (_React$Component) {
  _inherits(GoogleMapGeoPicker, _React$Component);

  function GoogleMapGeoPicker() {
    var _temp, _this, _ret;

    _classCallCheck(this, GoogleMapGeoPicker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      bounds: null
    }, _this.handlePlacesChanged = function () {
      var places = _this.searchBox.getPlaces();
      if (!places || !places.length) return;
      var place = places[0];

      _this.setCenter(place.geometry.location);
    }, _this.handleCenterChanged = function () {
      return _this.setCenter(_this.map.getCenter());
    }, _this.setCenter = function (center) {
      var onCenterChange = _this.props.onCenterChange;

      if (!onCenterChange) return;
      var lat = center.lat,
          lng = center.lng;

      onCenterChange({
        lat: lat(),
        lng: lng()
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  GoogleMapGeoPicker.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        defaultZoom = _props.defaultZoom,
        defaultCenter = _props.defaultCenter,
        _props$center = _props.center,
        center = _props$center === undefined ? defaultCenter : _props$center;


    return React.createElement(
      GoogleMap,
      {
        defaultZoom: defaultZoom,
        defaultCenter: defaultCenter,
        defaultOptions: {
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false
        },
        center: center,
        ref: function ref(c) {
          return _this2.map = c;
        },
        onCenterChanged: this.handleCenterChanged
      },
      React.createElement(Marker, { position: center }),
      React.createElement('input', {
        className: 'searchBox',
        type: 'text',
        placeholder: 'Type to Search'
      })
    );
  };

  return GoogleMapGeoPicker;
}(React.Component);

var defaultCenter = {
  lat: -34.397,
  lng: 150.644
};

GoogleMapGeoPicker.defaultProps = {
  defaultCenter: defaultCenter,
  defaultZoom: 8
};

var propsMapper = function propsMapper(_ref) {
  var width = _ref.width,
      height = _ref.height,
      _ref$apiKey = _ref.apiKey,
      apiKey = _ref$apiKey === undefined ? '' : _ref$apiKey,
      rest = _objectWithoutProperties(_ref, ['width', 'height', 'apiKey']);

  return _extends({}, rest, {
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=' + apiKey + '&libraries=geometry,drawing,places',
    loadingElement: React.createElement('div', { style: { height: '100%' } }),
    containerElement: React.createElement('div', { style: { height: height, width: width } }),
    mapElement: React.createElement('div', { style: { height: '100%' } })
  });
};

var propNameMap = {
  location: 'center',
  onLocationChange: 'onCenterChange',
  latitude: 'lat',
  longitude: 'lng'
};

export default compose(asGeoPicker({ propNameMap: propNameMap }), mapProps(propsMapper), withScriptjs, withGoogleMap)(GoogleMapGeoPicker);