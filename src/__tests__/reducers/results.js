import resultsReducer from '../../shared/reducers/results';

describe('--- Testing resultsReducer ---', () => {
  test('should set results and newTicketRequired into state', () => {
    const initialState = {
      results: [],
      newTicketRequired: false
    };
    const result = [
      {
        timeForNewTicket: false,
        _id: '60156d1d45d26e1e486cd6ab',
        createdAt: '2021-01-30T14:28:45.322Z',
        game: 'M',
        drawDate: '2021-01-29T05:00:00.000Z',
        numbersMatched: 0,
        ballMatched: false,
        currentWinnings: 0,
        numbersPlayedId: '6014a6af531b3910f8b2c58e',
        __v: 0
      }
    ];

    const state = resultsReducer(initialState, {
      type: 'RESULTS_LOADED',
      data: result,
      newTicketRequired: true
    });
    // console.log(state);
    expect(state.results).toEqual(result);
    expect(state.newTicketRequired).toBe(true);
  });
});
