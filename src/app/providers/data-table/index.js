import React, { Component, PropTypes as T } from 'react'
import moment from 'moment'
import keys from 'lodash/keys'
import capitalize from 'lodash/capitalize'
import isFunction from 'lodash/isFunction'
import get from 'lodash/get'
import Table, { TableRow } from 'lib/ui/table'
import Paginate from 'lib/ui/table/paginate'
import Tag from 'lib/ui/tag'

class DataTable extends Component {

  renderRows (model, source, onClick) {
    const models = keys(model)

    const handleClick = (s, m) => e => {
      e.preventDefault()
      if (isFunction(onClick)) {
        onClick(s, m)
      }
    }

    const mapModelToSource = (m, s) => {
      let val = get(s, m, '')
      const clickable = get(model, [m, 'clickable'], false)
      switch (get(model, [m, 'type'], '').toLowerCase()) {
        case 'date':
          val = moment(val).format(get(model, [m, 'format'], 'L HH:mm:ss'))
          break
        case 'number':
          val = `${val}`
          break
        case 'bool':
          val = val ? 'True' : 'False'
          break
        case 'tags':
          return val.map((t, i) => (
            <Tag
              key={i}
              label={t}
              onClick={clickable && handleClick(s, m)}
            />
          ))
      }
      return clickable
        ? <a href="" onClick={handleClick(s, m)}>{ val }</a>
        : val
    }

    return source.map((s, r) => (
      <TableRow key={`row-${r}`}>
        { models.map((m, c) => (
          <td key={`col-${r}-${c}`}>
            { mapModelToSource(m, s) }
          </td>
        )) }
      </TableRow>
    ))
  }

  renderPagination (page, source, total, show, onChange, onShowChange) {
    if (isFunction(onChange)) {
      return <Paginate full {...{ page, total, show, source, onChange, onShowChange }} />
    }
  }

  render () {
    const { model, page, source, total, show, onClick, onChange, onShowChange } = this.props

    const headers = keys(model).map(m => ({
      label: get(model, [m, 'label'], capitalize(m))
    }))

    return (
      <div>
        <Table headers={headers}>
          <tbody>
            { this.renderRows(model, source, onClick) }
          </tbody>
        </Table>
        { this.renderPagination(page, source, total, show, onChange, onShowChange) }
      </div>
    )
  }

}

DataTable.propTypes = {
  model: T.object.isRequired,
  source: T.arrayOf(T.object).isRequired,
  page: T.number,
  total: T.number,
  show: T.number,
  onClick: T.func,
  onChange: T.func,
  onShowChange: T.func
}

DataTable.defaultProps = {
  source: []
}

export default DataTable

