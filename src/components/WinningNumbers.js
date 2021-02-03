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

import LoadingSpinner from '../shared/components/uielements/LoadingSpinner';
import Page from '../shared/containers/Page';
import { formatDate } from '../shared/utils/date';

import './WinningNumbers.css';

function WinningNumbers() {
  const [state, setState] = useImmer({
    loading: true,
    winningNumbers: [],
    refreshCount: 0
  });

  const toast = useRef(null);

  useEffect(() => {
    const axiosRequest = Axios.CancelToken.source();

    async function fetchWinningNumbers() {
      try {
        const response = await Axios.get(`/winningnumbers`, {
          cancelToken: axiosRequest.token
        });
        if (response.data.results.length > 0) {
          setState(draft => {
            draft.winningNumbers = response.data.results;
            draft.loading = false;
          });
          return toast.current.show({
            severity: 'success',
            summary: 'Winning Numbers',
            detail: `Retrieved ${response.data.results.length} winning numbers`,
            life: 3000
          });
        } else {
          setState(draft => {
            draft.winningNumbers = [];
            draft.loading = false;
          });
          return toast.current.show({
            severity: 'warn',
            summary: 'Winning Numbers',
            detail: `No winning numbers retrieved`,
            life: 3000
          });
        }
      } catch (error) {
        console.log('There was a problem or the request was cancelled.');
        setState(draft => {
          draft.winningNumbers = [];
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
    fetchWinningNumbers();
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
    return (
      <React.Fragment>
        <span className='p-column-title'>Game</span>
        {rowData.game === 'P' ? 'PowerBall' : 'Mega Millions'}
      </React.Fragment>
    );
  };

  const firstBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span className='p-column-title'>First</span>
        {rowData.first}
      </React.Fragment>
    );
  };
  const secondBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span className='p-column-title'>Second</span>
        {rowData.second}
      </React.Fragment>
    );
  };
  const thirdBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span className='p-column-title'>Third</span>
        {rowData.third}
      </React.Fragment>
    );
  };
  const fourthBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span className='p-column-title'>Fourth</span>
        {rowData.fourth}
      </React.Fragment>
    );
  };
  const fifthBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span className='p-column-title'>Fifth</span>
        {rowData.fifth}
      </React.Fragment>
    );
  };
  const ballBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <span className='p-column-title'>Ball</span>
        {rowData.ball}
      </React.Fragment>
    );
  };

  const drawDateBodyTemplate = rowData => {
    return (
      <div>
        <span className='p-column-title'>Draw Date</span>
        {formatDate(rowData.drawDate)}
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
      {!state.loading && state.winningNumbers && (
        <Page title='Winning Numbers' wide>
          <Toast ref={toast} />
          <h3 className='card__title'>WINNING NUMBERS</h3>
          <div className='datatable-responsive'>
            <DataTable
              value={state.winningNumbers}
              paginator
              paginatorTemplate='CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
              currentPageReportTemplate='Showing {first} to {last} of {totalRecords}'
              rows={13}
              rowsPerPageOptions={[13, 20, 50]}
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
                field='first'
                header='First'
                body={firstBodyTemplate}
              ></Column>
              <Column
                field='second'
                header='Second'
                body={secondBodyTemplate}
              ></Column>
              <Column
                field='third'
                header='Third'
                body={thirdBodyTemplate}
              ></Column>
              <Column
                field='fourth'
                header='Fourth'
                body={fourthBodyTemplate}
              ></Column>
              <Column
                field='fifth'
                header='Fifth'
                body={fifthBodyTemplate}
              ></Column>
              <Column
                field='ball'
                header='Ball'
                body={ballBodyTemplate}
              ></Column>
              <Column
                field='drawDate'
                header='Draw Date'
                body={drawDateBodyTemplate}
              ></Column>
            </DataTable>
          </div>
        </Page>
      )}
    </React.Fragment>
  );
}

export default WinningNumbers;
