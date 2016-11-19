import React, { Component, PropTypes as T } from 'react'
import segmentize from 'segmentize'
import { themr } from 'react-css-themr'
import cn from 'classnames'
import noop from 'lodash/noop'
import assign from 'lodash/assign'
import style from './style.scss'
import Button, { ButtonGroup } from 'lib/ui/button'

class Paginate extends Component {

  renderFull (theme, page, source, show, total, onChange, onShowChange) {
    const start = Math.max(0, page - 1) * show + 1
    const end = start + source.length

    return [
      <div key='left' className={theme['paginate__left']}>
        Showing {start} to {end} of {total}
      </div>,
      <div key='right' className={theme['paginate__right']}>
        { this.renderPaginate(theme, page, show, total, onChange, onShowChange) }
      </div>
    ]
  }

  renderPaginate (theme, page, show, total, onChange, onShowChange) {
    const pages = (total / show) | 0
    const diff = Math.min(page, pages - page + 1)
    const {
      beginPages,
      previousPages,
      centerPage,
      nextPages,
      endPages
    } = segmentize({
      page: page,
      pages: pages,
      beginPages: 1,
      endPages: 1,
      sidePages: Math.max(2, 6 - diff)
    })

    const handleClick = p => e => {
      e.preventDefault()
      if (p !== page) {
        onChange(p)
      }
    }

    const renderPage = p => (
      <Button
        key={`page-${p}`}
        onClick={handleClick(p)}
        className={cn(theme.button, p === page && theme.current)}
        small
        label={p}
      />
    )

    return (
      <ButtonGroup className={theme['button-group']}>
        <Button
          label='Prev'
          disabled={page - 1 <= 0}
          small
          className={theme.button}
          onClick={handleClick(page - 1)}
        />
        { beginPages.map(renderPage) }
        { previousPages.map(renderPage) }
        { centerPage.map(renderPage) }
        { nextPages.map(renderPage) }
        { endPages.map(renderPage) }
        <Button
          label='Next'
          small
          disabled={page + 1 > pages}
          className={theme.button}
          onClick={handleClick(page + 1)}
        />
      </ButtonGroup>
    )
  }

  render () {
    const {
      theme,
      className,
      source,
      full,
      page,
      show,
      total,
      onChange,
      onShowChange,
      ...other
    } = this.props

    const cls = cn(
      theme.paginate,
      className,
      full && theme.full
    )
    const props = assign(other, {
      className: cls
    })

    return React.createElement('div', props,
      full
      ? this.renderFull(theme, page, source, show, total, onChange, onShowChange)
      : this.renderPaginate(theme, page, show, total, onChange, onShowChange)
    );
  }

}

Paginate.propTypes = {
  page: T.number.isRequired,
  show: T.number.isRequired,
  total: T.number.isRequired,
  onChange: T.func.isRequired,
  source: T.arrayOf(T.object),
  onShowChange: T.func,
  full: T.bool
}

Paginate.defaultProps = {
  onShowChange: noop
}

export default themr('UiPaginate', style)(Paginate)

