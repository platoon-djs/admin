import React, { Component } from 'react'
import assign from 'lodash/assign'
import Wrapper, { Content } from 'layouts/music'

import Tracks from './Tracks'

import Filters from '../components/Filters'
import Presets from '../components/Presets'
import Inspector from '../components/Inspector'

export default class Library extends Component {

  constructor (props) {
    super(props)
    this.state = { inspector: { isOpen: false } }
  }

  render () {
    const { inspector } = this.state

    const handleTrackSelect = track => {
      console.log(track)
      this.setState({ inspector: assign(inspector, {
        isOpen: true
      }) })
    }

    return (
      <Wrapper>
        <Presets />
        <Content>
          <Filters>
            Filters!
          </Filters>
          <Tracks onTrackSelect={handleTrackSelect} />
        </Content>
        <Inspector
          {...inspector}
        />
      </Wrapper>
    )
  }

}
