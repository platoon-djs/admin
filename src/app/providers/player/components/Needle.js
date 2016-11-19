import React, { Component, PropTypes as T } from 'react'
import { themr } from 'react-css-themr'
import styles from '../styles/player.scss'
import ProgressBar from './ProgressBar'

class Needle extends Component {

  static propTypes = {
    theme: T.object
  }

  constructor (props) {
    super(props)

    this.state = { time: 0, duration: 450 }
  }

  componentWillMount () {
    this.intv = setInterval(() => {
      const t = this.state.time + 0.001
      this.setState({ time: Math.min(1, t) })
      if (t >= 1) {
        clearInterval(this.intv)
      }
    }, 100)
  }

  componentWillUnmount () {
    clearInterval(this.intv)
  }

  formatDuration (seconds) {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds - (h * 3600)) / 60)
    const s = Math.floor(seconds - (h * 3600) - (m * 60))
    const hstr = h > 0 ? `${h < 10 ? `0${h}` : h}:` : ''
    return `${hstr}${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}`
  }

  render () {
    const { theme } = this.props
    const { time, duration } = this.state

    const handleChange = val => {
      this.setState({ time: val })
    }

    return (
      <div className={theme.needle}>
        <div className={theme.time}>
          { this.formatDuration( time * duration ) }
        </div>
        <ProgressBar onChange={handleChange} value={time} theme={theme} />
        <div className={theme.time}>
          { this.formatDuration( duration ) }
        </div>
      </div>
    )
  }

}

export default themr('PlNeedle', styles)(Needle)

