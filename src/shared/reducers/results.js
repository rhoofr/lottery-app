import produce from 'immer';

const resultsReducer = produce((draft, action) => {
  const { type, data, newTicketRequired } = action;

  switch (type) {
    case 'RESULTS_LOADED': {
      draft.results = data;
      draft.newTicketRequired = newTicketRequired;
      return draft;
    }
    default: {
      return draft;
    }
  }
});

export default resultsReducer;

// const resultsReducer = (draft, action) => {
//   switch (action.type) {
//     case 'RESULTS_LOADED':
//       draft.results = action.data;
//       draft.newTicketRequired = action.newTicketRequired;
//       return;
//     default:
//       return;
//   }
// };

// export default resultsReducer;
