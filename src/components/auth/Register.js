import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { notifyUser } from '../../actions/notifyActions'
import { firebaseConnect } from 'react-redux-firebase'
import Alert from '../layout/Alert'

class Register extends Component {
  static propTypes = {
    firebase: PropTypes.object.isRequired,
    notify: PropTypes.object.isRequired,
    notifyUser: PropTypes.func.isRequired,
  }

  state = {
    email: '',
    password: '',
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  onSubmit = e => {
    e.preventDefault()
    const { email, password } = this.state
    const { firebase, notifyUser } = this.props

    //Register User
    firebase
      .createUser({ email, password })
      .catch(err => notifyUser('That user already exists', 'danger'))
    // firebase
    //   .login({ email, password })
    //   .catch(err => notifyUser('invalid login', 'danger'))
  }

  componentWillMount() {
    const { allowRegistration } = this.props.settings
    if (!allowRegistration) {
      this.props.history.push('/')
    }
  }

  render() {
    const { message, messageType } = this.props.notify
    return (
      <div className="row">
        <div className="col-md-8 col-sm-12 col-xs-12 col-lg-6 mx-auto">
          <div className="card">
            <div className="card-body">
              <h1 className="text-center pb-4 pt-3">
                <span className="text-primary">
                  <i className="fas fa-lock" /> Register
                </span>
              </h1>
              {message ? (
                <Alert message={message} messageType={messageType} />
              ) : null}
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    required
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    required
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Register"
                  className="btn btn-primary btn-block"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default compose(
  firebaseConnect({}),
  connect(
    (state, props) => ({
      notify: state.notify,
      settings: state.settings,
    }),
    { notifyUser },
  ),
)(Register)