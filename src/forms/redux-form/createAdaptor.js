import { formValueSelector, change } from 'redux-form';
import { connect } from 'react-redux';

const createReduxFormAdaptor = ({
  formName,
  precision = 4,
}) => {
  if (!formName) {
    throw new Error('formName must be provided');
  }

  const selector = formValueSelector(formName);

  const locationMapper = state => {
    const latitude = selector(state, 'latitude');
    const longitude = selector(state, 'longitude');

    if (!latitude || !longitude) return {};

    return {
      value: {
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
    }
  };

  const dispatchMapper = (dispatch) => {
    return {
      onChange: ({ latitude, longitude }) => {
        dispatch(change(formName, 'latitude', latitude.toFixed(precision)));
        dispatch(change(formName, 'longitude', longitude.toFixed(precision)));
      },
    };
  };

  return connect(locationMapper, dispatchMapper);
};


export default createReduxFormAdaptor;
