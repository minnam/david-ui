/**
 * modules/table/search.jsx
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 *  Derek Hirotsu, dhirotsu@ventanaconstruction.com
 *
 * @flow
 */
import React, { Component, Fragment } from 'react'
import { classes, stylesheet } from 'typestyle'

/* Components =================================================================================== */
import IconButton from '../icon-button/icon-button'

/* <Search /> =================================================================================== */
export type Props = {
  onToggle: () => void,
  searchText: string,
  setSearchText: (Array) => void,
  toggled: boolean,
  resetSearch: () => void
}

class Search extends Component<Props, *> {
  /* Types ====================================================================================== */
  input: ?HTMLInputElement
  container: ?HTMLElement
  state = {
    active: false,
    focused: false,
    items: [],
    value: ''
  }
  input = null
  container = null

  /* Default Props ============================================================================== */
  static defaultProps = {
    searchText: []
  }

  render () {
    const { value, items } = this.state
    const { searchText, toggled, resetSearch } = this.props

    return (
      <Fragment>
        {
          (() => {
            if (!toggled) {
              return <IconButton
                icon={ 'search' }
                type={ 'button' }
                className={ classes(CLASSNAMES.searchOpenButton, 'no-print') }
                onClick={ this.onSearchButtonClick }
                secondaryButtonIcon={searchText.length > 0 ? <i className='material-icons'>close</i> : null}
                secondaryOnClick={event => {
                  event.stopPropagation()
                  resetSearch()
                }}
              />
            }
          })()
        }
        <div
          className={classes(
            CLASSNAMES.searchInnerWrapper,
            toggled ? null : CLASSNAMES.searchHidden
          )}
        >
          <IconButton
            icon={ 'close' }
            type={ 'button' }
            className={ CLASSNAMES.searchCloseButton }
            onClick={ this.onCloseButtonClick }
          />
          <ul
            ref={container => {this.container = container}}
            className={classes(CLASSNAMES.searchTagContainer, (!this.state.active && !this.state.focused) ? 'tag-blurred' : '')}
            style={
              (() => {
                if (this.container && this.container.offsetHeight > 30 && (this.state.active || this.state.focused)) {
                  return {
                    boxShadow: '1px 1px 2px 1px rgba(0,0,0,0.2)',
                    border: 'none',
                    padding: 7.5
                  }
                }
              })()
            }
            onClick={() => {
              if (this.input) {
                this.input.focus()
              }
              this.setState({ focused: true })
            }}
            onMouseMove={() => {
              this.setState({ active: true })
            }}
            onMouseLeave={() => {
              this.setState({ active: false })
            }}
          >
            {
              items.map((item, index) =>
                <li
                  key={index}
                  className={CLASSNAMES.searchTagItems}
                  onClick={event => {
                    event.preventDefault()
                    event.stopPropagation()

                    this.removeItem(index)
                  }}
                >
                  {item}
                  <i className='material-icons'>close</i>
                </li>
              )
            }
            <input
              onKeyPress={ this.props.onKeyPress }
              className={CLASSNAMES.searchInput}
              style={(() => {
                /** Input needs to be hidden because it will take up a space and look like input is empty */
                if (!this.state.focused && (this.input &&!this.input.value)) {
                  return {
                    height: 0,
                    padding: 0
                  }
                }
              })()}
              onFocus={() => {
                this.setState({ focused: true })
              }}
              onBlur={() => {
                this.setState({ focused: false })
              }}
              ref={input => { this.input = input }}
              value={value}
              onChange={this.onChange}
              onKeyDown={this.onKeyDown}
            />
          </ul>
        </div>
      </Fragment>
    )
  }

  componentWillMount () {
    this.setState({
      items: this.props.searchText || []
    })
  }

  componentDidMount () {
    if (this.props.toggled) {
      setTimeout(() => {
        this.input.focus()
        this.setState({
          focused: true
        })
      }, 0)
    }
  }

  onChange = event => {
    this.setState({ value: event.target.value })
  }

  onKeyDown = event => {
    const { value, items } = this.state
    const { setSearchText } = this.props

    /** On enter */
    if  (event.keyCode === 13) {
      const { value } = event.target
      event.stopPropagation()

      if (value) {
        this.setState(state => ({
          items: Array.from(new Set([...state.items, value])), // Removes duplicates
          value: ''
        }), () => {
          setSearchText(this.state.items)
        })
      }
    }

    /** On backspace */
    if (event.keyCode === 8) {
      if (items.length && !value.length) {
        this.setState(state => ({
          items: state.items.slice(0, state.items.length - 1)
        }), () => {
          setSearchText(this.state.items)
        })
      }
    }
  }

  removeItem = index => {
    const { setSearchText } = this.props

    this.setState(state => ({
      items: state.items.filter((item, key) => key !== index)
    }), () => {
      setSearchText(this.state.items)
    })
  }

  onCloseButtonClick = () => {
    this.props.onToggle()
  }

  onSearchButtonClick = () => {
    this.props.onToggle()

    if (this.input) {
      /** Need to investigate setTimeout */
      setTimeout(() => {
        this.input.focus()
        this.setState({
          focused: true
        })
      }, 0)
    }
  }
}

/* Styles ======================================================================================= */
const CLASSNAMES = stylesheet({
  searchInnerWrapper: {
    background: 'white',
    height: 30,
    lineHeight: '30px',
    position: 'absolute',
    width: '50%',
    top: '50%',
    transform: 'translateY(-50%)'
  },
  searchOpenButton: {
    borderBottom: '2px solid rgb(230,230,230) !important',
    borderRadius: '0% !important',
    float: 'left',
    height: 30,
    marginRight: 15,
    width: 30,
  },
  searchCloseButton: {
    borderBottom: '2px solid rgb(230,230,230) !important',
    borderRadius: '0% !important',
    float: 'left',
    height: 30,
    width: 30,
  },
  searchHidden: {
    display: 'none'
  },
  searchTagContainer: {
    borderBottom: '2px solid rgb(230,230,230)',
    width: 'calc(100% - 40px)',
    background: 'white',
    flexWrap: 'wrap',
    display: 'flex',
    padding: '0 7.5px',
    margin: 0,
    right: 0,
    cursor: 'text',
    minHeight: 30,
    $nest: {
      '&.tag-blurred': {
        height: 30,
        overflow: 'hidden'
      }
    }
  },
  searchTagItems: {
    display: 'inline-block',
    padding: '2px 20px 2px 7.5px',
    marginRight: 5,
    marginBottom: 5,
    cursor: 'pointer',
    background: '#59acd9',
    fontSize: 11,
    lineHeight: '19px',
    borderRadius: 11,
    color: 'white',
    position: 'relative',
    $nest: {
      '.material-icons': {
        fontSize: 13,
        position: 'absolute',
        right: 4,
        top: '50%',
        transform: 'translateY(-50%)'
      }
    }
  },
  searchInput: {
    outline: 'none',
    border: 'none',
    flexGrow: 1,
    height: 28,
    padding: '0 5px'
  }
})

/* Export ======================================================================================= */
export default Search