import React, { Component } from 'react'
import FaBook from 'react-icons/fa/book'
import { PageHeader, PageContent } from 'lib/ui/page'

export default class Events extends Component {

  render () {
    const { children } = this.props
    return (
      <div>
        <PageHeader icon={<FaBook />} title='Bookings' />
        <PageContent>
          { children }
        </PageContent>
      </div>
    )
  }

}
