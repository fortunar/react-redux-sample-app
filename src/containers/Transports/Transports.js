
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
    transports: PropTypes.array
  }

  componentDidMount() {
    console.log('Transports loaded.');
  }


  render() {
    const { transports } = this.props;
    return (
      <TransportsGrid transports={transports} />
    );
  }

}
//
