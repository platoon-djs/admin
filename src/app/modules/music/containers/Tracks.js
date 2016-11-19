import React, { Component } from 'react'
import { connect } from 'react-redux'
import cn from 'classnames'
import range from 'lodash/range'
import assign from 'lodash/assign'
import FaPlay from 'react-icons/fa/play-circle-o'
import FaCaretDown from 'react-icons/fa/caret-down'
import FaCaretUp from 'react-icons/fa/caret-up'
import styles from '../styles/tracks.scss'
import { playTrack } from 'providers/player'

const headers = [{
  label: 'Track Title',
  sortKey: 'title'
}, {
  label: 'Artist',
  sortKey: 'artist'
}, {
  label: 'Album',
  sortKey: 'album'
}, {
  label: 'Genre',
  sortKey: 'genre'
}, {
  label: 'BPM',
  sortKey: 'bpm'
}, {
  label: 'Rating',
  sortKey: 'rating'
}, {
  label: 'Time',
  sortKey: 'time'
}, {
  label: 'Key',
  sortKey: 'key_one'
}, {
  label: 'Date Added',
  sortKey: 'uploaded_at'
}]

class Tracks extends Component {

  constructor (props) {
    super(props)
    this.state = { sort: { key: null, direction: 'asc' } }
  }

  render () {
    const { sort } = this.state

    const handleTrackSelect = track => e => {
      e.preventDefault()
      this.props.onTrackSelect(track)
    }

    const handleSort = key => e => {
      e.preventDefault()
      if (sort.key === key) {
        this.setState({ sort: assign(sort, {
          direction: sort.direction === 'asc' ? 'desc' : 'asc'
        }) })
      } else {
        this.setState({ sort: assign(sort, {
          key: key,
          direction: 'asc'
        }) })
      }
    }

    const renderHeader = header => (
      <th
        key={header.sortKey}
        className={cn(sort.key === header.sortKey && styles.sort)}
        onClick={handleSort(header.sortKey)}
      >
        { header.label } { sort.key === header.sortKey && (
          sort.direction === 'asc'
            ? <FaCaretDown />
            : <FaCaretUp />
        ) }
      </th>
    )

    const handlePlayTrack = trackId => e => {
      e.preventDefault()
      this.props.dispatch(playTrack({ id: trackId }))
    }

    return (
      <div className={styles.tracks}>
        <div className={styles.list}>
          <div className={styles.wrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th />
                  <th />
                  { headers.map(renderHeader) }
                  <th>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                { range(1, 101).map(key => (
                  <tr key={key}>
                    <td width='1%'>
                      <FaPlay color='#0074D9' onClick={handlePlayTrack(key)} />
                    </td>
                    <td className={styles.thumbnail}>
                      <img src='//placehold.it/60x20' width='60' />
                    </td>
                    <td>
                      <a href='' onClick={handleTrackSelect(key)}>
                        Track {key}
                      </a>
                    </td>
                    { range(1, 9).map(i => (
                      <td key={`${key}-${i}`}>{headers[i].label} {key}</td>
                    )) }
                    <td>
                      Download
                    </td>
                  </tr>
                )) }
              </tbody>
            </table>
          </div>
        </div>
        <div className={styles.information}>
          <span>20 of 20</span>
        </div>
      </div>
    )
  }

}

export default connect()(Tracks)

