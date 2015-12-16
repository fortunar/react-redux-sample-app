/**
 * Created by urbanmarovt on 14/12/15.
 */
import React, { Component, PropTypes } from 'react';
import {isLoaded, load as loadUsers} from 'redux/modules/users';
import connectData from 'helpers/connectData';
import {connect} from 'react-redux';
import {LoginForm} from 'components';
import {bindActionCreators} from 'redux';
import {actions as notifActions } from 're-notif';


function fetchDataDeferred(getState, dispatch) {
  if (!isLoaded(getState())) {
    return dispatch(loadUsers());
  }
}

@connectData(null, fetchDataDeferred)
@connect(
  () => ({}),
  dispatch => bindActionCreators(notifActions, dispatch))
export default class Login extends Component {

  static propTypes = {
    users: PropTypes.array,
    notifSend: PropTypes.func.isRequired
  }

  render() {
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
