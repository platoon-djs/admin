import React from 'react'
import { Link } from 'react-router'
import assign from 'lodash/assign'
import { themr } from 'react-css-themr'
import cn from 'classnames'
import style from './style.scss'

const ButtonFactory = ({
  theme,
  children,
  to,
  icon,
  label,
  className,
  primary,
  info,
  danger,
  success,
  warning,
  width,
  small,
  big,
  ...other
}) => {
  const cls = cn(
    'button',
    theme.button,
    className,
    width && `width-${width}`,
    small && 'small',
    big && 'big',
    primary && theme.primary,
    info && theme.info,
    danger && theme.danger,
    success && theme.success,
    warning && theme.warning
  )

  const el = to ? Link : 'button'

  const props = assign(other, {
    to,
    className: cls
  })

  return React.createElement(el, props,
    icon,
    label,
    children
  )
}

export const ButtonGroup = ({ className, children, ...other }) => {
  const cls = cn('buttons group', className)
  const props = assign(other, { className: cls })

  return React.createElement('div', props, children)
}
export default themr('UiButton', style)(ButtonFactory)
