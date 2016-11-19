import React from 'react'
import cn from 'classnames'
import { themr } from 'react-css-themr'

export default function factory (name, themeName, style, element = 'div') {
  return themr(name, style)(({ theme, className, children, ...props }) => (
    React.createElement(
      element,
      Object.assign(props, { className: cn(className, theme[themeName]) }),
      children
    )
  ))
}

