import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, NavBrand, Nav, NavItem, CollapsibleNav } from 'react-bootstrap';
import DocumentMeta from 'react-document-meta';
import {logout as logoutAuth} from 'redux/modules/auth';
import {logout as logoutUser} from 'redux/modules/user';
import connectData from 'helpers/connectData';
import config from '../../config';
import {bindActionCreators} from 'redux';

import {isLoaded as isUserDataLoaded, load as loadUserData} from 'redux/modules/user';
import {isLoggedIn} from 'redux/modules/auth';

import {Notifs} from 're-notif';

function fetchData(getState, dispatch) {
  const promises = [];

  // TODO make this code prettier
  if (!isUserDataLoaded(getState()) && isLoggedIn(getState())) {
    promises.push(dispatch(loadUserData(getState().auth.userId)));
  }

  return Promise.all(promises);
}

@connectData(fetchData)
@connect(
  state => ({auth: state.auth,
            user: state.user}),
  dispatch => bindActionCreators({logoutAuth, logoutUser}, dispatch))
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    auth: PropTypes.object,
    user: PropTypes.object,
    logoutAuth: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    console.log('APP RENDER!');
    const styles = require('./App.scss');
    const {auth, logoutAuth, logoutUser, user} = this.props;
//  console.log(user);
//  console.log(this.props);

    const theme = {
      defaultClasses: 'alert',
      successClasses: 'alert-success',
      infoClasses: 'alert-info',
      warningClasses: 'alert-warning',
      dangerClasses: 'alert-danger'
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
              {user.name &&
              <LinkContainer to="/users">
                <NavItem eventKey={2}>{user.name} {user.surname}</NavItem>
              </LinkContainer>
              }

              {auth.userId &&
              <NavItem eventKey={2} onClick={ (event) => {event.preventDefault(); logoutAuth(); logoutUser();}}>Logout</NavItem>}


              {!auth.userId &&
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
