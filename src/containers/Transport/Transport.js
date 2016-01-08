/**
 * Created by urbanmarovt on 12/12/15.
 */
import React, { Component, PropTypes } from 'react';
import { Panel, Jumbotron } from 'react-bootstrap';
import connectData from 'helpers/connectData';
import {connect} from 'react-redux';
import * as routerActions from 'redux-router';
import {bindActionCreators} from 'redux';
import {isOneLoaded as isTransportLoaded, loadOne as loadOneTransport} from 'redux/modules/transports'

function fetchDataDeferred(getState, dispatch) {
  if (!isTransportLoaded(getState())) {
    return dispatch(loadOneTransport(getState()));
  }
}

@connectData(null, fetchDataDeferred)
@connect(
  state => ({
    transports: state.transports.data,
    error: state.users.error
  }),
  dispatch => bindActionCreators(routerActions, dispatch)
)
export default class Transport extends Component {

  static propTypes = {
    transports: PropTypes.array,
    error: PropTypes.object,
  }

  render() {
    const { transports, params: {transportId} } = this.props;
    return (
      <Jumbotron>
        {
          transports.map((transport) =>
            <Panel>
              {transport.vehicleDesc} {transport.additionalInfo}
            </Panel>)
        }
      </Jumbotron>
    );
  }

}
//
