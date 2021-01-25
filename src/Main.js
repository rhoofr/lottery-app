import React, { Suspense } from 'react';
import { useImmerReducer } from 'use-immer';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Axios from 'axios';

import MainNavigation from './shared/components/navigation/MainNavigation';
import StateContext from './shared/context/StateContext';
import DispatchContext from './shared/context/DispatchContext';
import LoadingSpinner from './shared/components/uielements/LoadingSpinner';
import Results from './components/Results';
import NumbersPlayed from './components/NumbersPlayed';
import WinningNumbers from './components/WinningNumbers';
import NewNumbers from './components/NewNumbers';
import CheckResults from './components/CheckResults';
import UpcomingJackpots from './components/UpcomingJackpots';
import Footer from './shared/components/navigation/Footer';
import NotFound from './components/NotFound';

Axios.defaults.baseURL =
  process.env.REACT_APP_BASE_BACKENDURL ||
  'http://localhost:5000/api/v1/lottery';

function Main() {
  const initialState = {
    results: [],
    newTicketRequired: false
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case 'resultsLoaded':
        draft.results = action.data;
        draft.newTicketRequired = action.newTicketRequired;
        return;
      default:
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <MainNavigation />
          <Suspense fallback={<LoadingSpinner />}>
            <Switch>
              <Route path='/' exact>
                <Results />
              </Route>
              <Route path='/numbersplayed'>
                <NumbersPlayed />
              </Route>
              <Route path='/winningnumbers'>
                <WinningNumbers />
              </Route>
              <Route path='/newnumbers'>
                <NewNumbers />
              </Route>
              <Route path='/checkresults'>
                <CheckResults />
              </Route>
              <Route path='/upcoming'>
                <UpcomingJackpots />
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </Suspense>
          <Footer />
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}
export default Main;
