import newNumbersReducer from '../../shared/reducers/newNumbers';

let initialState;

beforeEach(() => {
  initialState = {
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
});

describe('--- Testing newNumbersReducer ---', () => {
  test('should set game value to what is passed in and hasErrors to false for GAME_CHANGE', () => {
    const state = newNumbersReducer(initialState, {
      type: 'GAME_CHANGE',
      value: 'P'
    });
    expect(state.game.value).toBe('P');
    expect(state.game.hasErrors).toBe(false);
  });

  test('should not set game value and hasErrors will be true if not P or M for GAME_CHANGE', () => {
    const state = newNumbersReducer(initialState, {
      type: 'GAME_CHANGE',
      value: 'Z'
    });
    expect(state.game.value).toBe('');
    expect(state.game.hasErrors).toBe(true);
  });

  test('should set first value to what is passed in and hasErrors to false for FIRST_CHANGE', () => {
    const state = newNumbersReducer(initialState, {
      type: 'FIRST_CHANGE',
      value: 12
    });
    expect(state.first.value).toBe(12);
    expect(state.first.hasErrors).toBe(false);
  });

  test('should set startDate value to what is passed in and hasErrors to false for STARTDATE_CHANGE', () => {
    const date = new Date();
    const state = newNumbersReducer(initialState, {
      type: 'STARTDATE_CHANGE',
      value: date
    });
    expect(state.startDate.value).toBe(date);
    expect(state.first.hasErrors).toBe(false);
  });

  test('should NOT set startDate value to what is passed in (invalid) and hasErrors to true for STARTDATE_CHANGE', () => {
    const date = 1;
    const state = newNumbersReducer(initialState, {
      type: 'STARTDATE_CHANGE',
      value: date
    });
    expect(state.startDate.value).toBe('');
    expect(state.startDate.hasErrors).toBe(true);
  });

  test('should load all values passed in LOAD_VALUES', () => {
    const numsPlayed = {
      game: 'M',
      first: 10,
      second: 26,
      third: 48,
      fourth: 57,
      fifth: 66,
      ball: 20,
      startDate: '2021-01-08T05:00:00.000Z',
      endDate: '2021-03-02T05:00:00.000Z'
    };
    const state = newNumbersReducer(initialState, {
      type: 'LOAD_VALUES',
      value: numsPlayed
    });
    expect(state.game.value).toBe(numsPlayed.game);
    expect(state.first.value).toBe(numsPlayed.first);
    expect(state.second.value).toBe(numsPlayed.second);
    expect(state.third.value).toBe(numsPlayed.third);
    expect(state.fourth.value).toBe(numsPlayed.fourth);
    expect(state.fifth.value).toBe(numsPlayed.fifth);
    expect(state.ball.value).toBe(numsPlayed.ball);
    expect(state.startDate.value).toEqual(new Date(numsPlayed.startDate));
    expect(state.endDate.value).toEqual(new Date(numsPlayed.endDate));
  });
});
