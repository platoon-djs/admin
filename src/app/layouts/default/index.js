import React, { Component } from 'react'
import cn from 'classnames'
import logo from 'assets/logo-white-small.png'
import factory from 'lib/ui/factory'
import { themr } from 'react-css-themr'
import style from './style.scss'

class Wrapper extends Component {
  render () {
    const { theme, className, padding } = this.props
    return (
      <div className={cn(className, theme.default, padding && theme.withPadding)}>
        {this.props.children}
      </div>
    )
  }
}

const BrandLogoFactory = ({ theme }) => (
  <div className={theme['brand-logo']}>
    <img src={logo} alt='Platoon logo' />
  </div>
)

const ContainerFactory = ({ theme, children }) => (
  <div className={theme['overflow-container']}>
    <div className={theme['overflow-container__wrapper']}>
      { children }
    </div>
  </div>
)

const LeftFactory = ({ theme, children }) => (
  <div className={theme['left']}>
    <div className={theme['left__wrapper']}>
      { children }
    </div>
  </div>
)

export default themr('LDWrapper', style)(Wrapper)
export const BrandLogo = themr('LDWrapper', style)(BrandLogoFactory)
export const LeftMenu = themr('LDLeftMenu', style)(LeftFactory)
export const TopMenu = factory('LDTopMenu', 'top', style)
export const Content = factory('LDContent', 'content', style)
export const Container = themr('LDContainer', style)(ContainerFactory)

