import React, { Component } from 'react'
import { LeftMenu } from 'layouts/music'

export default class Library extends Component {

  render () {
    const { isOpen } = this.props
    return isOpen || true ? (
      <LeftMenu>
        Presets
      </LeftMenu>
    ) : null
  }

}
