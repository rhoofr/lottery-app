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

import Page from '../shared/containers/Page';
import StateContext from '../shared/context/StateContext';
import DispatchContext from '../shared/context/DispatchContext';
import LoadingSpinner from '../shared/components/uielements/LoadingSpinner';
import { formatDate } from '../shared/utils/date';
import { formatCurrency } from '../shared/utils/formatting';

import './results.css';

const Results = () => {
  const [state, setState] = useImmer({
    loading: true,
    refreshCount: 0
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
            type: 'resultsLoaded',
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

  const paginatorLeft = (
    <Button
      type='button'
      icon='pi pi-refresh'
      className='p-button-text'
      onClick={() => {
        setState(draft => {
          draft.refreshCount++;
        });
      }}
    />
  );
  const paginatorRight = (
    <Button
      type='button'
      icon='pi pi-cloud'
      className='p-button-text'
      style={{ display: 'none' }}
    />
  );

  // const formatCurrency = value => {
  //   if (isNaN(value)) return;
  //   return value.toLocaleString('en-US', {
  //     style: 'currency',
  //     currency: 'USD'
  //   });
  // };

  const gameBodyTemplate = rowData => {
    return rowData.game === 'P' ? 'PowerBall' : 'Mega Millions';
  };

  const ballMatchedBodyTemplate = rowData => {
    const matchedClassName = classNames({
      highlightMatched: rowData.ballMatched,
      highlightNotMatched: !rowData.ballMatched
    });
    return (
      <div className={matchedClassName}>
        {rowData.ballMatched ? 'True' : 'False'}
      </div>
    );
  };

  const numbersMatchedBodyTemplate = rowData => {
    const matchedClassName = classNames({
      highlightNumbersMatched: rowData.numbersMatched > 0
    });
    return <div className={matchedClassName}>{rowData.numbersMatched}</div>;
  };

  const drawingDateBodyTemplate = rowData => {
    return formatDate(rowData.drawDate);
  };

  const winningsBodyTemplate = rowData => {
    const winningsClassName = classNames({
      highlightWinner:
        rowData.currentWinnings > 0 && rowData.currentWinnings <= 10,
      bigWinner: rowData.currentWinnings > 99
    });

    return (
      <div className={winningsClassName}>
        {formatCurrency(rowData.currentWinnings)}
      </div>
    );
  };

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
          <DataTable
            value={appState.results}
            paginator
            paginatorTemplate='CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
            currentPageReportTemplate='Showing {first} to {last} of {totalRecords}'
            rows={13}
            rowsPerPageOptions={[13, 20, 50]}
            paginatorLeft={paginatorLeft}
            paginatorRight={paginatorRight}
            className='p-datatable-sm'
          >
            <Column field='game' header='Game' body={gameBodyTemplate}></Column>
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
          </DataTable>
        </Page>
      )}
    </React.Fragment>
  );
};

export default Results;
