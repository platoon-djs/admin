import React from 'react'
import { themr } from 'react-css-themr'
import cn from 'classnames'
import factory from '../factory'
import style from './style.scss'

const Column = ({ theme, children, lg, md, sm, xs, ...props }) => {
  const cls = cn(
    lg && theme[`col-lg-${lg}`],
    md && theme[`col-md-${md}`],
    sm && theme[`col-sm-${sm}`],
    xs && theme[`col-xs-${xs}`]
  )
  return (
    <div className={cls} {...props}>{children}</div>
  )
}

export const Container = factory('UiContainer', 'container', style)
export const Row = factory('UiRow', 'row', style)
export const Col = themr('UiColumn', style)(Column)

