const resultsReducer = (draft, action) => {
  switch (action.type) {
    case 'resultsLoaded':
      draft.results = action.data;
      draft.newTicketRequired = action.newTicketRequired;
      return;
    default:
      return;
  }
};

export default resultsReducer;
