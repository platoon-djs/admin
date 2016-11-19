import React from 'react'
import { themr } from 'react-css-themr'
import isArray from 'lodash/isArray'
import assign from 'lodash/assign'
import cn from 'classnames'
import style from './style.scss'

const tableFactory = () => {

  const renderTableHead = ({
    label,
    ...props
  }, key) => React.createElement('th', assign({
    key
  }, props), label)

  const Table = ({
    theme,
    headers,
    className,
    children,
    ...other
  }) => {
    const thead = isArray(headers) && (
      <thead>
        <tr>{ headers.map(renderTableHead) }</tr>
      </thead>
    )
    const cls = cn(theme.table, className)
    const props = assign(other, {
      className: cls
    })

    return React.createElement('table', props,
      thead,
      children
    )
  }

  return Table
}

const tableRowFactory = () => {
  const renderTableData = ({
    label,
    ...props
  }, key) => React.createElement('td', assign({
    key
  }, props), label)

  const TableRow = ({
    theme,
    data,
    className,
    children,
    ...other
  }) => {
    const cls = cn(theme['table__row'], className)
    const props = assign(other, {
      className: cls
    })

    const tds = isArray(data) && data.map(renderTableData)

    return React.createElement('tr', props, tds, children)
  }
  return TableRow
}

export default themr('UiTable', style)(tableFactory())
export const TableRow = themr('UiTableRow', style)(tableRowFactory())

