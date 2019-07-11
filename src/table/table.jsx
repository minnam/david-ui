/**
 * modules/table/table.jsx
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 * @flow
 */
import React, { Component } from 'react'
import { classes, style, stylesheet } from 'typestyle'

/* Common ======================================================================================= */
import GLOBAL_CLASSNAMES from '../classnames'

/* Components =================================================================================== */
import ANIMATIONS from '../utils/animations'
import Col from '../table/col'

/* Types ======================================================================================== */
import type { Props as SearchProps } from './search'
import type { Element } from 'react'

export const search = (target: Element<typeof Col>, key: string) => {
  if (Array.isArray(target) && target.length > 1) {
    return target.find((element) => {
      if (element.props.children) {
        return `${element.props.children}`.toUpperCase().includes(key.toUpperCase())
      } else {
        return false
      }
    })
  }
}

const NO_PRINT = style({
  color: 'red',
  $nest: {
    '@media print': {
      display: 'none !important'
    }
  }
})

/* <Table /> ==================================================================================== */
class Table extends Component<*, *> {
  /* Prop Types ================================================================================= */
  props: {
    /** Row Components */
    children: [],
    /** Class name for parent wrapper */
    className: string,
    /** Display menu button on far right */
    displayActions: boolean,
    /** Display sub menu */
    displaySubMenu: boolean,
    displayFixedHeader: boolean,
    /** Display toggle button on far left */
    displayToggle: boolean,
    /** Display message that table is empty or leave table blank */
    displayEmpty: boolean,
    /** Pixel amount of offset before toggling fixed header */
    fixedHeaderOffset: number,
    /** <th /> contents and size */
    headers: [{
        name: string,
        /**
         * size is relative (it does not have to be sum of 1)
         * ex. .5, .5, 1 will be 25% 25% 50%
        */
        field: string,
        size: number,
        className: string,
        style: CSSRule,
        highlight: boolean
    }],
    /** onClick function passed to table headers */
    headerOnClick: function,
    /** id for parent wrapper */
    id: string,
    /** Search text to filter rows */
    searchText: string,
    /** Search text callback */
    setSearchText: $PropertyType<SearchProps, 'setSearchText'>,
    /** Field currently being sorted */
    sortedField: string,
    /** Icon to be displayed next to header of field being sorted */
    sortIcon: String,
    /** Style fore parent wrappper */
    style: CSSRule,
    /** Title for <Toolbar /> */
    title: string,
    /** Contents on far right for <Toolbar /> */
    tools: *
  }

  /* State Types ================================================================================ */
  state: {
    fixedHeaderToggled: boolean,
    searchToggled: boolean
  }

  /* Class Types ================================================================================ */
  debounceToggle: TimeoutID | null
  table: HTMLDivElement

  /* Default Props ============================================================================== */
  static defaultProps = {
    displaySubMenu: false,
    displayFixedHeader: true,
    tools: []
  }

  /* State ====================================================================================== */
  state = {
    fixedHeaderToggled: false,
    searchToggled: false,
    loaded: false
  }

