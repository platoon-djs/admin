import React, { Component } from 'react'
import cn from 'classnames'
import { connect } from 'react-redux'
import Wrapper, { LeftMenu, TopMenu, Content, BrandLogo, Container } from 'layouts/default'
import FaDashboard from 'react-icons/fa/dashboard'
import FaSitemap from 'react-icons/fa/sitemap'
import FaCalendar from 'react-icons/fa/calendar'
import FaBook from 'react-icons/fa/book'
import FaFiletext from 'react-icons/fa/file-text'
import FaGroup from 'react-icons/fa/group'
import FaCogs from 'react-icons/fa/cogs'
import FaUser from 'react-icons/fa/user'
import FaSignout from 'react-icons/fa/sign-out'
import { Row, Col } from 'lib/ui/grid'
import { Menu } from 'lib/ui/menu'
import { hasPlayerSelector } from 'providers/player'
import navstyles from '../styles/navigation.scss'

const navItems = [{
  label: 'Dashboard',
  to: '/',
  icon: <FaDashboard />
}, {
  label: 'CMS',
  to: '/cms',
  icon: <FaSitemap />
}, {
  label: 'Events',
  to: '/events',
  icon: <FaCalendar />
}, {
  label: 'Bookings',
  to: '/bookings',
  icon: <FaBook />
}, {
  label: 'Documents',
  to: '/documents',
  icon: <FaFiletext />
}, {
  label: 'Members/Prospects',
  to: '/members',
  icon: <FaGroup />
}, {
  label: 'Settings',
  to: '/settings',
  icon: <FaCogs />
}, {
  label: 'Profile',
  to: '/profile',
  icon: <FaUser />
}]

class Admin extends Component {

  render () {
    const { children, hasPlayer } = this.props

    return (
      <Wrapper padding={hasPlayer}>
        <LeftMenu>
          <BrandLogo />
          <Menu items={navItems} theme={navstyles} />
        </LeftMenu>
        <Content>
          <TopMenu>
            <Menu horizontal items={[{
              label: 'Music', to: '/music'
            }]} />
            <Menu horizontal right items={[
              { icon: <FaSignout />, to: '/logout' }
            ]} />
          </TopMenu>
          <Container>
            <Row>
              <Col md='12'>
                {children}
              </Col>
            </Row>
          </Container>
        </Content>
      </Wrapper>
    )
  }
}

export default connect(state => ({
  hasPlayer: hasPlayerSelector(state)
}))(Admin)

