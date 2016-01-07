import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, NavBrand, Nav, NavItem, CollapsibleNav } from 'react-bootstrap';
import DocumentMeta from 'react-document-meta';
import * as authActions from 'redux/modules/auth/auth';
import connectData from 'helpers/connectData';
import config from '../../config';
import {bindActionCreators} from 'redux';

import {isLoaded as isUserDataLoaded, load as loadUserData} from 'redux/modules/auth/user';
import {isLoggedIn} from 'redux/modules/auth/login';

import {Notifs} from 're-notif';
import {actions as notifActions } from 're-notif';

function fetchData(getState, dispatch) {
  const promises = [];

  // TODO make this code prettier
  if (!isUserDataLoaded(getState()) && isLoggedIn(getState())) {
    promises.push(dispatch(loadUserData(getState().auth.login.userId)));
  }

  return Promise.all(promises);
}

@connectData(fetchData)
@connect(
  state => ({login: state.auth.login,
            user: state.auth.user}),
  dispatch => bindActionCreators({...authActions, ...notifActions }, dispatch))
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    login: PropTypes.object,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    notifSend: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };


  render() {
//    console.log('APP RENDER!');
    const styles = require('./App.scss');
    const {login, logout, user, notifSend} = this.props;
//  console.log(user);
//  console.log(this.props);

    const theme = {
      defaultClasses: 'alert',
      successClasses: 'alert-success',
      infoClasses: 'alert-info',
      warningClasses: 'alert-warning',
      dangerClasses: 'alert-danger'
    };

    const handleLogoutClick = (event) => {
      event.preventDefault();
      logout();
      notifSend({message: 'Logged out.', kind: 'warning', dismissAfter: 2000});
    };

    return (
      <div className={styles.app}>
        <DocumentMeta {...config.app}/>
        <Navbar fixedTop toggleNavKey={0}>
          <NavBrand>
            <IndexLink to="/" activeStyle={{color: '#33e0ff'}}>
              <div className={styles.brand}/>
              <span>AroundSlo</span>
            </IndexLink>
          </NavBrand>

          <CollapsibleNav eventKey={0}>

            <Nav navbar right>
              {user &&
              <LinkContainer to="/users">
                <NavItem eventKey={2}>{user.name} {user.surname}</NavItem>
              </LinkContainer>
              }

              {login.userId &&
              <NavItem eventKey={2} onClick={ (event) => {handleLogoutClick(event); }}>Logout</NavItem>}


              {!login.userId &&
              <LinkContainer to="/login">
                <NavItem eventKey={2}>Login</NavItem>
              </LinkContainer>}

            </Nav>

          </CollapsibleNav>
        </Navbar>

        <div className={styles.appContent}>
        <div className={styles.notifContainer}>
          <Notifs theme={theme}/>
        </div>
          {this.props.children}
        </div>

      </div>
    );
  }
}