  render () {
    const {
      className,
      displaySubMenu,
      id,
      style,
      headers
    } = this.props

    return (
      <div
        className={
          classes(
            className,
            displaySubMenu ? CLASSNAMES.tableSubMenuWrapper : null
          )
        }
        id={id}
      >
        { headers ? this.renderFixedHeader() : null}
        {/* Animation Wrapper */}
        <div
          className= {classes(GLOBAL_CLASSNAMES.wrapperContent)}
          style={style}
        >
          {/* Table Wrapper */}
          <div
            className={CLASSNAMES.tableWrapper}
            ref={(table) => {
              if (table) {
                this.table = table
              }
            }}
          >
            <table className={CLASSNAMES.table}>
              {headers ? this.renderHeader() : null}
              {this.renderBody()}
            </table>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount () {
    window.addEventListener('scroll', this.toggleFixedHeader)
    this.setState({ loaded: true })
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.toggleFixedHeader)

    if (this.debounceToggle) {
      clearTimeout(this.debounceToggle)
    }
  }

  toggleFixedHeader = () => {
    const { fixedHeaderOffset = 0 } = this.props

    if (this.debounceToggle) {
      clearTimeout(this.debounceToggle)
    }

    this.debounceToggle = setTimeout(() => {
      const position = this.table.getBoundingClientRect().top + fixedHeaderOffset

      if (this.table && position <= 0) {
        this.setState({ fixedHeaderToggled: true })
      } else {
        this.setState({ fixedHeaderToggled: false })
      }

      this.debounceToggle = null
    }, 100)
  }

  renderFixedHeader () {
    const {
      displayActions,
      displayFixedHeader,
      displayToggle,
      headers,
    } = this.props
    const { fixedHeaderToggled } = this.state

    if (fixedHeaderToggled && displayFixedHeader) {
      return (
        <div className={classes(ANIMATIONS.fadeInDown, CLASSNAMES.tableFixedHeader, 'no-print', 'no-select', NO_PRINT)}>
          <table className={CLASSNAMES.table}>
            <thead>
              <tr>
                {
                  (() => {
                    if (displayToggle) {
                      return <th style={{ width: 54, display: 'inline-block' }}><span className={CLASSNAMES.tableEmptyCell}/></th>
                    }
                  })()
                }
                {
                  headers.map((header, key) => {
                    return (
                      <th
                        key={key}
                        className={classes(CLASSNAMES.tableFixedTh, header.className)}
                        style={{
                          width: `${header.size * 100}%`,
                          ...header.style
                        }}
                      >
                        <span>
                          { header.name }
                        </span>
                      </th>
                    )
                  })
                }
                {
                  (() => {
                    if (displayActions) {
                      return <th style={{ width: 54, display: 'inline-block' }}><span className={CLASSNAMES.tableEmptyCell}/></th>
                    }
                  })()
                }
              </tr>
            </thead>
          </table>
        </div>
      )
    } else {
      return null
    }
  }

  renderHeader () {
    const {
      displayToggle,
      headerOnClick,
      headers,
      sortedField,
      sortIcon
    } = this.props

    return <thead>
      <tr>
        {
          (() => {
            if (displayToggle) {
              return <th />
            }
          })()
        }
        {
          headers.map((header, key) => {
            if (header.name) {
              return (
                <th
                  key={key}
                  className={header.className}
                  style={{
                    cursor: headerOnClick && header.field ? 'pointer' : '',
                    width: `${header.size * 100}%`,
                    position: 'relative',
                    ...header.style
                  }}
                  onClick={
                    () => {
                      if (header.field) {
                        headerOnClick(header.field)
                      }
                    }
                  }
                >
                  {
                    (() => {
                      if (header.highlight) {
                        return <span className={ CLASSNAMES.tableHighlight }/>
                      }
                    })()
                  }
                  <span>
                    { header.name }
                    { sortedField === header.field &&
                      <i
                        className='material-icons'
                        style={{
                          position: 'absolute',
                          top: '-4px'
                        }}
                      >
                        { sortIcon }
                      </i>
                    }
                  </span>
                </th>
              )
            }
          })
        }
      </tr>
    </thead>
  }

  renderBody () {
    const { children, displayEmpty = false, displayToggle, headers, searchText  } = this.props
    const emptyRow = []
    let colspan = 1

    if (headers) {
      headers.map(h => {
        emptyRow.push(<td>-</td>)
      })
    }

    if (displayEmpty) {
      if (Array.isArray(children) && !children.length || !children) {
        return <tbody>
          <tr>
            { emptyRow.length ? emptyRow : <td>No data</td> }
          </tr>
        </tbody>
      } 
    }

    return <tbody>
      {
        (() => {
          if (Array.isArray(children)) {
            return children.map((child, key) => {
              if (child && child.props) {
                const colChildren = child.props.children

                if (searchText) {
                  const match = search(colChildren, searchText)

                  if (match) {
                    return React.cloneElement(child, { key, displayToggle })
                  }

                } else {
                  return React.cloneElement(child, { key, displayToggle })
                }
              }
            })
          } else {
            return children
          }
        })()
      }
    </tbody>
  }
}

/* Styles ======================================================================================= */
export const CLASSNAMES = stylesheet({
  tableEmptyCell: {
    display: 'inline-block',
    width: 37
  },
  tableWrapper: {
    display: 'inline-block',
    width: '100%'
  },
  table: {
    width: '100%',
    backgroundColor: 'transparent',
    borderCollapse: 'collapse',
    borderSpacing: 0,
    marginBottom: 20,
    maxWidth: '100%',
    float: 'right',
    fontSize: 13,
    $nest: {
      '& tbody': {
        background: 'white'
      },
      '& thead > tr > th': {
        color: 'rgb(41, 54, 66)'
      },
      '& tbody > tr > td': {
        borderBottom: '1px solid rgb(235,235,235)',
        borderTop: 'none !important',
        height: 35,
        lineHeight: '30px',
        padding: '12px 15px',
        // textAlign: 'left',
        verticalAlign: 'top !important',
        '@media print': {
          padding: '0px 15px !important',
        }
      },
      '& tr': {
        width: '100%',
      },
      '& th': {
        paddingLeft: 15,
        paddingTop: 0,
        paddingBottom: 15,
      },
      '& th.fixed-th': {
        paddingTop: '11px !important',
        paddingBottom: '3px !important',
      },
      '& th.fixed-th > span': {
        display: 'inline-block',
        width: '100%',
      },
      '& th > span': {
        display: 'inline-block',
        width: '100%'
      },
      '& tbody > tr > td.pr': {
        color: 'rgb(60,60,60) !important',
        fontWeight: 600
      },
      '@media print': {
        marginBottom: '15px !important'
      },
    }
  },
  tableSubMenuWrapper: {
    $nest: {
      '& .table': {
        width: 'calc(100% - 160px)',
        transition: '.25s ease-in-out all'
      },
      '& .fixed-header': {
        left: 220,
        width: 'calc(100% - 220px)',
        transition: '.25s ease-in-out all'
      }
    }
  },
  tableFixedHeader: {
    background: '#efefef',
    borderBottom: '1px solid #d1d1d1',
    height: 40,
    padding: '0 15px',
    position: 'fixed',
    top: 60,
    left: 70,
    width: 'calc(100% - 70px)',
    zIndex: 1,
    $nest: {
      '@media print': {
        display: 'none !important'
      }
    }
  },
  tableFixedTh: {
    paddingTop: '11px !important',
    paddingBottom: '3px !important',
  },
  tableHighlight: {
    background: '#fc4e4e',
    borderRadius: '50%',
    display: 'inline-block',
    height: 10,
    left: 0,
    position: 'absolute',
    top: 5,
    width: '10px !important',
  }
})

/* Export ======================================================================================= */
export default Table