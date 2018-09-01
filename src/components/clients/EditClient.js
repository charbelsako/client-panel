import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
//For Firebase and Redux
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
// //Loading gif
import Spinner from '../layout/Spinner'

class EditClient extends Component {
  constructor(props) {
    super(props)

    this.firstnameInput = React.createRef()
    this.lastnameInput = React.createRef()
    this.phoneInput = React.createRef()
    this.emailInput = React.createRef()
    this.balanceInput = React.createRef()
  }

  static propTypes = {
    firestore: PropTypes.object.isRequired,
  }

  onSubmit = e => {
    const { client, firestore, history } = this.props

    const updClient = {
      firstname: this.firstnameInput.current.value,
      lastname: this.lastnameInput.current.value,
      phone: this.phoneInput.current.value,
      email: this.emailInput.current.value,
      balance:
        this.balanceInput.current.value === ''
          ? 0
          : this.balanceInput.current.value,
    }

    firestore
      .update({ collection: 'clients', doc: client.id }, updClient)
      .then(history.push('/'))
  }

  render() {
    const { client } = this.props
    const { disableBalanceOnEdit } = this.props.settings
    if (client) {
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
                    ref={this.firstnameInput}
                    defaultValue={client.firstname}
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
                    ref={this.lastnameInput}
                    defaultValue={client.lastname}
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
                    required
                    ref={this.emailInput}
                    defaultValue={client.email}
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
                    ref={this.phoneInput}
                    defaultValue={client.phone}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="balance">Balance</label>
                  <input
                    type="text"
                    className="form-control"
                    name="balance"
                    ref={this.balanceInput}
                    defaultValue={client.balance}
                    onChange={this.onChange}
                    disabled={disableBalanceOnEdit}
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
    } else {
      return <Spinner />
    }
  }
}

export default compose(
  firestoreConnect(props => [
    { collection: 'clients', storeAs: 'client', doc: props.match.params.id },
  ]),
  connect(({ firestore: { ordered }, settings }, props) => ({
    client: ordered.client && ordered.client[0],
    settings: settings,
  })),
)(EditClient)
