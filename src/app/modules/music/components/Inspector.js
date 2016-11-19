import React, { Component } from 'react'
import { RightMenu } from 'layouts/music'

export default class Inspector extends Component {

  render () {
    const { isOpen } = this.props
    return isOpen || true ? (
      <RightMenu>
        Inspect stuff
      </RightMenu>
    ) : null
  }

}

