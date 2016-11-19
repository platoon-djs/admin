import React, { Component, PropTypes as T } from 'react'
import cn from 'classnames'
import clamp from 'lodash/clamp'
import debounce from 'lodash/debounce'
import isNumber from 'lodash/isNumber'
import isFunction from 'lodash/isFunction'
import { themr } from 'react-css-themr'
import styles from '../styles/player.scss'

const MOUSE_DOWN = 1
const MOUSE_UP = 2
const MOUSE_MOVE = 3

class ProgressBar extends Component {

  static propTypes = {
    theme: T.object,
    value: T.number,
    onChange: T.func,
    continuous: T.bool
  }

  constructor (props) {
    super(props)

    this.state = { value: props.value || 0 }

    this.handleDown = this.handleDown.bind(this)
    this.handleUp = this.handleUp.bind(this)
    this.handleMove = this.handleMove.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (isNumber(nextProps.value) && !this.state.capturing) {
      this.setState({ value: nextProps.value })
    }
  }

  onChange (value) {
    const { onChange } = this.props
    if (isFunction(onChange)) {
      onChange(value)
    }
    this.setState({ value: value })
  }

  componentWillUnmount () {
    document.removeEventListener('mousemove', this.handleMove)
    document.removeEventListener('mouseup', this.handleUp)
  }

  handleDown (e) {
    e.preventDefault()
    document.addEventListener('mousemove', this.handleMove, false)
    document.addEventListener('mouseup', this.handleUp, false)
    this.setState({ capturing: true })
    this.handleChange(e)
  }

  handleUp (e) {
    e.preventDefault()
    document.removeEventListener('mousemove', this.handleMove)
    document.removeEventListener('mouseup', this.handleUp)
    this.setState({ capturing: false })
    this.handleChange(e, true)
  }

  handleMove (e) {
    e.preventDefault()
    this.handleChange(e)
  }

  handleChange (e, mouseUp = false) {
    const { continuous } = this.props
    const bbox = this.refs.bar.getBoundingClientRect()
    const value = clamp((e.clientX - bbox.left)/bbox.width, 0, 1)

    if (continuous || mouseUp) {
      this.onChange(value)
    } else {
      this.setState({ value: value })
    }
  }

  render () {
    const { theme } = this.props
    const { value, capturing } = this.state
    const width = `${clamp(value, 0, 1) * 100}%`

    const cls = cn(
      theme.progress,
      capturing && theme.active
    )

    return (
      <div
        className={cls}
        ref='bar'
        onMouseDown={this.handleDown}
      >
        <div className={theme.wrapper}>
          <div className={theme.bar} style={{ width }} />
        </div>
      </div>
    )
  }

}

export default themr('PlProgressBar', styles)(ProgressBar)

