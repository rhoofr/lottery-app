import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import React, { useContext, useEffect, useRef } from 'react';
import { useImmer } from 'use-immer';
import Axios from 'axios';
import classNames from 'classnames';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Dialog } from 'primereact/dialog';
import ReactTooltip from 'react-tooltip';

import Page from '../shared/containers/Page';
import StateContext from '../shared/context/StateContext';
import DispatchContext from '../shared/context/DispatchContext';
import PayoutSchedule from './PayoutSchedule';
import LoadingSpinner from '../shared/components/uielements/LoadingSpinner';
import { formatDate } from '../shared/utils/date';
import { formatCurrency } from '../shared/utils/formatting';

import './results.css';

const Results = () => {
  const [state, setState] = useImmer({
    loading: true,
    refreshCount: 0,
    numbersPlayedId: '',
    numbersPlayedString: '',
    viewNumbersPlayed: false,
    numbersPlayed: {},
    showPayout: false
  });
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const toast = useRef(null);

  useEffect(() => {
    const axiosRequest = Axios.CancelToken.source();

    async function fetchResults() {
      try {
        const response = await Axios.get(`/results`, {
          cancelToken: axiosRequest.token
        });

        if (response.data) {
          appDispatch({
            type: 'RESULTS_LOADED',
            data: response.data.results,
            newTicketRequired: response.data.newTicketRequired
          });
          setState(draft => {
            draft.loading = false;
          });

          return toast.current.show({
            severity: 'success',
            summary: 'Results',
            detail: `Retrieved ${response.data.results.length} results`,
            life: 3000
          });
        } else {
          setState(draft => {
            draft.loading = false;
          });
          return toast.current.show({
            severity: 'warn',
            summary: 'Results',
            detail: `No Results retrieved`,
            life: 3000
          });
        }
      } catch (error) {
        console.log('There was a problem or the request was cancelled.', error);
        setState(draft => {
          draft.loading = false;
        });
        return toast.current.show({
          severity: 'error',
          summary: 'Results',
          detail: `Error getting results: ${error}`,
          life: 3000
        });
      }
    }
    fetchResults();
    // Cleanup
    return () => {
      axiosRequest.cancel();
    };
  }, [state.refreshCount, setState, appDispatch]);

  useEffect(() => {
    if (state.numbersPlayedId.length > 0) {
      const axiosRequest = Axios.CancelToken.source();

      async function fetchNumbersPlayed() {
        try {
          const response = await Axios.get(
            `/numbersplayed/${state.numbersPlayedId}`,
            {
              cancelToken: axiosRequest.token
            }
          );

          if (response.data.playedNumbers) {
            setState(draft => {
              draft.loading = false;
              draft.numbersPlayed = response.data.playedNumbers;
              draft.numbersPlayedId = '';
              draft.viewNumbersPlayed = true;
            });
          } else {
            setState(draft => {
              draft.loading = false;
            });
            return toast.current.show({
              severity: 'warn',
              summary: 'Numbers Played',
              detail: `No Numbers Played retrieved`,
              life: 3000
            });
          }
        } catch (error) {
          console.log(
            'There was a problem or the request was cancelled.',
            error
          );
          setState(draft => {
            draft.loading = false;
          });
          return toast.current.show({
            severity: 'error',
            summary: 'Numbers Played',
            detail: `Error getting Numbers Played: ${error}`,
            life: 3000
          });
        }
      }
      fetchNumbersPlayed();
      // Cleanup
      return () => {
        axiosRequest.cancel();
      };
    }
  }, [state.numbersPlayedId, setState]);

  const handleGetNumbersPlayed = rowData => {
    setState(draft => {
      draft.numbersPlayedId = rowData.numbersPlayedId;
    });
  };

  const hideDialog = () => {
    setState(draft => {
      draft.viewNumbersPlayed = false;
    });
  };

  const hidePayoutDialog = () => {
    setState(draft => {
      draft.showPayout = false;
    });
  };

  const paginatorLeft = (
    <div>
      <Button
        type='button'
        icon='pi pi-refresh'
        className='p-button-text'
        onClick={() => {
          setState(draft => {
            draft.refreshCount++;
          });
        }}
        data-tip='Refresh Page'
        data-for='refresh'
      />
      <ReactTooltip place='right' id='refresh' className='custom-tooltip' />
    </div>
  );
  const paginatorRight = (
    <div>
      <Button
        type='button'
        icon='pi pi-dollar'
        className='p-button-text'
        onClick={() => {
          setState(draft => {
            draft.showPayout = true;
          });
        }}
        data-tip='Payout Schedule'
        data-for='payout'
      />
      <ReactTooltip place='left' id='payout' className='custom-tooltip' />
    </div>
  );

  const gameBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span className='p-column-title'>Game</span>
        {rowData.game === 'P' ? 'PowerBall' : 'Mega Millions'}
      </React.Fragment>
    );
  };

  const ballMatchedBodyTemplate = rowData => {
    const matchedClassName = classNames({
      highlightMatched: rowData.ballMatched,
      highlightNotMatched: !rowData.ballMatched
    });
    return (
      <div className={matchedClassName}>
        <span className='p-column-title'>Ball Matched</span>
        {rowData.ballMatched ? 'True' : 'False'}
      </div>
    );
  };

  const numbersMatchedBodyTemplate = rowData => {
    const matchedClassName = classNames({
      highlightNumbersMatched: rowData.numbersMatched > 0
    });
    return (
      <div className={matchedClassName}>
        <span className='p-column-title'>Numbers Matched</span>
        {rowData.numbersMatched}
      </div>
    );
  };

  const drawingDateBodyTemplate = rowData => {
    return (
      <div>
        <span className='p-column-title'>Draw Date</span>
        {formatDate(rowData.drawDate)}
      </div>
    );
  };

  const winningsBodyTemplate = rowData => {
    const winningsClassName = classNames({
      highlightWinner:
        rowData.currentWinnings > 0 && rowData.currentWinnings <= 10,
      bigWinner: rowData.currentWinnings > 99
    });

    return (
      <div className={winningsClassName}>
        <span className='p-column-title'>Current Winnings</span>
        {formatCurrency(rowData.currentWinnings)}
      </div>
    );
  };

  const actionBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span className='p-column-title'>Numbers Played</span>
        <Button
          icon='pi pi-info'
          className='p-button-rounded p-button-success checkNumbers'
          onClick={() => handleGetNumbersPlayed(rowData)}
          data-tip='Get Numbers Played'
          data-for='check'
        />
        <ReactTooltip place='top' id='check' className='custom-tooltip' />
      </React.Fragment>
    );
  };

  const dialogFooter = (
    <React.Fragment>
      <Button
        label='Close'
        icon='pi pi-times'
        className='p-button-text'
        onClick={hideDialog}
      />
    </React.Fragment>
  );

  const dialogPayoutFooter = (
    <React.Fragment>
      <Button
        label='Close'
        icon='pi pi-times'
        className='p-button-text'
        onClick={hidePayoutDialog}
      />
    </React.Fragment>
  );

  return (
    <React.Fragment>
      {state.loading && (
        <div className='center'>
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!state.loading && appState.results && (
        <Page title='Results' wide>
          <Toast ref={toast} />
          <div className='header--title_message'>
            <h3 className='card__title'>RESULTS</h3>
            {appState.newTicketRequired ? (
              <Message
                severity='info'
                text='Time for a new ticket!!!'
              ></Message>
            ) : null}
          </div>
          <div className='datatable-responsive'>
            <DataTable
              value={appState.results}
              paginator
              paginatorTemplate='CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
              currentPageReportTemplate='Showing {first} to {last} of {totalRecords}'
              rows={12}
              rowsPerPageOptions={[12, 20, 50]}
              paginatorLeft={paginatorLeft}
              paginatorRight={paginatorRight}
              className='p-datatable-sm p-datatable-responsive'
            >
              <Column
                field='game'
                header='Game'
                body={gameBodyTemplate}
              ></Column>
              <Column
                field='drawDate'
                header='Draw Date'
                body={drawingDateBodyTemplate}
              ></Column>
              <Column
                field='numbersMatched'
                header='Numbers Matched'
                body={numbersMatchedBodyTemplate}
              ></Column>
              <Column
                field='ballMatched'
                header='Ball Matched'
                body={ballMatchedBodyTemplate}
              ></Column>
              <Column
                field='currentWinnings'
                header='Current Winnings'
                body={winningsBodyTemplate}
              ></Column>
              <Column
                className='checkNumbers'
                header='Numbers Played'
                body={actionBodyTemplate}
              ></Column>
            </DataTable>
          </div>
        </Page>
      )}
      {state.viewNumbersPlayed && (
        <Dialog
          visible={state.viewNumbersPlayed}
          style={{ width: '80%' }}
          header='Numbers Played'
          modal
          className='p-fluid view-numbers-played'
          footer={dialogFooter}
          onHide={hideDialog}
        >
          <table className='table table-bordered border-primary numbers-played'>
            <thead>
              <tr key='1'>
                <th scope='col'>Game</th>
                <th scope='col'>First</th>
                <th scope='col'>Second</th>
                <th scope='col'>Third</th>
                <th scope='col'>Fourth</th>
                <th scope='col'>Fifth</th>
                <th scope='col'>Ball</th>
                <th scope='col'>Start Date</th>
                <th scope='col'>End Date</th>
              </tr>
            </thead>
            <tbody>
              <tr key={state.numbersPlayed['_id']}>
                <td>
                  {state.numbersPlayed['game'] === 'P'
                    ? 'Powerball'
                    : 'Mega Millions'}
                </td>
                <td>{state.numbersPlayed['first']}</td>
                <td>{state.numbersPlayed['second']}</td>
                <td>{state.numbersPlayed['third']}</td>
                <td>{state.numbersPlayed['fourth']}</td>
                <td>{state.numbersPlayed['fifth']}</td>
                <td>{state.numbersPlayed['ball']}</td>
                <td>{formatDate(state.numbersPlayed['startDate'])}</td>
                <td>{formatDate(state.numbersPlayed['endDate'])}</td>
              </tr>
            </tbody>
          </table>
        </Dialog>
      )}
      <Dialog
        visible={state.showPayout}
        style={{ width: '80%' }}
        modal
        className='p-fluid'
        footer={dialogPayoutFooter}
        onHide={hidePayoutDialog}
      >
        <PayoutSchedule />
      </Dialog>
    </React.Fragment>
  );
};

export default Results;
