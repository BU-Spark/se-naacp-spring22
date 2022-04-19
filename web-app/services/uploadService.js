import axios from 'axios';

import API from './api';
import errorHandler from '../helpers/errorHandler';

export default {
  getSignedUrl(data) {
    console.log({ data });
    // get signed url to allow authorized upload to s3 bucket
    return API.post('/v1/upload', data)
      .then(response => {
        console.log({ response });
        return response.data;
      })
      .catch(errorHandler.handleAPIError);
  },
  uploadPhoto(url, data, options) {
    // upload photo to the signed url
    return axios
      .put(url, data, options)
      .then(response => response.data)
      .catch(err => {
        // TODO improve error Handling or move error handling logic to uploader
        console.error(err);
      });
  },
};
