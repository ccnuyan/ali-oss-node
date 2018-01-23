import actionTypes from '../actionTypes';

/* eslint-disable no-param-reassign */
/* eslint-disable no-useless-return */

const getUploaded = () => (dispatch) => {
  const payload = {
    method: 'GET',
    credentials: 'include',
  };

  dispatch({ type: actionTypes.ASS_GET_UPLOADED_START });

  fetch('/api/uploaded', payload)
    .then(res => res.json())
    .then((ret) => {
      dispatch({ type: actionTypes.ASS_GET_UPLOADED_END, payload: ret.data });
      return;
    }).catch(() => {
      dispatch({ type: actionTypes.ASS_GET_UPLOADED_ERROR });
      return;
    });
};


export default {
  getUploaded,
};
