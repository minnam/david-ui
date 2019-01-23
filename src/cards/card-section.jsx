/**
 * modules/cards/card-section.jsx
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 * @flow
 */
import React, { Component } from 'react'
import { stylesheet, classes } from 'typestyle'

/* Common ======================================================================================= */
import THEME from '../theme.js'

/* Components =================================================================================== */
import Button from '../button/button'

/* <CardSection /> ============================================================================== */
export default class CardSection extends Component<*, *> {
  /* Types ====================================================================================== */
  props: {
    body: *,
    children: [],
    model: *,
    modelIndex: *,
    remove: *,
    id: string
  }

  /* Class ====================================================================================== */
  state = {
    finishedAnimation: false,
    isExpanded: true
  }

  render () {
    const { body, model, modelIndex, remove, id } = this.props
    const { isExpanded } = this.state

    return (
      <div className={CLASSNAMES.cardSection} id={id}>
        <div
          className={classes(CLASSNAMES.cardHeading)}
          style={{ borderLeft: `5px solid ${THEME.colors[modelIndex]}` }}
        >
          <span className={CLASSNAMES.cardText}>
            <span
              className='icon no-select'
              onClick={() => {
                this.setState({
                  isExpanded: !this.state.isExpanded
                })
              }}
            >
              <i className='material-icons'>
                {
                  (() => {
                    if (isExpanded) {
                      return 'expand_less'
                    } else {
                      return 'expand_more'
                    }
                  })()
                }
              </i>
            </span>
            <span className='text'>
              {`${model.heading}`}
            </span>
          </span>
          <Button
            className={CLASSNAMES.cardRemove}
            type='button'
            role='circle'
            onClick={remove}
            style={{
              padding: '5px 7px',
              color: ''
            }}
            icon={
              <i className={ classes('material-icons') }>
                close
              </i>
            }
            primary
          />
        </div>
        {
          (() => {
            if (this.state.isExpanded) {
              return body
            }
          })()
        }
      </div>
    )
  }
}

/* Styles ======================================================================================= */
const CLASSNAMES = stylesheet({
  cardSection: {
    background: 'white',
    border: 'none',
    borderRadius: 0,
    boxShadow: '1px 1px 1px 1px rgba(0,0,0,0.07)',
    marginBottom: 15,
    $nest: {
      '&:last-of-type': {
        marginBottom: 0
      }
    }
  },
  cardHeading: {
    backgroundColor: 'white',
    padding: '10px 15px',
    height: 40,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cardIndex: {
    color: 'rgb(228, 228, 228)',
    float: 'left',
    fontWeight: 700
  },
  cardText: {
    float: 'left',
    fontWeight: 700,
    lineHeight: '18px',
    display: 'flex',
    $nest: {
      '.icon': {
        height: 24,
        display: 'inline-block',
        cursor: 'pointer'
      },
      '.text': {
        lineHeight: '24px'
      }
    }
  },
  cardRemove: {
    transform: 'translate(25%)',
    color: '#ff8787',
  },
})
