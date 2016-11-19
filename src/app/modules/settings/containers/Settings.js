import React, { Component } from 'react'
import FaCogs from 'react-icons/fa/cogs'
import { PageHeader, PageContent } from 'lib/ui/page'

export default class Settings extends Component {

  render () {
    const { children } = this.props
    return (
      <div>
        <PageHeader icon={<FaCogs />} title='Settings' />
        <PageContent>
          { children }
        </PageContent>
      </div>
    )
  }

}
