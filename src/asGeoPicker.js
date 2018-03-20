import compose from 'recompose/compose';
import withState from 'recompose/withState';
import mapProps from 'recompose/mapProps';
import withDefaultProps from 'recompose/defaultProps';
import withHandlers from 'recompose/withHandlers';

export const defaultProps = {
  value: undefined,
  onChange: undefined,
  defaultValue: undefined,
  propNameMap: {
    location: 'location',
    latitude: 'latitude',
    longitude: 'longitude',
    onLocationChange: 'onLocationChange',
  },
};

export const propsMapper = ({ value, location, ...rest }) => ({
  width: 400,
  height: 300,
  location: value || location,
  ...rest,
});

export const initialState = ({
  defaultValue: { latitude, longitude } = {},
}) => ({
  latitude: latitude || 0,
  longitude: longitude || 0,
});

export const onLocationChange = ({
  propNameMap = {},
  value,
  onChange,
  setLocation,
}) => ({
  [propNameMap.latitude]: latitude,
  [propNameMap.longitude]: longitude,
} = {}) => {
  const location = { latitude, longitude };
  if (onChange) {
    onChange(location);
  }

  if (!value) {
    setLocation(location);
  }
};

export const propNameMapper = ({
  propNameMap = {},
  location,
  onLocationChange,
  ...rest,
}) => ({
  ...rest,
  [propNameMap.location]: location ? {
    [propNameMap.latitude]: location.latitude,
    [propNameMap.longitude]: location.longitude,
  } : location,
  [propNameMap.onLocationChange]: onLocationChange,
});

export default ({ propNameMap } = {}) => compose(
  withDefaultProps({
    ...defaultProps,
    propNameMap: {
      ...defaultProps.propNameMap,
      ...propNameMap,
    },
  }),
  withState('location', 'setLocation', initialState),
  mapProps(propsMapper),
  withHandlers({ onLocationChange }),
  mapProps(propNameMapper),
);
