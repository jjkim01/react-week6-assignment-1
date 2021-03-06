import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import {
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import {
  loadInitialData,
} from './actions';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import RestaurantsPage from './pages/RestaurantsPage';
import NotFoundPage from './pages/NotFoundPage';
import RestaurantDetailPage from './pages/RestaurantDetailPage';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadInitialData());
  });

  return (
    <div>
      <header>
        <h1>
          <Link to="/">헤더</Link>
        </h1>
      </header>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/restaurants/:id" component={RestaurantDetailPage} />
        <Route path="/restaurants" component={RestaurantsPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}
