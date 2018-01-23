// https://docs.fineuploader.com/branch/master/features/modules.html

// use Fine Uploader UI for traditional endpoints
import fineuploader from 'fine-uploader/lib/core';

import actionTypes from '../actionTypes';

// You may replace "rows" w/ "legacy" or "gallery" depending on your needs
// This assumes you have a loader to handle importing css files, such as Webpack css-loader

const initialize = uploaderConf => (dispatch) => {
  const uploader = new fineuploader.FineUploaderBasic({
    // debug: true,
    maxConnections: 2,
    multiple: true,
    request: {
      // https://docs.fineuploader.com/branch/master/api/options.html
      inputName: 'file',
      forceMultipart: true,
      paramsInBody: true,
      filenameParam: 'x:filename',
      uuidName: 'x:uuid',
      totalFileSizeName: 'x:size',
    },
    retry: {
      enableAuto: false, // defaults to false
    },
    deleteFile: {
      enabled: false,
    },
    callbacks: {
      onSubmit: async (uploadId, name) => {
        const payload = {
          method: 'POST',
          credentials: 'include',
          headers: {
            'content-type': 'application/json',
            accept: 'application/json',
          },
          body: JSON.stringify({
            filename: name,
          }),
        };

        return fetch('/api/luanch', payload)
          .then(res => res.json())
          .then((ret) => {
            uploader.setEndpoint(ret.data.host, uploadId);
            uploader.setParams({
              ...ret.data.multipart,
              key: `${ret.data.multipart.key}`,
            }, uploadId);
            dispatch({
              type: actionTypes.ASS_UPLOAD_GET_TOKEN_END,
              payload: {
                ..._.pick(ret.data.multipart, ['id', 'key', 'filename']),
                uploadId,
              },
            });
            return true;
          })
          .catch(() => false);
      },
      onProgress: (uploadId, name, uploaded, total) => {
        dispatch({
          type: actionTypes.ASS_UPLOAD_PROGRESS_START,
          payload: {
            uploadId,
            uploaded,
            total,
          },
        });
      },
      onComplete: (uploadId, name, responseJSON) => {
        dispatch({
          type: actionTypes.ASS_UPLOAD_END,
          payload: {
            ...responseJSON,
            uploadId,
            id: responseJSON.file_id,
          },
        });
      },
      onError(uploadId) {
        dispatch({
          type: actionTypes.ASS_UPLOAD_ERROR,
          payload: {
            uploadId,
            busy: false,
            error: true,
            uploaded: 0,
            total: 1,
          },
        });
      },
    },
    ...uploaderConf,
  });

  return uploader;
};

export default { initialize };
