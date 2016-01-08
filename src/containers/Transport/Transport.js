/**
 * Created by urbanmarovt on 12/12/15.
 */
import React, { Component, PropTypes } from 'react';
import connectData from 'helpers/connectData';
import {connect} from 'react-redux';
import * as routerActions from 'redux-router';
import {bindActionCreators} from 'redux';
import {isOneLoaded as isTransportLoaded, loadOne as loadOneTransport} from 'redux/modules/transports';
import { TransportDetails } from 'components';

function fetchDataDeferred(getState, dispatch) {
  if (!isTransportLoaded(getState())) {
    return dispatch(loadOneTransport(getState()));
  }
}

@connectData(null, fetchDataDeferred)
@connect(
  state => ({
    transports: state.transports.data,
    error: state.transports.error
  }),
  dispatch => bindActionCreators(routerActions, dispatch)
)
export default class Transport extends Component {

  static propTypes = {
    transports: PropTypes.array,
    error: PropTypes.object,
    params: PropTypes.object
  }

  render() {
    const { transports, params } = this.props;
    const transport = transports.find(trans => {
      if (trans.idTransport == params.transportId) {
        return trans;
      }
      return false;
    });
    return (
      <TransportDetails transport={transport}/>
    );
  }

}
//
