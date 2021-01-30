import { isValidDate } from '../utils/date';
import {
  numberIsValid,
  ballIsValid,
  allNumbersValid,
  datesValidForGame
} from '../utils/validations';

export const initialState = {
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
  hasDateError: false,
  displayConfirmation: false
};

const newNumbersReducer = (draft, action) => {
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
    case 'deleteNumberStarted':
      draft.isSaving = true;
      return;
    case 'createNumbersCompleted':
    case 'deleteNumbersCompleted':
      draft.isSaving = false;
      return;
    case 'gameRules':
      if (
        !action.value.trim() ||
        (action.value !== 'P' && action.value !== 'M')
      ) {
        draft.game.hasErrors = true;
        draft.game.message = 'Provide a Game.';
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
        draft.first.message = 'Provide a valid first number.';
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
        draft.second.message = 'Provide a valid second number.';
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
        draft.third.message = 'Provide a valid third number.';
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
        draft.fourth.message = 'Provide a valid fourth number.';
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
        draft.fifth.message = 'Provide a valid fifth number.';
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
        draft.ball.message = 'Provide a valid ball number.';
      } else {
        draft.ball.hasErrors = false;
        draft.ball.message = '';
      }
      return;
    case 'startDateRules':
      if (!isValidDate(action.value)) {
        draft.startDate.hasErrors = true;
        draft.startDate.message = 'Provide a Start Date.';
      } else {
        draft.startDate.hasErrors = false;
        draft.startDate.message = '';
      }
      return;
    case 'endDateRules':
      if (!isValidDate(action.value)) {
        draft.endDate.hasErrors = true;
        draft.endDate.message = 'Provide an End Date.';
      } else {
        draft.endDate.hasErrors = false;
        draft.endDate.message = '';
      }
      return;
    case 'loadValues':
      // console.log(action.value);
      draft.game.value = action.value.game;
      draft.first.value = action.value.first;
      draft.second.value = action.value.second;
      draft.third.value = action.value.third;
      draft.fourth.value = action.value.fourth;
      draft.fifth.value = action.value.fifth;
      draft.ball.value = action.value.ball;
      draft.startDate.value = new Date(action.value.startDate);
      draft.endDate.value = new Date(action.value.endDate);
      return;
    case 'showDisplayConfirmation':
      draft.displayConfirmation = action.value;
      return;
    default:
      return;
  }
};

export default newNumbersReducer;
