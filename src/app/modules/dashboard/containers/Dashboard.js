import React, { Component } from 'react'
import FaDashboard from 'react-icons/fa/dashboard'
import { PageHeader, PageContent } from 'lib/ui/page'

export default class Dashboard extends Component {

  render () {
    const { children } = this.props
    return (
      <div>
        <PageHeader icon={<FaDashboard />} title='Dashboard' />
        <PageContent>
          { children }
        </PageContent>
      </div>
    )
  }

}

