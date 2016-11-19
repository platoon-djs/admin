import React, { Component } from 'react'
import factory from 'lib/ui/factory'
import { themr } from 'react-css-themr'
import style from './style.scss'

class Wrapper extends Component {
  render () {
    const { theme } = this.props
    return (
      <div className={theme.music}>
        {this.props.children}
      </div>
    )
  }
}

const BrandLogoFactory = ({ theme }) => (
  <div className={theme['brand-logo']}>
    <span>Platoon DJs</span>
  </div>
)

export default themr('LMWrapper', style)(Wrapper)
export const BrandLogo = themr('LMWrapper', style)(BrandLogoFactory)
export const LeftMenu = factory('LMLeftMenu', 'left', style)
export const RightMenu = factory('LMRightMenu', 'right', style)
export const TopMenu = factory('LMTopMenu', 'top', style)
export const Content = factory('LMContent', 'content', style)

