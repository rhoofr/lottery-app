import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

export const useHttpClient = () => {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const source = axios.CancelToken.source();

  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setLoading(true);

      try {
        const response = await axios({
          url,
          method,
          cancelToken: source.token,
          body,
          headers
        });

        if (!response.statusText === 'OK') {
          throw new Error(response.message);
        }

        setLoading(false);
        return response.data;
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('axios.isCancel(error)');
          // don't update state in case component is dismounting
        } else {
          console.log(error);
          setLoading(false);
          setError({
            message: error.response.data.error,
            status: error.response.status
          });
        }
      }
    },

    [source.token]
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      source.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { error, isLoading, sendRequest, clearError };
};
