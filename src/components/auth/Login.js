import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { compose } from "redux"
// import { connect } from "react-redux"
import { firebaseConnect } from 'react-redux-firebase'

class Login extends Component {
  static propTypes = {
    firebase: PropTypes.object.isRequired,
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
    const { firebase } = this.props
    firebase.login({ email, password }).catch(err => alert('invalid login'))
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-8 col-sm-12 col-xs-12 col-lg-6 mx-auto mt-auto">
          <div className="card">
            <div className="card-body">
              <h1 className="text-center pb-4 pt-3">
                <span className="text-primary">
                  <i className="fas fa-lock" /> Login
                </span>
              </h1>
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
                  value="Login"
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

export default firebaseConnect()(Login)
