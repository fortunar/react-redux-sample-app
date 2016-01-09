
import React, { Component, PropTypes } from 'react';
import {isLoaded, load as loadTransports} from 'redux/modules/transports';
import connectData from 'helpers/connectData';
import {connect} from 'react-redux';
import * as routerActions from 'redux-router';
import {bindActionCreators} from 'redux';

import { TransportsGrid } from 'components';

function fetchDataDeferred(getState, dispatch) {
  if (!isLoaded(getState())) {
    return dispatch(loadTransports());
  }
}

@connectData(null, fetchDataDeferred)
@connect(
  state => ({
    transports: state.transports.data
  }),
  dispatch => bindActionCreators(routerActions, dispatch)
)

export default class Transports extends Component {

  static propTypes = {
    transports: PropTypes.array,
    history: PropTypes.object,
    pushState: PropTypes.func.isRequired
  }

  render() {
    const { transports, history: {pushState} } = this.props;
    console.log(this.props);
    const onTransportClick = (transportId) => {
      pushState(null, `/transports/${transportId}`, '');
    };
    return (
      <TransportsGrid transports={transports} onTransportClick={onTransportClick} />
    );
  }

}
//
