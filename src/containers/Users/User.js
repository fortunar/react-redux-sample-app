/**
 * Created by urbanmarovt on 12/12/15.
 */
import React, { Component, PropTypes } from 'react';
import { Panel, Jumbotron } from 'react-bootstrap';
import {isLoaded, load as loadUsers} from 'redux/modules/users';
import connectData from 'helpers/connectData';
import {connect} from 'react-redux';

function fetchDataDeferred(getState, dispatch) {
  if (!isLoaded(getState())) {
    return dispatch(loadUsers(getState()));
  }
}

@connectData(null, fetchDataDeferred)
@connect(
  state => ({
    users: state.users.data
  })
)

export default class User extends Component {

  static propTypes = {
    users: PropTypes.array,
    notifSend: PropTypes.func.isRequired
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
