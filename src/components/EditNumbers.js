import React, { useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { useImmerReducer } from 'use-immer';
import Axios from 'axios';
import 'primeflex/primeflex.css';
import { RadioButton } from 'primereact/radiobutton';
import { Calendar } from 'primereact/calendar';
import { Message } from 'primereact/message';
import { Toast } from 'primereact/toast';

import Page from '../shared/containers/Page';
import LoadingSpinner from '../shared/components/uielements/LoadingSpinner';
import newNumbersReducer, { initialState } from '../shared/reducers/newNumbers';
import './NewNumbers.css';

function EditNumbers({
  isEditing,
  hideEditTicket,
  numbersPlayedRow,
  cardTitle
}) {
  const toast = useRef(null);

  const [state, dispatch] = useImmerReducer(newNumbersReducer, initialState);

  const submitHandler = e => {
    e.preventDefault();
    dispatch({ type: 'gameRules', value: state.game.value });
    dispatch({
      type: 'firstRules',
      value: state.first.value,
      game: state.game.value
    });
    dispatch({
      type: 'secondRules',
      value: state.second.value,
      game: state.game.value
    });
    dispatch({
      type: 'thirdRules',
      value: state.third.value,
      game: state.game.value
    });
    dispatch({
      type: 'fourthRules',
      value: state.fourth.value,
      game: state.game.value
    });
    dispatch({
      type: 'fifthRules',
      value: state.fifth.value,
      game: state.game.value
    });
    dispatch({
      type: 'ballRules',
      value: state.ball.value,
      game: state.game.value
    });
    dispatch({ type: 'startDateRules', value: state.startDate.value });
    dispatch({ type: 'endDateRules', value: state.endDate.value });
    dispatch({ type: 'submitRequest' });
  };

  useEffect(() => {
    if (isEditing) {
      dispatch({
        type: 'loadValues',
        value: numbersPlayedRow
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (state.sendCount) {
      dispatch({ type: 'createNumbersStarted' });

      const axiosRequest = Axios.CancelToken.source();

      async function updatePost() {
        try {
          const response = await Axios.patch(
            `/numbersplayed/${numbersPlayedRow._id}`,
            {
              game: state.game.value,
              first: state.first.value,
              second: state.second.value,
              third: state.third.value,
              fourth: state.fourth.value,
              fifth: state.fifth.value,
              ball: state.ball.value,
              startDate: state.startDate.value,
              endDate: state.endDate.value
            },
            {
              cancelToken: axiosRequest.token
            }
          );
          if (response.data.success) {
            // props.history.push(`/numbersplayed`);
            return hideEditTicket();
          } else {
            return toast.current.show({
              severity: 'warn',
              summary: 'Edit Numbers Error',
              detail: `Error saving edited ticket`,
              life: 3000
            });
          }
        } catch (error) {
          console.log(
            'Error saving new numbers: ',
            error.response.data.message
          );
          return toast.current.show({
            severity: 'error',
            summary: 'Edit Numbers Error',
            detail: `Error saving edited ticket: ${error.response.data.message}`,
            life: 3000
          });
        }
      }
      updatePost();
      // Cleanup
      return () => {
        axiosRequest.cancel();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.sendCount]);

  return (
    <React.Fragment>
      {state.isSaving && (
        <div className='center'>
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!state.isSaving && (
        <Page title='Create New Numbers' isEditing={isEditing ? true : false}>
          <Toast ref={toast} />
          <div className='card' id={isEditing ? 'edit__numbers' : ''}>
            <h3
              className='card__title'
              id={isEditing ? 'edit__card--title' : ''}
            >
              {cardTitle || 'ADD NEW TICKET'}
            </h3>
            {state.hasNumbersError ? (
              <Message
                severity='error'
                text='Numbers must be greater than zero and from lowest to highest'
              ></Message>
            ) : null}
            {state.hasDateError ? (
              <Message
                severity='error'
                text='Date(s) are invalid for lottery type'
              ></Message>
            ) : null}
            <form className='mt-2'>
              <div className='form-group'>
                <h5>Choose Game</h5>
                <div className='p-formgroup-inline'>
                  <div className='p-field-checkbox'>
                    <RadioButton
                      inputId='game1'
                      name='game'
                      value='M'
                      onChange={e =>
                        dispatch({ type: 'gameChange', value: e.target.value })
                      }
                      checked={state.game.value === 'M'}
                    />
                    <label htmlFor='game1'>Mega Millions</label>
                  </div>
                  <div className='p-field-checkbox'>
                    <RadioButton
                      inputId='game2'
                      name='game'
                      value='P'
                      onChange={e =>
                        dispatch({ type: 'gameChange', value: e.target.value })
                      }
                      checked={state.game.value === 'P'}
                    />
                    <label htmlFor='game2'>Powerball</label>
                  </div>
                  {state.game.hasErrors && (
                    <div className='alert alert-danger small liveValidateMessage'>
                      {state.game.message}
                    </div>
                  )}
                </div>
              </div>

              <div className='p-fluid p-formgrid p-grid'>
                <div className='p-field p-col'>
                  <label htmlFor='post-first' className='text-muted mb-1'>
                    First number
                  </label>
                  <input
                    onChange={e =>
                      dispatch({ type: 'firstChange', value: e.target.value })
                    }
                    onBlur={e =>
                      dispatch({
                        type: 'firstRules',
                        value: e.target.value,
                        game: state.game.value
                      })
                    }
                    name='first'
                    value={state.first.value}
                    id='post-first'
                    className='form-control form-control-lg form-control-first'
                    type='number'
                    placeholder=''
                    autoComplete='off'
                  />
                  {state.first.hasErrors && (
                    <div className='alert alert-danger small liveValidateMessage'>
                      {state.first.message}
                    </div>
                  )}
                </div>
                <div className='p-field p-col'>
                  <label htmlFor='post-second' className='text-muted mb-1'>
                    Second number
                  </label>
                  <input
                    onChange={e =>
                      dispatch({ type: 'secondChange', value: e.target.value })
                    }
                    onBlur={e =>
                      dispatch({
                        type: 'secondRules',
                        value: e.target.value,
                        game: state.game.value
                      })
                    }
                    name='second'
                    value={state.second.value}
                    id='post-second'
                    className='form-control form-control-lg form-control-second'
                    type='number'
                    placeholder=''
                    autoComplete='off'
                  />
                  {state.second.hasErrors && (
                    <div className='alert alert-danger small liveValidateMessage'>
                      {state.second.message}
                    </div>
                  )}
                </div>
              </div>

              <div className='p-fluid p-formgrid p-grid'>
                <div className='p-field p-col'>
                  <label htmlFor='post-third' className='text-muted mb-1'>
                    Third number
                  </label>
                  <input
                    onChange={e =>
                      dispatch({ type: 'thirdChange', value: e.target.value })
                    }
                    onBlur={e =>
                      dispatch({
                        type: 'thirdRules',
                        value: e.target.value,
                        game: state.game.value
                      })
                    }
                    name='third'
                    value={state.third.value}
                    id='post-third'
                    className='form-control form-control-lg form-control-third'
                    type='number'
                    placeholder=''
                    autoComplete='off'
                  />
                  {state.third.hasErrors && (
                    <div className='alert alert-danger small liveValidateMessage'>
                      {state.third.message}
                    </div>
                  )}
                </div>
                <div className='p-field p-col'>
                  <label htmlFor='post-fourth' className='text-muted mb-1'>
                    Fourth number
                  </label>
                  <input
                    onChange={e =>
                      dispatch({ type: 'fourthChange', value: e.target.value })
                    }
                    onBlur={e =>
                      dispatch({
                        type: 'fourthRules',
                        value: e.target.value,
                        game: state.game.value
                      })
                    }
                    name='fourth'
                    value={state.fourth.value}
                    id='post-fourth'
                    className='form-control form-control-lg form-control-fourth'
                    type='number'
                    placeholder=''
                    autoComplete='off'
                  />
                  {state.fourth.hasErrors && (
                    <div className='alert alert-danger small liveValidateMessage'>
                      {state.fourth.message}
                    </div>
                  )}
                </div>
              </div>

              <div className='p-fluid p-formgrid p-grid'>
                <div className='p-field p-col'>
                  <label htmlFor='post-fifth' className='text-muted mb-1'>
                    Fifth number
                  </label>
                  <input
                    onChange={e =>
                      dispatch({ type: 'fifthChange', value: e.target.value })
                    }
                    onBlur={e =>
                      dispatch({
                        type: 'fifthRules',
                        value: e.target.value,
                        game: state.game.value
                      })
                    }
                    name='fifth'
                    value={state.fifth.value}
                    id='post-fifth'
                    className='form-control form-control-lg form-control-fifth'
                    type='number'
                    placeholder=''
                    autoComplete='off'
                  />
                  {state.fifth.hasErrors && (
                    <div className='alert alert-danger small liveValidateMessage'>
                      {state.fifth.message}
                    </div>
                  )}
                </div>
                <div className='p-field p-col'>
                  <label htmlFor='post-ball' className='text-muted mb-1'>
                    Ball number
                  </label>
                  <input
                    onChange={e =>
                      dispatch({ type: 'ballChange', value: e.target.value })
                    }
                    onBlur={e =>
                      dispatch({
                        type: 'ballRules',
                        value: e.target.value,
                        game: state.game.value
                      })
                    }
                    name='ball'
                    value={state.ball.value}
                    id='post-ball'
                    className='form-control form-control-lg form-control-ball'
                    type='number'
                    placeholder=''
                    autoComplete='off'
                  />
                  {state.ball.hasErrors && (
                    <div className='alert alert-danger small liveValidateMessage'>
                      {state.ball.message}
                    </div>
                  )}
                </div>
              </div>

              <div className='p-fluid p-formgrid p-grid'>
                <div className='p-field p-col'>
                  <label htmlFor='startDate'>Start Date</label>
                  <Calendar
                    id='startDate'
                    value={state.startDate.value}
                    onChange={e =>
                      dispatch({
                        type: 'startDateChange',
                        value: e.target.value
                      })
                    }
                    onBlur={e =>
                      dispatch({
                        type: 'startDateRules',
                        value: e.target.value,
                        startDate: state.startDate.value
                      })
                    }
                    showIcon
                  />
                </div>
                {state.startDate.hasErrors && (
                  <div className='alert alert-danger small liveValidateMessage'>
                    {state.startDate.message}
                  </div>
                )}
                <div className='p-field p-col'>
                  <label htmlFor='endDate'>End Date</label>
                  <Calendar
                    id='endDate'
                    value={state.endDate.value}
                    onChange={e =>
                      dispatch({ type: 'endDateChange', value: e.target.value })
                    }
                    onBlur={e =>
                      dispatch({
                        type: 'endDateRules',
                        value: e.target.value,
                        endDate: state.endDate.value
                      })
                    }
                    showIcon
                  />
                </div>
                {state.endDate.hasErrors && (
                  <div className='alert alert-danger small liveValidateMessage'>
                    {state.endDate.message}
                  </div>
                )}
              </div>

              {isEditing && (
                <button
                  className='btn btn-lg btn-primary'
                  disabled={state.isSaving}
                  id='form-save'
                  onClick={submitHandler}
                >
                  {state.isSaving ? 'Saving...' : 'Save Ticket'}
                </button>
              )}
            </form>
          </div>
        </Page>
      )}
    </React.Fragment>
  );
}

export default withRouter(EditNumbers);
