import React, { Suspense } from 'react';
import { useImmerReducer } from 'use-immer';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Axios from 'axios';

import resultsReducer from './shared/reducers/results';
import MainNavigation from './shared/components/navigation/MainNavigation';
import StateContext from './shared/context/StateContext';
import DispatchContext from './shared/context/DispatchContext';
import LoadingSpinner from './shared/components/uielements/LoadingSpinner';
import Results from './components/Results';
import Footer from './shared/components/navigation/Footer';
import NotFound from './components/NotFound';

const NumbersPlayed = React.lazy(() => import('./components/NumbersPlayed'));
const WinningNumbers = React.lazy(() => import('./components/WinningNumbers'));
const NewNumbers = React.lazy(() => import('./components/NewNumbers'));
const CheckResults = React.lazy(() => import('./components/CheckResults'));
const UpcomingJackpots = React.lazy(() =>
  import('./components/UpcomingJackpots')
);

Axios.defaults.baseURL =
  process.env.REACT_APP_BASE_BACKENDURL ||
  'http://localhost:5000/api/v1/lottery';

Axios.defaults.headers = { 'Content-type': 'application/json' };

function Main() {
  const initialState = {
    results: [],
    newTicketRequired: false
  };

  const [state, dispatch] = useImmerReducer(resultsReducer, initialState);

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
              <Route path='/upcoming'>
                <UpcomingJackpots />
              </Route>
              <Route path='/checkresults'>
                <CheckResults />
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
