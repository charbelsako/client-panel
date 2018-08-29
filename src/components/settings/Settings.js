import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  setAllowRegistration,
  setDisableBalanceOnAdd,
  setDisableBalanceOnEdit,
} from '../../actions/settingsActions'

class Settings extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    setDisableBalanceOnAdd: PropTypes.func.isRequired,
    setDisableBalanceOnEdit: PropTypes.func.isRequired,
    setAllowRegistration: PropTypes.func.isRequired,
  }

  allowRegistration = e => {
    const { setAllowRegistration } = this.props
    setAllowRegistration()
  }

  disableBalanceOnAdd = e => {
    const { setDisableBalanceOnAdd } = this.props
    setDisableBalanceOnAdd()
  }

  disableBalanceOnEdit = e => {
    const { setDisableBalanceOnEdit } = this.props
    setDisableBalanceOnEdit()
  }

  render() {
    const {
      disableBalanceOnEdit,
      disableBalanceOnAdd,
      allowRegistration,
    } = this.props.settings
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              {' '}
              <i className="fas fa-arrow-circle-left" /> Back to dashboard
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-header">Edit Settings</div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label>Allow Registraion</label>{' '}
                <input
                  type="checkbox"
                  name="allowRegistration"
                  checked={!!allowRegistration}
                  onChange={this.allowRegistration}
                />
              </div>

              <div className="form-group">
                <label>Disable Balance On Add</label>{' '}
                <input
                  type="checkbox"
                  name="disableBalanceOnAdd"
                  checked={!!disableBalanceOnAdd}
                  onChange={this.disableBalanceOnAdd}
                />
              </div>

              <div className="form-group">
                <label>Disable Balance On Edit</label>{' '}
                <input
                  type="checkbox"
                  name="disableBalanceOnEdit"
                  checked={!!disableBalanceOnEdit}
                  onChange={this.disableBalanceOnEdit}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  (state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings,
  }),
  { setAllowRegistration, setDisableBalanceOnAdd, setDisableBalanceOnEdit },
)(Settings)
