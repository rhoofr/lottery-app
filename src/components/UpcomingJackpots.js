import React, { useEffect, useRef } from 'react';
import Axios from 'axios';
import { useImmer } from 'use-immer';
import { Toast } from 'primereact/toast';

import LoadingSpinner from '../shared/components/uielements/LoadingSpinner';
import Page from '../shared/containers/Page';
import { formatDate } from '../shared/utils/date';
import { formatCurrency } from '../shared/utils/formatting';

import './UpcomingJackpots.css';

function UpcomingJackpots() {
  const [state, setState] = useImmer({
    loading: true,
    upcomingJackpots: []
  });

  const toast = useRef(null);

  useEffect(() => {
    const axiosRequest = Axios.CancelToken.source();

    async function fetchUpcomingJackpots() {
      try {
        // Cleare out the results array
        setState(draft => {
          draft.upcomingJackpots = [];
        });

        const response = await Axios.get(`/checkupcoming`, {
          cancelToken: axiosRequest.token
        });
        // console.log(response);
        if (response.data.pbResult && response.data.megaResult) {
          setState(draft => {
            draft.upcomingJackpots.push(response.data.pbResult);
            draft.upcomingJackpots.push(response.data.megaResult);
            draft.loading = false;
          });
          return toast.current.show({
            severity: 'success',
            summary: 'Upcoming Jackpots',
            detail: `Upcoming Jackpots retrieved`,
            life: 3000
          });
        } else {
          setState(draft => {
            draft.upcomingJackpots = [];
            draft.loading = false;
          });
          return toast.current.show({
            severity: 'warn',
            summary: 'Upcoming Jackpots',
            detail: `No jackpots retrieved`,
            life: 3000
          });
        }
      } catch (error) {
        console.log(
          `There was a problem or the request was cancelled. error: ${error}`
        );
        setState(draft => {
          draft.upcomingJackpots = [];
          draft.loading = false;
        });
        return toast.current.show({
          severity: 'error',
          summary: 'Upcoming Jackpots',
          detail: `Error getting upcoming jackpots: ${error}`,
          life: 3000
        });
      }
    }
    fetchUpcomingJackpots();
    // Cleanup
    return () => {
      axiosRequest.cancel();
    };
  }, [setState]);

  return (
    <React.Fragment>
      {state.loading && (
        <div className='center'>
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!state.loading && state.upcomingJackpots && (
        <Page title='Upcoming Jackpots' wide>
          <Toast ref={toast} />
          <h3 className='card__title'>UPCOMING JACKPOTS</h3>
          <table className='table table-bordered border-primary jackpot--table'>
            <thead>
              <tr key='1'>
                <th scope='col'>Game</th>
                <th scope='col'>Next Jackpot</th>
                <th scope='col'>Next Draw Date</th>
              </tr>
            </thead>
            <tbody>
              {state.upcomingJackpots.map(upcomingJackpot => {
                return (
                  <tr key={upcomingJackpot._id}>
                    <td>{upcomingJackpot.game}</td>
                    <td>{formatCurrency(upcomingJackpot.currentJackpot)}</td>
                    <td>{formatDate(upcomingJackpot.nextDrawDate)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Page>
      )}
    </React.Fragment>
  );
}

export default UpcomingJackpots;
