import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';


@connect(
    () => ({}),
    dispatch => bindActionCreators({}, dispatch))
@reduxForm({
  form: 'login',
  fields: ['username', 'password']
})
export default class LoginForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    // const styles = require('./LoginForm.scss');
    return (
      <form role="form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">e-mail:</label>
            <input type="text" className="form-control" id="email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">password:</label>
            <input type="text" className="form-control" id="password" />
          </div>
          <button className="btn btn-default">Login</button>
          <button className="btn btn-default" >
            <i className="fa fa-facebook"/> {' '} Facebook login
          </button>
          <button className="btn btn-default" >
            <i className="fa fa-google"/> {' '} Google login
          </button>
      </form>
    );
  }
}
