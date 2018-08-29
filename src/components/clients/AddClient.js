import React, { Component } from 'react'
import { Link } from 'react-router-dom'

//For Firebase and Redux
import PropTypes from 'prop-types'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'

class AddClient extends Component {
  static propTypes = {
    firestore: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
  }

  state = {
    email: '',
    firstname: '',
    lastname: '',
    phone: '',
    balance: '',
  }

  onSubmit = e => {
    e.preventDefault()
    const newClient = this.state
    if (newClient.balance === '') {
      newClient.balance = '0'
    }
    const { firestore } = this.props
    firestore
      .add({ collection: 'clients' }, newClient)
      .then(() => this.props.history.push('/'))
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { disableBalanceOnAdd } = this.props.settings
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left" /> Back to Dashboard
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-header">Add Client</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="firstname">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstname"
                  minLength="2"
                  required
                  value={this.state.firstname}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastname">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastname"
                  minLength="2"
                  required
                  value={this.state.lastname}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  minLength="2"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="phone"
                  className="form-control"
                  name="phone"
                  minLength="2"
                  required
                  value={this.state.phone}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="balance">Balance</label>
                <input
                  type="text"
                  className="form-control"
                  name="balance"
                  value={this.state.balance}
                  onChange={this.onChange}
                  disabled={disableBalanceOnAdd}
                />
              </div>
              <input
                type="submit"
                value="submit"
                className="btn btn-primary btn-block"
              />
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  settings: state.settings,
})

export default compose(
  firestoreConnect(),
  connect(mapStateToProps),
)(AddClient)
