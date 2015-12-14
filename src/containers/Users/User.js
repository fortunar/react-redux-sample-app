/**
 * Created by urbanmarovt on 12/12/15.
 */
import React, { Component, PropTypes } from 'react';
 import { Panel, Jumbotron } from 'react-bootstrap';
 import * as usersActions from 'redux/modules/users';
 import {isLoaded, load as loadUsers} from 'redux/modules/users';
 import connectData from 'helpers/connectData';
 import {connect} from 'react-redux';
 import {LoginForm} from 'components';

import {dispatch} from 'redux';

import {bindActionCreators} from 'redux';
import {actions as notifActions } from 're-notif';


 function fetchDataDeferred(getState, dispatch) {
  if (!isLoaded(getState())) {
    return dispatch(loadUsers());
  }
 }

 @connectData(null, fetchDataDeferred)
 @connect(
  state => ({
    users: state.users.data
  }),
   dispatch => bindActionCreators(notifActions, dispatch))
export default class User extends Component {
  static propTypes = {
    users: PropTypes.array,
    notifSend: PropTypes.func.isRequired
  }


  render() {
//    const { users } = this.props;
    // const styles = require('./User.scss');
    const { notifSend} = this.props;
    return (
      <div>
        <LoginForm/>
        <button type="button" className="btn btn-default" onClick={() => notifSend({message: 'Login successful.', kind: 'success', dismissAfter: 2000})} >
          <i className="fa fa-globe"/> {' '} ToastTest
        </button>
      </div>
    );
  }
}
// <button type="button" className="btn btn-default" onClick={this.props.showAlert(this.toastContainer)} >
// <i className="fa fa-globe"/> {' '} ToastTest
// </button>
// <Jumbotron>
//  {
//    users.map((user) =>
//      <Panel>
//        {user.name} {user.surname}
//      </Panel>)
//  }
// </Jumbotron>
