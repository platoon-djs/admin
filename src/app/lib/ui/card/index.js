import factory from '../factory'
import React from 'react'
import { themr } from 'react-css-themr'
import assign from 'lodash/assign'
import cn from 'classnames'
import style from './style.scss'

export const CardHeader = factory('UiCardHeader', 'header', style)
export const CardBody = factory('UiCardHeader', 'body', style)

const cardFactory = () => {
  const Card = ({
    theme,
    title,
    primary,
    info,
    danger,
    success,
    warning,
    className,
    children,
    ...other
  }) => {
    const head = title && (
      <CardHeader>
        <h4>{ title }</h4>
      </CardHeader>
    )

    const cls = cn(
      theme.card,
      className,
      primary && theme.primary,
      info && theme.info,
      danger && theme.danger,
      success && theme.success,
      warning && theme.warning
    )

    const props = assign(other, {
      className: cls
    })

    return React.createElement('div', props,
      head,
      children
    )
  }

  return Card
}

export default themr('UiCard', style)(cardFactory())

