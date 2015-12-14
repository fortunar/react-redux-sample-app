import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
    App,
    Home,
    User,
    Login,
    NotFound
  } from 'containers';

export default (store) => {

  const checkAuth = () => {
    const { auth: { token }} = store.getState();
    return token;
  };

  const requireLogin = (nextState, replaceState, cb) => {
    if (!checkAuth()) {
      replaceState(null, '/login');
    }
    cb();
  };

  const requireLogout = (nextState, replaceState, cb) => {
    if (checkAuth()) {
      replaceState(null, '/users');
    }
    cb();
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (

    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home}/>

      { /* Routes requiring login */ }
      <Route onEnter={requireLogin}>
        <Route path="users" component={User}/>
      </Route>

      { /* Routes requiring being logout */ }
      <Route onEnter={requireLogout}>
        <Route path="login" component={Login}/>
      </Route>

      { /* routes */}

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />

    </Route>
  );
};
