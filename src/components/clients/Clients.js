import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import classnames from 'classnames'
//For Firebase and Redux
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

import Spinner from '../layout/Spinner'

class Clients extends Component {
  static propTypes = {
    firestore: PropTypes.object.isRequired,
    clients: PropTypes.array,
  }

  state = {
    totalOwed: null,
  }

  static getDerivedStateFromProps(props, state) {
    const { clients } = props

    if (clients) {
      const total = clients.reduce(
        (total, client) => total + parseFloat(client.balance),
        0,
      )

      return { totalOwed: total }
    }

    return null
  }

  render() {
    const { clients } = this.props

    if (clients) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <h2>
                <i className="fas fa-users" /> Clients
              </h2>
            </div>
            <div className="col-md-6">
              <h5 className="text-right text-secondary">
                Total Owed{' '}
                <span className="text-primary">
                  {parseFloat(this.state.totalOwed).toFixed(2)}
                </span>
              </h5>
            </div>
          </div>

          <table className="table table-striped">
            <thead className="thead-inverse">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Balance</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client.id}>
                  <td>
                    {client.firstname} {client.lastname}
                  </td>
                  <td>{client.email}</td>
                  <td>
                    <span
                      className={classnames({
                        'text-danger': client.balance > '0',
                        'text-success': client.balance === '0',
                      })}
                    >
                      $ {parseFloat(client.balance).toFixed(2)}
                    </span>
                  </td>
                  <td>
                    <Link
                      to={`/client/${client.id}`}
                      className="btn btn-secondary btn-sm"
                    >
                      <i className="fas fa-arrow-circle-right" /> Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    } else {
      return <Spinner />
    }
  }
}

export default compose(
  firestoreConnect([{ collection: 'clients' }]),
  connect((state, props) => ({
    clients: state.firestore.ordered.clients,
  })),
)(Clients)
