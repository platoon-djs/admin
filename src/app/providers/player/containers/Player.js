import React, { Component, PropTypes as T } from 'react'
import { connect } from 'react-redux'
import { themr } from 'react-css-themr'

import { playerSelector } from '../reducer/player'

import Needle from '../components/Needle'
import Controls from '../components/Controls'
import TrackInfo from '../components/TrackInfo'

import styles from '../styles/player.scss'

class Player extends Component {

  static propTypes = {
    theme: T.object,
    player: T.object.isRequired
  }

  render () {
    const { theme, player } = this.props

    return player.active ? (
      <div className={theme.player}>
        <TrackInfo theme={theme} />
        <Needle theme={theme} />
        <Controls theme={theme} />
      </div>
    ) : null
  }

}

export default connect(state => ({
  player: playerSelector(state)
}))(themr('PPlayer', styles)(Player))

