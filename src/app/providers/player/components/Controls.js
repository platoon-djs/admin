import React, { Component, PropTypes as T } from 'react'
import FaVolumeUp from 'react-icons/fa/volume-up'
import FaVolumeDown from 'react-icons/fa/volume-down'
import FaVolumeOff from 'react-icons/fa/volume-off'
import FaPlay from 'react-icons/fa/play'
import FaPause from 'react-icons/fa/pause'
import FaStop from 'react-icons/fa/stop'
import FaForward from 'react-icons/fa/forward'
import FaBackward from 'react-icons/fa/backward'
import { themr } from 'react-css-themr'
import styles from '../styles/player.scss'
import ProgressBar from './ProgressBar'

class Controls extends Component {

  static propTypes = {
    theme: T.object
  }

  constructor (props) {
    super(props)
    this.state = { volume: 0.8 }
  }

  render () {
    const { theme } = this.props
    const { volume } = this.state

    const handleVolume = val => {
      this.setState({ volume: val })
    }

    return (
      <div className={theme.controls}>
        <div className={theme.volume}>
          <div className={theme.icon}>
            { volume >= 0.63 ? (
              <FaVolumeUp />
            ) : volume >= 0.37 ? (
              <FaVolumeDown />
            ) : (
              <FaVolumeOff />
            ) }
          </div>
          <ProgressBar
            theme={theme}
            value={volume}
            onChange={handleVolume}
            continuous
          />
        </div>
        <div className={theme.handles}>
          <FaBackward />
          <FaPlay />
          <FaForward />
        </div>
      </div>
    )
  }

}

export default themr('PlControls', styles)(Controls)
