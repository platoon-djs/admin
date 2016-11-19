import React, { Component, PropTypes as T } from 'react'
import { connect } from 'react-redux'
import isArray from 'lodash/isArray'
import FaHeadphones from 'react-icons/fa/headphones'
import FaMusic from 'react-icons/fa/music'
import FaDownload from 'react-icons/fa/download'
import FaUpload from 'react-icons/fa/upload'
import FaTh from 'react-icons/fa/th'
import FaFolder from 'react-icons/fa/folder'
import FaMicrophone from 'react-icons/fa/microphone'
import FaCaretRight from 'react-icons/fa/caret-right'
import FaCaretDown from 'react-icons/fa/caret-down'
import FaSignout from 'react-icons/fa/sign-out'
import FaList from 'react-icons/fa/list'
import { Menu, MenuItem, MenuLink } from 'lib/ui/menu'
import Wrapper, { Content, TopMenu, BrandLogo, LeftMenu } from 'layouts/default'
import styles from '../styles/navigation.scss'
import { hasPlayerSelector } from 'providers/player'

const initialNavitems = [{
  label: 'Audio',
  icon: <FaHeadphones />,
  opened: true,
  children: [{
    label: 'Music',
    to: '/music',
    icon: <FaMusic />
  }, {
    label: 'Sounds',
    to: '/music?type=sounds',
    icon: <FaMicrophone />
  }]
}, {
  label: 'Playlists',
  icon: <FaTh />,
  children: [{
    label: 'Playlist 1',
    icon: <FaFolder />,
    children: [{
      label: 'Random playlist',
      to: 'music?playlist=uuid-goes-here',
      icon: <FaList />
    }]
  }, {
    label: 'Playlist 2',
    icon: <FaFolder />,
    children: []
  }]
}, {
  label: 'Upload',
  to: '/music/upload',
  checkActive: true,
  icon: <FaUpload />
}, {
  label: 'Downloads',
  to: '/music/downloads',
  checkActive: true,
  icon: <FaDownload />
}]

class Music extends Component {

  static contextTypes = {
    router: T.object.isRequired
  }

  constructor (props) {
    super(props)
    this.state = { navitems: initialNavitems }
  }

  render () {
    const { navitems } = this.state
    const { children, hasPlayer } = this.props

    const handleChange = navitems => {
      this.setState({ navitems })
    }

    return (
      <Wrapper padding={hasPlayer}>
        <LeftMenu>
          <BrandLogo />
          <Menu
            theme={styles}
            checkActive={false}
            items={navitems}
            onChange={handleChange}
          />
        </LeftMenu>
        <Content>
          <TopMenu>
            <Menu horizontal items={[{
              label: 'Admin', to: '/'
            }]} />
            <Menu horizontal right >
              <MenuItem>
                <input type='search' style={{width: 300}} placeholder='Search collection' />
              </MenuItem>
              <MenuItem>
                <MenuLink to='/logout'><FaSignout /></MenuLink>
              </MenuItem>
            </Menu>
          </TopMenu>
          {children}
        </Content>
      </Wrapper>
    )
  }

}

export default connect(state => ({
  hasPlayer: hasPlayerSelector(state)
}))(Music)

