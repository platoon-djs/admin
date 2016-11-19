import React, { Component } from 'react'
import FaBook from 'react-icons/fa/book'
import { PageHeader, PageContent } from 'lib/ui/page'
import { Container, Row, Col } from 'lib/ui/grid'
import { Menu, sidestyles } from 'lib/ui/menu'
import Button from 'lib/ui/button'

export default class Events extends Component {

  render () {
    const { children } = this.props
    return (
      <div>
        <PageHeader icon={<FaBook />} title='Bookings' />
        <PageContent>
          <Container>
            <Row>
              <Col md={2}>
                <Menu theme={sidestyles} items={[{
                  label: 'List',
                  to: '/bookings'
                }]} />
                <br />
                <br />
                <Button
                  to="/bookings/create"
                  label="New"
                  primary
                  width={100}
                />
              </Col>
              <Col md={10}>
                { children }
              </Col>
            </Row>
          </Container>
        </PageContent>
      </div>
    )
  }

}
