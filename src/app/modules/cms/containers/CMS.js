import React, { Component } from 'react'
import FaSitemap from 'react-icons/fa/sitemap'
import { PageHeader, PageContent } from 'lib/ui/page'

export default class CMS extends Component {

  render () {
    const { children } = this.props
    return (
      <div>
        <PageHeader icon={<FaSitemap />} title='CMS' />
        <PageContent>
          { children }
        </PageContent>
      </div>
    )
  }

}
