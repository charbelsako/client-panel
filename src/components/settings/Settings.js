import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import {
  setAllowRegistration,
  setDisableBalanceOnAdd,
  setDisableBalanceOnEdit
} from '../../actions/settingsActions'
import Spinner from '../layout/Spinner'

class Settings extends Component {
  componentDidMount() {
    this.props.firestore.get({
      collection: 'users',
      where: ['email', '==', this.props.email]
    })
  }

  disableBalanceOnAddChange = () => {
    const { setDisableBalanceOnAdd } = this.props
    setDisableBalanceOnAdd()
  }

  disableBalanceOnEditChange = () => {
    const { setDisableBalanceOnEdit } = this.props
    setDisableBalanceOnEdit()
  }

  allowRegistrationChange = () => {
    const { setAllowRegistration } = this.props
    setAllowRegistration()
  }

  render() {
    const { disableBalanceOnAdd, disableBalanceOnEdit } = this.props.settings

    if (this.props.users) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                <i className="fas fa-arrow-circle-left" /> Back To Dashboard
              </Link>
            </div>
          </div>

          <div className="card">
            <div className="card-header">Edit Settings</div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>Disable Balance On Add</label>{' '}
                  <input
                    type="checkbox"
                    name="disableBalanceOnAdd"
                    checked={!!disableBalanceOnAdd}
                    onChange={this.disableBalanceOnAddChange}
                  />
                </div>

                <div className="form-group">
                  <label>Disable Balance On Edit</label>{' '}
                  <input
                    type="checkbox"
                    name="disableBalanceOnEdit"
                    checked={!!disableBalanceOnEdit}
                    onChange={this.disableBalanceOnEditChange}
                  />
                </div>
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

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  setDisableBalanceOnAdd: PropTypes.func.isRequired,
  setDisableBalanceOnEdit: PropTypes.func.isRequired,
  setAllowRegistration: PropTypes.func.isRequired
}

export default compose(
  firestoreConnect(),
  connect(
    (state, props) => ({
      auth: state.firebase.auth,
      email: state.firebase.auth.email,
      settings: state.settings,
      users: state.firestore.ordered.users
    }),
    { setAllowRegistration, setDisableBalanceOnAdd, setDisableBalanceOnEdit }
  )
)(Settings)
