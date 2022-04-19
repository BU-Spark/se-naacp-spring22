const errorHandler = {
  handleAPIError(error) {
    if (error.response) {
      const {
        response: { status, data },
      } = error;
      if (status === 500) {
        data.message = 'internal server error';
        throw data.message;
      } else if (status === 401) {
        const err = { ...data, status };
        throw err;
      } else {
        const error = {
          errors: data.data?.errors || {},
          message: data.message,
          status,
        };
        throw error;
      }
    } else {
      throw error.message;
    }
  },
};

export default errorHandler;
