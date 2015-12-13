/**
 * Created by urbanmarovt on 12/12/15.
 */
import React, { Component, PropTypes } from 'react';
import { Panel, Jumbotron } from 'react-bootstrap';
import * as usersActions from 'redux/modules/users';
import {isLoaded, load as loadUsers} from 'redux/modules/users';
import connectData from 'helpers/connectData';
import {connect} from 'react-redux';


function fetchDataDeferred(getState, dispatch) {
  if (!isLoaded(getState())) {
    //console.log('LOAD');
    return dispatch(loadUsers());
  }
}

@connectData(null, fetchDataDeferred)
@connect(
  state => ({
    users: state.users.data
  }),
  {...usersActions})
export default class User extends Component {
  static propTypes = {
    users: PropTypes.array
  }
  render() {
    //console.log('Bravo');
    const { users } = this.props;
    //console.log(this.props);

    // const styles = require('./User.scss');

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