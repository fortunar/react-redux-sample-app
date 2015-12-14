import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, NavBrand, Nav, NavItem, CollapsibleNav } from 'react-bootstrap';
import DocumentMeta from 'react-document-meta';
import { logout } from 'redux/modules/auth';
import { pushState } from 'redux-router';
import connectData from 'helpers/connectData';
import config from '../../config';

import {Notifs} from 're-notif';

function fetchData() {
  const promises = [];
  /*
  if (!isInfoLoaded(getState())) {
    promises.push(dispatch(loadInfo()));
  }
  if (!isAuthLoaded(getState())) {
    promises.push(dispatch(loadAuth()));
  }
  */
  return Promise.all(promises);
}

@connectData(fetchData)
@connect(
  state => ({user: state.auth.user}),
  {logout, pushState})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login

    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState(null, '/');
    }
  }



  render() {
    const styles = require('./App.scss');
    // console.log(this.props);

    let theme = {
        defaultClasses: 'alert',
        successClasses: 'alert-success',
        infoClasses: 'alert-info',
        warningClasses: 'alert-warning',
        dangerClasses: 'alert-danger'
    }

    return (
      <div className={styles.app}>
        <DocumentMeta {...config.app}/>
        <Navbar fixedTop toggleNavKey={0}>
          <NavBrand>
            <IndexLink to="/" activeStyle={{color: '#33e0ff'}}>
              <div className={styles.brand}/>
              <span>Title</span>
            </IndexLink>
          </NavBrand>


          <CollapsibleNav eventKey={0}>
            <Nav navbar>

              <LinkContainer to="/users">
                <NavItem eventKey={2}>Users</NavItem>
              </LinkContainer>

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
