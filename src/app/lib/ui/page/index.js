import React from 'react'
import factory from '../factory'
import style from './style.scss'
import { themr } from 'react-css-themr'

const PageHeaderFactory = ({
  theme,
  title,
  icon,
  active,
  ...props
}) => {
  return (
    <div className={theme.header} {...props}>
      <span className={theme.icon}>
        { icon }
      </span>
      <h2 className={theme.title}>
        { title }
      </h2>
    </div>
  )
}

export const PageHeader = themr('UiPageHeader', style)(PageHeaderFactory)
export const PageTitle = factory('UiPageTitle', 'title', style, 'h1')
export const PageContent = factory('UiPageTitle', 'content', style)

