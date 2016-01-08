import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
    App,
    User,
    Login,
    Transport,
    Transports,
    NotFound,
    NotAuthorized
  } from 'containers';

export default (store) => {

  const checkAuth = () => {
    const { auth: { login: { token } } } = store.getState();
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
      <IndexRoute component={Transports}/>

      <Route>
        <Route path="transports/:transportId" component={Transport}/>
      </Route>

      { /* Routes requiring login */ }
      <Route onEnter={requireLogin}>
        <Route path="user" component={User}/>
      </Route>


      { /* Routes requiring being logout */ }
      <Route onEnter={requireLogout}>
        <Route path="login" component={Login}/>
      </Route>

      { /* not authorized */ }
      <Route path="/notAuthorized" component={NotAuthorized} status={401} />

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />

    </Route>
  );
};
