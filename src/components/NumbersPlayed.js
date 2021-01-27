import React, { useEffect, useRef } from 'react';
import Axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useImmer } from 'use-immer';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import { DataTable } from 'primereact/datatable';
import { Toast } from 'primereact/toast';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import ReactTooltip from 'react-tooltip';

import { formatDate } from '../shared/utils/date';
import LoadingSpinner from '../shared/components/uielements/LoadingSpinner';
import Page from '../shared/containers/Page';
import DrawResult from './DrawingResult';

import './NumbersPlayed.css';

function NumbersPlayed() {
  const [state, setState] = useImmer({
    loading: true,
    numbersPlayed: [],
    refreshCount: 0,
    viewDrawsForTicket: false,
    numbersPlayedRow: {},
    drawResults: []
  });
  const toast = useRef(null);

  useEffect(() => {
    const axiosRequest = Axios.CancelToken.source();

    async function fetchNumbersPlayed() {
      try {
        const response = await Axios.get(`/numbersplayed`, {
          cancelToken: axiosRequest.token
        });
        if (response.data.results.length > 0) {
          setState(draft => {
            draft.numbersPlayed = response.data.results;
            draft.loading = false;
          });
          return toast.current.show({
            severity: 'success',
            summary: 'Numbers Played',
            detail: `Retrieved ${response.data.results.length} numbers played`,
            life: 3000
          });
        } else {
          setState(draft => {
            draft.numbersPlayed = [];
            draft.loading = false;
          });
          return toast.current.show({
            severity: 'warn',
            summary: 'Numbers Played',
            detail: `No numbers played retrieved`,
            life: 3000
          });
        }
      } catch (error) {
        console.log('There was a problem or the request was cancelled.');
        setState(draft => {
          draft.loading = false;
        });
        return toast.current.show({
          severity: 'error',
          summary: 'Winning Numbers Error',
          detail: `Error getting winning numbers: ${error}`,
          life: 3000
        });
      }
    }
    fetchNumbersPlayed();
    // Cleanup
    return () => {
      axiosRequest.cancel();
    };
  }, [state.refreshCount, setState]);

  useEffect(() => {
    if (Object.keys(state.numbersPlayedRow).length > 0) {
      const axiosRequest = Axios.CancelToken.source();

      async function fetchDraws() {
        try {
          const response = await Axios.get(
            `/drawsforticket/${state.numbersPlayedRow._id}`,
            {
              cancelToken: axiosRequest.token
            }
          );

          if (response.data.results.length > 0) {
            setState(draft => {
              draft.loading = false;
              draft.drawResults = response.data.results;
              draft.viewDrawsForTicket = true;
            });
          } else {
            setState(draft => {
              draft.loading = false;
            });
            return toast.current.show({
              severity: 'warn',
              summary: 'Draws for ticket',
              detail: `No Draws for Ticket retrieved`,
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
            summary: 'Draws for ticket',
            detail: `Error getting Draws for ticket: ${error}`,
            life: 3000
          });
        }
      }
      fetchDraws();
      // Cleanup
      return () => {
        axiosRequest.cancel();
      };
    }
  }, [state.numbersPlayedRow, setState]);

  const handleGetDrawsForTicket = rowData => {
    setState(draft => {
      draft.numbersPlayedRow = rowData;
    });
  };

  const hideDialog = () => {
    setState(draft => {
      draft.viewDrawsForTicket = false;
      draft.numbersPlayedRow = {};
    });
  };

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

  const gameBodyTemplate = rowData => {
    return rowData.game === 'P' ? 'PowerBall' : 'Mega Millions';
  };

  const startDateBodyTemplate = rowData => {
    return formatDate(rowData.startDate);
  };

  const endDateBodyTemplate = rowData => {
    return formatDate(rowData.endDate);
  };

  const rowClass = data => {
    return {
      allResultsChecked: !data.allResultsChecked
    };
  };

  const actionBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <Button
          icon='pi pi-check'
          className='p-button-rounded p-button-success checkNumbers'
          onClick={() => handleGetDrawsForTicket(rowData)}
          data-tip='Get Drawings for Ticket'
          data-for='draws'
        />
        <ReactTooltip place='top' id='draws' className='custom-tooltip' />
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

  return (
    <React.Fragment>
      {state.loading && (
        <div className='center'>
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!state.loading && state.numbersPlayed && (
        <Page title='Numbers Played' wide>
          <Toast ref={toast} />
          <h3 className='card__title'>
            NUMBERS PLAYED
            <span className='numbersPlayed--title__highlight'>
              {' '}
              (Open tickets highlighted in Mint)
            </span>
          </h3>
          <DataTable
            value={state.numbersPlayed}
            paginator
            paginatorTemplate='CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
            currentPageReportTemplate='Showing {first} to {last} of {totalRecords}'
            rows={13}
            rowsPerPageOptions={[13, 20, 50]}
            paginatorLeft={paginatorLeft}
            paginatorRight={paginatorRight}
            className={'p-datatable-sm'}
            rowClassName={rowClass}
          >
            <Column field='game' header='Game' body={gameBodyTemplate}></Column>
            <Column field='first' header='First'></Column>
            <Column field='second' header='Second'></Column>
            <Column field='third' header='Third'></Column>
            <Column field='fourth' header='Fourth'></Column>
            <Column field='fifth' header='Fifth'></Column>
            <Column field='ball' header='Ball'></Column>
            <Column
              field='startDate'
              header='Start Date'
              body={startDateBodyTemplate}
            ></Column>
            <Column
              field='endDate'
              header='End Date'
              body={endDateBodyTemplate}
            ></Column>
            <Column
              className='checkNumbers'
              header='Actions'
              body={actionBodyTemplate}
            ></Column>
          </DataTable>
        </Page>
      )}
      {state.viewDrawsForTicket && (
        <Dialog
          visible={state.viewDrawsForTicket}
          style={{ width: '80%' }}
          header='Results For Ticket'
          modal
          className='p-fluid'
          footer={dialogFooter}
          onHide={hideDialog}
        >
          <table className='table table-bordered border-primary jackpot--table'>
            <thead>
              <tr key={uuidv4()}>
                <th scope='col' colSpan={9}>
                  Numbers Played
                </th>
              </tr>
              <tr key={uuidv4()}>
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
              <tr key={state.numbersPlayedRow['_id']}>
                <td>
                  {state.numbersPlayedRow['game'] === 'P'
                    ? 'Powerball'
                    : 'Mega Millions'}
                </td>
                <td>{state.numbersPlayedRow['first']}</td>
                <td>{state.numbersPlayedRow['second']}</td>
                <td>{state.numbersPlayedRow['third']}</td>
                <td>{state.numbersPlayedRow['fourth']}</td>
                <td>{state.numbersPlayedRow['fifth']}</td>
                <td>{state.numbersPlayedRow['ball']}</td>
                <td>{formatDate(state.numbersPlayedRow['startDate'])}</td>
                <td>{formatDate(state.numbersPlayedRow['endDate'])}</td>
              </tr>
            </tbody>
          </table>

          <table className='table table-bordered border-primary'>
            <thead>
              <tr key={uuidv4()}>
                <th scope='col' colSpan={9}>
                  Drawing Results{' '}
                  <span className='highlightWinner'>(Matched Green)</span>
                </th>
              </tr>
              <tr key={uuidv4()}>
                <th scope='col'>Game</th>
                <th scope='col'>First</th>
                <th scope='col'>Second</th>
                <th scope='col'>Third</th>
                <th scope='col'>Fourth</th>
                <th scope='col'>fifth</th>
                <th scope='col'>Ball</th>
                <th scope='col'>Draw Date</th>
                <th scope='col'>Winnings</th>
              </tr>
            </thead>
            <tbody>
              {state.drawResults.map(result => {
                return (
                  <DrawResult
                    key={uuidv4()}
                    drawResult={result}
                    numbersPlayed={state.numbersPlayedRow}
                  />
                );
              })}
            </tbody>
          </table>
        </Dialog>
      )}
    </React.Fragment>
  );
}

export default NumbersPlayed;
