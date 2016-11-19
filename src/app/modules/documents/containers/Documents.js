import React, { Component } from 'react'
import FaFiletext from 'react-icons/fa/file-text'
import { PageHeader, PageContent } from 'lib/ui/page'

export default class Documents extends Component {

  render () {
    const { children } = this.props
    return (
      <div>
        <PageHeader icon={<FaFiletext />} title='Documents' />
        <PageContent>
          { children }
        </PageContent>
      </div>
    )
  }

}
