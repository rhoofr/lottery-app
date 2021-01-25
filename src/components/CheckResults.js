import React, { useContext, useEffect } from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';

import DispatchContext from '../shared/context/DispatchContext';
import LoadingSpinner from '../shared/components/uielements/LoadingSpinner';

const CheckResults = props => {
  const appDispatch = useContext(DispatchContext);

  useEffect(() => {
    const axiosRequest = Axios.CancelToken.source();

    async function fetchResults() {
      try {
        const response = await Axios.get(`/checkresults`, {
          cancelToken: axiosRequest.token
        });

        if (response.data) {
          appDispatch({ type: 'resultsLoaded', data: response.data.results });
        }
      } catch (error) {
        console.log('There was a problem or the request was cancelled.', error);
      }
      props.history.push(`/`);
    }
    fetchResults();
    // Cleanup
    return () => {
      axiosRequest.cancel();
    };
  }, [appDispatch, props.history]);

  return (
    <div className='center'>
      <LoadingSpinner asOverlay />
    </div>
  );
};

export default withRouter(CheckResults);
