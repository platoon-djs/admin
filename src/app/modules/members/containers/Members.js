import React, { Component } from 'react'
import FaGroup from 'react-icons/fa/group'
import { PageHeader, PageContent } from 'lib/ui/page'

export default class Members extends Component {

  render () {
    const { children } = this.props
    return (
      <div>
        <PageHeader icon={<FaGroup />} title='Members/Prospects' />
        <PageContent>
          { children }
        </PageContent>
      </div>
    )
  }

}
