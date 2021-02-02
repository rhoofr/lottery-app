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
    case 'GAME_CHANGE':
      if (action.value === 'P' || action.value === 'M') {
        draft.game.hasErrors = false;
        draft.game.value = action.value;
      } else {
        draft.game.hasErrors = true;
      }
      return draft;
    case 'FIRST_CHANGE':
      if (Number(action.value) > 0) {
        draft.first.hasErrors = false;
      }
      draft.first.value = action.value;
      return draft;
    case 'SECOND_CHANGE':
      if (Number(action.value) > 0) {
        draft.second.hasErrors = false;
      }
      draft.second.value = action.value;
      return draft;
    case 'THIRD_CHANGE':
      if (Number(action.value) > 0) {
        draft.third.hasErrors = false;
      }
      draft.third.value = action.value;
      return draft;
    case 'FOURTH_CHANGE':
      if (Number(action.value) > 0) {
        draft.fourth.hasErrors = false;
      }
      draft.fourth.value = action.value;
      return draft;
    case 'FIFTH_CHANGE':
      if (Number(action.value) > 0) {
        draft.fifth.hasErrors = false;
      }
      draft.fifth.value = action.value;
      return draft;
    case 'BALL_CHANGE':
      if (Number(action.value) > 0) {
        draft.ball.hasErrors = false;
      }
      draft.ball.value = action.value;
      return draft;
    case 'STARTDATE_CHANGE':
      if (isValidDate(action.value)) {
        draft.startDate.hasErrors = false;
        draft.startDate.value = action.value;
      } else {
        draft.startDate.hasErrors = true;
      }
      return draft;
    case 'ENDDATE_CHANGE':
      if (isValidDate(action.value)) {
        draft.endDate.hasErrors = false;
        draft.endDate.value = action.value;
      } else {
        draft.startDate.hasErrors = true;
      }
      return draft;
    case 'SUBMIT_REQUEST':
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
    case 'CREATE_NUMBERS_STARTED':
      draft.isSaving = true;
      return;
    case 'CREATE_NUMBERS_COMPLETED':
      draft.isSaving = false;
      return;
    case 'GAME_RULES':
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
    case 'FIRST_RULES':
      if (
        Number(action.value) <= 0 ||
        (action.game && !numberIsValid(action.game, action.value))
      ) {
        draft.first.hasErrors = true;
        draft.first.message = 'Provide a valid first number.';
      } else {
        draft.first.hasErrors = false;
        draft.first.message = '';
      }
      return;
    case 'SECOND_RULES':
      if (
        Number(action.value) <= 0 ||
        (action.game && !numberIsValid(action.game, action.value))
      ) {
        draft.second.hasErrors = true;
        draft.second.message = 'Provide a valid second number.';
      } else {
        draft.second.hasErrors = false;
        draft.second.message = '';
      }
      return;
    case 'THIRD_RULES':
      if (
        Number(action.value) <= 0 ||
        (action.game && !numberIsValid(action.game, action.value))
      ) {
        draft.third.hasErrors = true;
        draft.third.message = 'Provide a valid third number.';
      } else {
        draft.third.hasErrors = false;
        draft.third.message = '';
      }
      return;
    case 'FOURTH_RULES':
      if (
        Number(action.value) <= 0 ||
        (action.game && !numberIsValid(action.game, action.value))
      ) {
        draft.fourth.hasErrors = true;
        draft.fourth.message = 'Provide a valid fourth number.';
      } else {
        draft.fourth.hasErrors = false;
        draft.fourth.message = '';
      }
      return;
    case 'FIFTH_RULES':
      if (
        Number(action.value) <= 0 ||
        (action.game && !numberIsValid(action.game, action.value))
      ) {
        draft.fifth.hasErrors = true;
        draft.fifth.message = 'Provide a valid fifth number.';
      } else {
        draft.fifth.hasErrors = false;
        draft.fifth.message = '';
      }
      return;
    case 'BALL_RULES':
      if (
        Number(action.value) <= 0 ||
        (action.game && !ballIsValid(action.game, action.value))
      ) {
        draft.ball.hasErrors = true;
        draft.ball.message = 'Provide a valid ball number.';
      } else {
        draft.ball.hasErrors = false;
        draft.ball.message = '';
      }
      return;
    case 'STARTDATE_RULES':
      if (!isValidDate(action.value)) {
        draft.startDate.hasErrors = true;
        draft.startDate.message = 'Provide a Start Date.';
      } else {
        draft.startDate.hasErrors = false;
        draft.startDate.message = '';
      }
      return;
    case 'ENDDATE_RULES':
      if (!isValidDate(action.value)) {
        draft.endDate.hasErrors = true;
        draft.endDate.message = 'Provide an End Date.';
      } else {
        draft.endDate.hasErrors = false;
        draft.endDate.message = '';
      }
      return;
    case 'LOAD_VALUES':
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
      return draft;
    default:
      return;
  }
};

export default newNumbersReducer;
