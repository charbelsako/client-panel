import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'
import { Link } from 'react-router-dom'

//For Firebase and Redux
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

import Spinner from '../layout/Spinner'

class ClientDetails extends Component {
  static propTypes = {
    firestore: PropTypes.object.isRequired,
  }

  state = {
    showBalanceUpdate: false,
    balanceUpdateAmount: '',
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value })

  balanceSubmit = e => {
    e.preventDefault()

    const { client, firestore } = this.props
    const { balanceUpdateAmount } = this.state
    //What to update
    const clientUpdate = {
      balance: parseFloat(balanceUpdateAmount),
    }
    //update the database
    firestore.update({ collection: 'clients', doc: client.id }, clientUpdate)
  }

  onDeleteClick = () => {
    //Add a toast as a notification
    const { client, firestore, history } = this.props
    firestore
      .delete({ collection: 'clients', doc: client.id })
      .then(history.push('/'))
  }

  render() {
    const { client } = this.props
    const { showBalanceUpdate, balanceUpdateAmount } = this.state

    let balanceForm = ''
    if (showBalanceUpdate) {
      balanceForm = (
        <form onSubmit={this.balanceSubmit}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              name="balanceUpdateAmount"
              placeholder="Enter Balance"
              value={balanceUpdateAmount}
              onChange={this.onChange}
            />
            <div className="input-group-append">
              <input
                type="submit"
                value="Update"
                className="btn btn-outline-dark"
              />
            </div>
          </div>
        </form>
      )
    } else {
      balanceForm = ''
    }

    if (client) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6 col-sm-6 col-6">
              <Link to="/" className="btn btn-link">
                <i className="fas fa-arrow-circle-left" /> Back to Dashboard
              </Link>
            </div>
            <div className="col-md-6 col-sm-6 col-6">
              <div className="btn-group float-right">
                <Link to={`/client/edit/${client.id}`} className="btn btn-dark">
                  Edit
                </Link>
                <button onClick={this.onDeleteClick} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
          </div>
          <hr />
          <div className="card">
            <div className="card-header">
              {client.firstname} {client.lastname}
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 col-sm-12 col-12">
                  <h5>
                    Client ID:{' '}
                    <span className="text-secondary">{client.id}</span>
                  </h5>
                </div>
                <div className="col-md-4 col-sm-12">
                  <h4 className="pull-right">
                    Balance:
                    <span
                      className={classnames({
                        'text-danger': client.balance > 0,
                        'text-success': Number(client.balance) === 0,
                      })}
                    >
                      {' '}
                      ${parseFloat(client.balance).toFixed(2)}{' '}
                    </span>
                    <small>
                      <a
                        href="#!"
                        onClick={() =>
                          this.setState({
                            showBalanceUpdate: !this.state.showBalanceUpdate,
                          })
                        }
                      >
                        <i className="fas fa-pencil-alt" />
                      </a>
                    </small>
                  </h4>
                  {/* BALANCE FORM */}
                  {balanceForm}
                </div>
              </div>
              <hr />
              <ul className="list-group">
                <li className="list-group-item">
                  Contact Email: {client.email}
                </li>
                <li className="list-group-item">
                  Contact Phone: {client.phone}
                </li>
              </ul>
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
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0],
  })),
)(ClientDetails)
