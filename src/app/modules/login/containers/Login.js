import React, { Component, PropTypes as T } from 'react'
import Loader from 'halogen/PulseLoader'
import assign from 'lodash/assign'
import FaUnLock from 'react-icons/fa/unlock-alt'
import FaLock from 'react-icons/fa/lock'
import logo from 'assets/logo-white-small.png'
import { connect } from 'react-redux'
import { login } from 'providers/auth'
import { RESOLVED } from 'providers/redux'
import styles from '../styles/login.scss'

class Login extends Component {

  constructor (props) {
    super(props)

    const handleChange = field => e => {
      this.setState({ [field]: assign(this.state[field], {
        value: e.target.value
      })})
    }

    this.state = {
      hover: false,
      submitting: false,
      username: { value: '', onChange: handleChange('username') },
      password: { value: '', onChange: handleChange('password') }
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.authData.state === RESOLVED) {
      this.context.router.replace(nextProps.location.query.redirect || '/')
    }
  }

  onSubmit (credentials) {
    this.setState({ submitting: true })
    this.props.login(credentials)
      .catch(err => {
        this.setState({ error: err, submitting: false })
      })
  }

  render () {
    const { hover, submitting, username, password } = this.state

    const handleSubmit = e => {
      e.preventDefault()
      this.onSubmit({ username: username.value, password: password.value })
    }

    const handleMouse = state => () => {
      this.setState({ hover: state })
    }

    return (
      <div className={styles.login}>
        <div className={styles.box}>
          <img src={logo} alt='Platoon Logo' height={50} />
          <h4>Interweb log in</h4>
          <div className={styles.form}>
            <form action='' className='form' onSubmit={handleSubmit}>
              <input type='text' className={styles.input} placeholder='Email' {...username} />
              <span className={styles.password}>
                <input type='password' className={styles.input} placeholder='Password' {...password} />
                <a href='/forgot'>Forgot?</a>
              </span>
              <button
                type='submit'
                className={styles.button}
                onMouseEnter={handleMouse(true)}
                onMouseLeave={handleMouse(false)}
              >
                { submitting ? (
                  <Loader color='rgba(170, 170, 170, 0.6)' size='0.6em' />
                ) : (
                  <div>
                    Login
                    { hover ? <FaUnLock /> : <FaLock /> }
                  </div>
                ) }
              </button>
              { /*
              <label className='form-item checkbox'>
                <input type='checkbox' />
                Remember email
              </label>
              */ }
            </form>
          </div>
        </div>
      </div>
    )
  }

}

Login.contextTypes = {
  router: T.object
}

const mapStateToProps = state => ({
  authData: state.auth
})

export default connect(mapStateToProps, { login })(Login)

