import React, { useEffect, useRef } from 'react';
import Axios from 'axios';
import { useImmer } from 'use-immer';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import { DataTable } from 'primereact/datatable';
import { Toast } from 'primereact/toast';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { formatDate } from '../shared/utils/date';

import LoadingSpinner from '../shared/components/uielements/LoadingSpinner';
import Page from '../shared/containers/Page';

import './NumbersPlayed.css';

function NumbersPlayed() {
  const [state, setState] = useImmer({
    loading: true,
    numbersPlayed: [],
    refreshCount: 0
  });
  const toast = useRef(null);

  useEffect(() => {
    const axiosRequest = Axios.CancelToken.source();

    async function fetchNumbersPlayed() {
      try {
        const response = await Axios.get(`/numbersplayed`, {
          cancelToken: axiosRequest.token
        });
        // console.log(response.data.data);
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
          <h3 className='card__title'>NUMBERS PLAYED</h3>
          <DataTable
            value={state.numbersPlayed}
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
          </DataTable>
        </Page>
      )}
    </React.Fragment>
  );
}

export default NumbersPlayed;
