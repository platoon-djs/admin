import React, { Component, PropTypes as T } from 'react'
import { themr } from 'react-css-themr'
import styles from '../styles/player.scss'
import ProgressBar from './ProgressBar'

class TrackInfo extends Component {

  static propTypes = {
    theme: T.object
  }

  render () {
    const { theme } = this.props
    return (
      <div className={theme.trackInfo}>
        <div className={theme.meta}>
          <div className={theme.thumbnail}>
            <img src='//placehold.it/200x200' />
          </div>
          <div className={theme.info}>
            <h4 className={theme.title}>Levels</h4>
            <span className={theme.artist}>Avicci</span>
          </div>
        </div>
      </div>
    )
  }

}

export default themr('PlTrackInfo', styles)(TrackInfo)

