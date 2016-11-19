import React, { Component } from 'react'
import range from 'lodash/range'
import reduce from 'lodash/reduce'
import assign from 'lodash/assign'
import DataTable from 'providers/data-table'
import Card, { CardBody } from 'lib/ui/card'

const bookingModel = {
  id: { type: 'string', label: '#ID' },
  client: { type: 'string' },
  description: { type: 'string' },
  startTime: { type: 'date', label: 'Date', format: 'L', clickable: true },
  createdAt: { type: 'date', label: 'Created', format: 'L' },
  tags: { type: 'tags', clickable: true }
}

const source = range(1, 10).map(r => reduce(bookingModel, (acc, { type }, k) => assign(acc, {
  [k]: type === 'date' ? new Date() : type === 'tags' ? ['taga', 'tagb'] : `blabla ${r}`
}), {}))

export default class List extends Component {

  constructor (props) {
    super(props)

    this.state = {
      data: {
        source,
        model: bookingModel,
        total: 1000,
        page: 1,
        show: 20
      }
    }
  }

  render () {
    const { data } = this.state
    const handleChange = p => {
      this.setState({ data: assign(data, { page: p }) })
    }
    return (
      <Card primary title='Bookings'>
        <CardBody>
          <DataTable
            {...data}
            onChange={handleChange}
          />
        </CardBody>
      </Card>
    )
  }

}

