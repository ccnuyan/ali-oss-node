import { fromJS } from 'immutable';

import actionTypes from '../actionTypes';

const assinit = fromJS({
  uploaded: {
  },
  uploading: {

  },
});

/* eslint-disable no-param-reassign, no-undef */
export default (state = assinit, action) => {
  switch (action.type) {
    case actionTypes.ASS_GET_UPLOADED_START: {
      state = state.setIn(['files'], fromJS({}));
      return state;
    }
    case actionTypes.ASS_GET_UPLOADED_END: {
      action.payload.forEach((file) => {
        state = state.setIn(['files', file.id], fromJS(file));
      });
      return state;
    }
    case actionTypes.ASS_UPLOAD_GET_TOKEN_END: {
      action.payload.busy = true;
      action.payload.error = false;
      state = state.setIn(['files', action.payload.id], fromJS(action.payload));
      state = state.setIn(['states', action.payload.uploadId], fromJS({
        status: 'waiting',
        uploaded: 0,
        total: 1,
      }));
      return state;
    }
    case actionTypes.ASS_UPLOAD_PROGRESS_START: {
      state = state.setIn(['states', action.payload.uploadId, 'status'], 'uploading');
      state = state.setIn(['states', action.payload.uploadId, 'uploaded'], action.payload.uploaded);
      state = state.setIn(['states', action.payload.uploadId, 'total'], action.payload.total);
      return state;
    }
    case actionTypes.ASS_UPLOAD_END: {
      if (action.payload.id) {
        state = state.setIn(['files', action.payload.id], fromJS(action.payload));
        state = state.removeIn(['states', action.payload.uploadId]);
      }
      return state;
    }
    case actionTypes.ASS_UPLOAD_ERROR: {
      state = state.setIn(['states', action.payload.uploadId, 'status'], 'error');
      return state;
    }
    default: {
      return state;
    }
  }
};

