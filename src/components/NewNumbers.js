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
import { isValidDate } from '../shared/utils/date';
import {
  numberIsValid,
  ballIsValid,
  allNumbersValid,
  datesValidForGame
} from '../shared/utils/validations';

function NewNumbers(props) {
  const toast = useRef(null);

  const initialState = {
    game: {
      value: '',
      hasErrors: false,
      message: ''
    },
    first: {
      value: '',
      hasErrors: false,
      message: ''
    },
    second: {
      value: '',
      hasErrors: false,
      message: ''
    },
    third: {
      value: '',
      hasErrors: false,
      message: ''
    },
    fourth: {
      value: '',
      hasErrors: false,
      message: ''
    },
    fifth: {
      value: '',
      hasErrors: false,
      message: ''
    },
    ball: {
      value: '',
      hasErrors: false,
      message: ''
    },
    startDate: {
      value: '',
      hasErrors: false,
      message: ''
    },
    endDate: {
      value: '',
      hasErrors: false,
      message: ''
    },
    isSaving: false,
    sendCount: 0,
    hasNumbersError: false,
    hasDateError: false
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case 'gameChange':
        if (action.value === 'P' || action.value === 'M') {
          draft.game.hasErrors = false;
        }
        draft.game.value = action.value;
        return;
      case 'firstChange':
        if (Number(action.value) > 0) {
          draft.first.hasErrors = false;
        }
        draft.first.value = action.value;
        return;
      case 'secondChange':
        if (Number(action.value) > 0) {
          draft.second.hasErrors = false;
        }
        draft.second.value = action.value;
        return;
      case 'thirdChange':
        if (Number(action.value) > 0) {
          draft.third.hasErrors = false;
        }
        draft.third.value = action.value;
        return;
      case 'fourthChange':
        if (Number(action.value) > 0) {
          draft.fourth.hasErrors = false;
        }
        draft.fourth.value = action.value;
        return;
      case 'fifthChange':
        if (Number(action.value) > 0) {
          draft.fifth.hasErrors = false;
        }
        draft.fifth.value = action.value;
        return;
      case 'ballChange':
        if (Number(action.value) > 0) {
          draft.ball.hasErrors = false;
        }
        draft.ball.value = action.value;
        return;
      case 'startDateChange':
        if (isValidDate(action.value)) {
          draft.startDate.hasErrors = false;
        }
        draft.startDate.value = action.value;
        return;
      case 'endDateChange':
        if (isValidDate(action.value)) {
          draft.endDate.hasErrors = false;
        }
        draft.endDate.value = action.value;
        return;
      case 'submitRequest':
        // console.log('entered submitRequest');
        const validDates = datesValidForGame(
          draft.game.value,
          draft.startDate.value,
          draft.endDate.value
        );

        if (!validDates) {
          draft.hasDateError = true;
        } else {
          draft.hasDateError = false;
        }

        const validNbrs = allNumbersValid([
          Number(draft.first.value),
          Number(draft.second.value),
          Number(draft.third.value),
          Number(draft.fourth.value),
          Number(draft.fifth.value)
        ]);
        if (!validNbrs) {
          draft.hasNumbersError = true;
        } else {
          draft.hasNumbersError = false;
        }

        if (draft.hasDateError || draft.hasNumbersError) return;

        if (
          !draft.game.hasErrors &&
          !draft.first.hasErrors &&
          !draft.second.hasErrors &&
          !draft.third.hasErrors &&
          !draft.fourth.hasErrors &&
          !draft.fifth.hasErrors &&
          !draft.ball.hasErrors &&
          !draft.startDate.hasErrors &&
          !draft.endDate.hasErrors
        ) {
          draft.sendCount++;
        }
        return;
      case 'createNumbersStarted':
        draft.isSaving = true;
        return;
      case 'createNumbersCompleted':
        draft.isSaving = false;
        return;
      case 'gameRules':
        if (
          !action.value.trim() ||
          (action.value !== 'P' && action.value !== 'M')
        ) {
          draft.game.hasErrors = true;
          draft.game.message = 'You must provide a Game.';
        } else {
          draft.game.hasErrors = false;
          draft.game.message = '';
        }
        return;
      case 'firstRules':
        if (
          !Number(action.value) > 0 ||
          (action.game && !numberIsValid(action.game, action.value))
        ) {
          draft.first.hasErrors = true;
          draft.first.message = 'You must provide a valid first number.';
        } else {
          draft.first.hasErrors = false;
          draft.first.message = '';
        }
        return;
      case 'secondRules':
        if (
          !Number(action.value) > 0 ||
          (action.game && !numberIsValid(action.game, action.value))
        ) {
          draft.second.hasErrors = true;
          draft.second.message = 'You must provide a valid second number.';
        } else {
          draft.second.hasErrors = false;
          draft.second.message = '';
        }
        return;
      case 'thirdRules':
        if (
          !Number(action.value) > 0 ||
          (action.game && !numberIsValid(action.game, action.value))
        ) {
          draft.third.hasErrors = true;
          draft.third.message = 'You must provide a valid third number.';
        } else {
          draft.third.hasErrors = false;
          draft.third.message = '';
        }
        return;
      case 'fourthRules':
        if (
          !Number(action.value) > 0 ||
          (action.game && !numberIsValid(action.game, action.value))
        ) {
          draft.fourth.hasErrors = true;
          draft.fourth.message = 'You must provide a valid fourth number.';
        } else {
          draft.fourth.hasErrors = false;
          draft.fourth.message = '';
        }
        return;
      case 'fifthRules':
        if (
          !Number(action.value) > 0 ||
          (action.game && !numberIsValid(action.game, action.value))
        ) {
          draft.fifth.hasErrors = true;
          draft.fifth.message = 'You must provide a valid fifth number.';
        } else {
          draft.fifth.hasErrors = false;
          draft.fifth.message = '';
        }
        return;
      case 'ballRules':
        if (
          !Number(action.value) > 0 ||
          (action.game && !ballIsValid(action.game, action.value))
        ) {
          draft.ball.hasErrors = true;
          draft.ball.message = 'You must provide a valid ball number.';
        } else {
          draft.ball.hasErrors = false;
          draft.ball.message = '';
        }
        return;
      case 'startDateRules':
        if (!isValidDate(action.value)) {
          draft.startDate.hasErrors = true;
          draft.startDate.message = 'You must provide a Start Date.';
        } else {
          draft.startDate.hasErrors = false;
          draft.startDate.message = '';
        }
        return;
      case 'endDateRules':
        if (!isValidDate(action.value)) {
          draft.endDate.hasErrors = true;
          draft.endDate.message = 'You must provide an End Date.';
        } else {
          draft.endDate.hasErrors = false;
          draft.endDate.message = '';
        }
        return;
      default:
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

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
    if (state.sendCount) {
      dispatch({ type: 'createNumbersStarted' });

      const axiosRequest = Axios.CancelToken.source();

      async function updatePost() {
        try {
          const response = await Axios.post(
            `/numbersplayed`,
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
          dispatch({ type: 'createNumbersCompleted' });
          if (response.data.success) {
            props.history.push(`/numbersplayed`);
          } else {
            return toast.current.show({
              severity: 'warn',
              summary: 'New Numbers Error',
              detail: `Error saving new numbers`,
              life: 3000
            });
          }
        } catch (error) {
          dispatch({ type: 'createNumbersCompleted' });
          console.log(
            'Error saving new numbers: ',
            error.response.data.message
          );
          return toast.current.show({
            severity: 'error',
            summary: 'New Numbers Error',
            detail: `Error saving new numbers: ${error.response.data.message}`,
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
        <Page title='Create New Numbers'>
          <Toast ref={toast} />
          <div className='card'>
            <h3 className='card__title'>ADD NEW NUMBERS</h3>
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
            <form className='mt-2' onSubmit={submitHandler}>
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

              <button
                className='btn btn-lg btn-primary'
                disabled={state.isSaving}
              >
                {state.isSaving ? 'Saving...' : 'Save Numbers'}
              </button>
            </form>
          </div>
        </Page>
      )}
    </React.Fragment>
  );
}

export default withRouter(NewNumbers);
