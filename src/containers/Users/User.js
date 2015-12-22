/**
 * Created by urbanmarovt on 12/12/15.
 */
import React, { Component, PropTypes } from 'react';
import { Panel, Jumbotron } from 'react-bootstrap';
import {isLoaded, load as loadUsers} from 'redux/modules/users';
import {isLoggedIn} from 'redux/modules/auth/login';
import connectData from 'helpers/connectData';
import {connect} from 'react-redux';
import * as routerActions from 'redux-router';
import {bindActionCreators} from 'redux';

function fetchDataDeferred(getState, dispatch) {
  if (!isLoaded(getState()) && isLoggedIn(getState())) {
    return dispatch(loadUsers(getState()));
  }
}

@connectData(null, fetchDataDeferred)
@connect(
  state => ({
    users: state.users.data,
    error: state.users.error
  }),
  dispatch => bindActionCreators(routerActions, dispatch)
)

export default class User extends Component {

  static propTypes = {
    users: PropTypes.array,
    error: PropTypes.object,
    replaceState: PropTypes.func.isRequired
  }

  componentWillMount() {
    const {replaceState} = this.props;

    if (this.props.error) {
      replaceState(null, '/notAuthorized');
    }

  }

  componentWillUpdate(nextProps) {
    const {replaceState} = nextProps;

    if (nextProps.error) {
      replaceState(null, '/notAuthorized');
    }

  }

  render() {
    const { users } = this.props;
    return (
     <Jumbotron>
      {
        users.map((user) =>
          <Panel>
            {user.name} {user.surname}
          </Panel>)
      }
     </Jumbotron>
    );
  }

}
//
