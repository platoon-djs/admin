import React from 'react'
import factory from '../factory'
import { themr } from 'react-css-themr'
import assign from 'lodash/assign'
import cn from 'classnames'
import style from './style.scss'

const tagFactory = () => {
  const Tag = ({
    theme,
    label,
    primary,
    info,
    danger,
    success,
    warning,
    className,
    children,
    onClick,
    ...other
  }) => {
    const cls = cn(
      theme.tag,
      className,
      primary && theme.primary,
      info && theme.info,
      danger && theme.danger,
      success && theme.success,
      warning && theme.warning,
      onClick && theme.clickable
    )
    const props = assign(other, {
      onClick,
      className: cls
    }, onClick && { href: '' })

    return React.createElement(onClick ? 'a' : 'span', props,
      label,
      children
    )
  }

  return Tag
}

export default themr('UiTag', style)(tagFactory())
