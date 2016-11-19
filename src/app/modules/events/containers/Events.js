import React, { Component } from 'react'
import FaCalendar from 'react-icons/fa/calendar'
import { PageHeader, PageContent } from 'lib/ui/page'

export default class Events extends Component {

  render () {
    const { children } = this.props
    return (
      <div>
        <PageHeader icon={<FaCalendar />} title='Events' />
        <PageContent>
          { children }
        </PageContent>
      </div>
    )
  }

}
