import React, { Component } from 'react'
import FaUser from 'react-icons/fa/user'
import { PageHeader, PageContent } from 'lib/ui/page'

export default class Profile extends Component {

  render () {
    const { children } = this.props
    return (
      <div>
        <PageHeader icon={<FaUser />} title='Profile' />
        <PageContent>
          { children }
        </PageContent>
      </div>
    )
  }

}
