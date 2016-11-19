import React, { Component, PropTypes as T } from 'react'
import isArray from 'lodash/isArray'
import FaCaretDown from 'react-icons/fa/caret-down'
import FaCaretRight from 'react-icons/fa/caret-right'
import { Link } from 'react-router'
import { themr } from 'react-css-themr'
import cn from 'classnames'
import factory from '../factory'
import style from './style.scss'

class MenuFactory extends Component {

  renderNavitems () {
    const { items, theme, onChange, checkActive: pcheckActive } = this.props
    const { router } = this.context
    const handleClick = item => e => {
      if (!isArray(item.children)) return
      e.preventDefault()
      item.opened = !item.opened
      onChange(items)
    }
    const renderNavitem = (item, key) => {
      const { children, opened, icon, checkActive, label, to = '' } = item
      const sel = Array.isArray(key) ? key : [key]
      const hasChildren = isArray(children)
      const active = (checkActive || pcheckActive) && router.isActive(to, true)
      return (
        <MenuItem active={active} theme={theme} key={sel.join('-')}>
          <MenuLink to={to} onClick={handleClick(item)} theme={theme}>
            { hasChildren && (opened
              ? <FaCaretDown className={theme.caret} />
              : <FaCaretRight className={theme.caret} />
            ) }
            { icon }
            { label }
          </MenuLink>
          { hasChildren && opened &&
            <Menu>
              { children.map((c, i) => renderNavitem(c, sel.concat([i]))) }
            </Menu>
          }
        </MenuItem>
      )
    }
    return (
      <Menu>
        { items.map(renderNavitem) }
      </Menu>
    )
  }

  render () {
    const { theme, children, items, right, checkActive, horizontal, ...props } = this.props
    const cls = cn(
      theme['menu'],
      horizontal && theme['menu--horizontal'],
      right && theme['menu--right']
    )
    return (
      <ul className={cls} {...props}>
        { items
          ? this.renderNavitems()
          : children
        }
      </ul>
    )
  }

}

MenuFactory.propTypes = {
  items: T.arrayOf(T.object),
  checkActive: T.bool
}

MenuFactory.defaultProps = {
  checkActive: true
}

MenuFactory.contextTypes = {
  router: T.object.isRequired
}

const MenuItemFactory = ({ theme, children, active, ...props }) => {
  const cls = cn(
    theme['menu__item'],
    active && theme['menu__item--active']
  )
  return (
    <li className={cls} {...props}>{children}</li>
  )
}

export const Menu = themr('UiMenu', style)(MenuFactory)
export const MenuItem = themr('UiMenuItem', style)(MenuItemFactory)
export const MenuLink = factory('UiMenu', 'menu__item-link', style, Link)

