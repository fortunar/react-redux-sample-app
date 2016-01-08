import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as loginActions from 'redux/modules/auth/login';
import { Alert } from 'react-bootstrap';
import * as routerActions from 'redux-router';

@connect(
    (state) => ({auth: state.auth}),
    dispatch => bindActionCreators({ ...loginActions, ...routerActions}, dispatch))
@reduxForm({
  form: 'login',
  fields: ['email', 'password']
})
export default class LoginForm extends Component {

  static propTypes = {
    loginEmailPass: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    replaceState: PropTypes.func.isRequired
  };

  componentWillReceiveProps(nextProps) {

    const {replaceState} = nextProps;

    if (nextProps.auth.login.userId) {
      replaceState(null, '/');
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    const {fields: {email, password}, loginEmailPass, auth} = this.props;
    // const styles = require('./LoginForm.scss');
    return (
      <form role="form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">e-mail:</label>
            <input type="text" className="form-control" id="email" {...email} />
          </div>
          <div className="form-group">
            <label htmlFor="password">password:</label>
            <input type="password" className="form-control" id="password" {...password} />
          </div>

          {auth.login.loginError
            &&
          <Alert bsStyle="danger">
            {auth.login.loginError}
          </Alert>
          }
          <button type="button" className="btn btn-default" onClick={ () => loginEmailPass(email.value, password.value)}>Login</button>
          <button type="button" className="btn btn-default" onClick={ () => location.href = 'http://localhost:3030/login/facebook'} >
            <i className="fa fa-facebook"/> {' '} Facebook login
          </button>
          <button type="button" className="btn btn-default" onClick={ () => location.href = 'http://localhost:3030/login/google'} >
            <i className="fa fa-google"/> {' '} Google login
          </button>
      </form>
    );
  }
}
