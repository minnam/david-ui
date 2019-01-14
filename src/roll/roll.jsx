/**
 * modules/roll/roll.jsx
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 * @flow
 */
import * as React from 'react'
import { style, classes } from 'typestyle'
import { Field } from 'redux-form'
import type { FieldProps } from 'redux-form'

/* Components =================================================================================== */
import {
  FieldWrapper,
  TextField
} from '../'

/* <Roll /> ================================================================================= */
export default class Roll extends React.Component<*, *> {
  props: {
    fullwidth: boolean,
    group: boolean,
    input: *,
    label: string,
    normalize: Function,
    placeholder: string,
    type: string,
    style: CSSRule,
    model: *,
    meta: *,
    onDrop: Function
  } & FieldProps

  state: {
    active: boolean,
    checked: boolean,
    hover: boolean
  }

  state = {
    hover: false,
    active: false,
    index: 0
  }

  render () {
    const {
      fullwidth,
      input,
      label,
      meta,
      model,
      style
    } = this.props
    const {
      hover,
      active,
      index
    } = this.state

    const className = `${hover ? 'hover' : ''}${active ? ' active' : ''}`
    let iconParentStyle
    let iconStyle

    if (model[index].iconParentStyle) {
      iconParentStyle = model[index].iconParentStyle
    }

    if (model[index].iconStyle) {
      iconStyle = model[index].iconStyle
    }

    return (
      <FieldWrapper
        className={classes(fullwidth ? CLASSNAMES.fullwidthParent : CLASSNAMES.parent, 'no-select')}
        id={`jams-${input.name}`}
        style={{
          marginBottom: 0,
          ...style
        }}
        {...meta}
        error={false}
      >
        <div
          className={classes(CLASSNAMES.base, 'no-select')}
          onMouseEnter= {() => {
            this.setState({hover: true})
          }}
          onMouseLeave= {() => {
            this.setState({hover: false})
          }}
          onMouseDown={() => {
            this.setState({
              active: true
            })
          }}
          onMouseUp={() => {
            const _index = (index + 1) % model.length

            input.onChange({ index: _index })

            this.setState({
              active: false,
              index: _index
            })
          }}
        >

          <div className={classes(CLASSNAMES.checkboxWrapper, className)}>
            <span
              className={classes('checkbox1', active ? 'checkbox-active' : '')}
              style={{
                border: '2px solid rgb(220,220,220)',
                ...iconParentStyle
              }}
            >
              <i
                className='material-icons'
                style={{
                  ...iconStyle
                }}
              >
                {model[index].icon}
              </i>
            </span>
          </div>
          <label className={CLASSNAMES.label}>{label}</label>
        </div>
        <div
          style={{
            display: model[index].fields ? 'flex' : 'none',
            alignItems: 'top',
          }}
        >
          <div
            style={{
              width: 33
            }}
          />
          <div
            style={{
              width: '100%',
              borderTop: '2px solid rgb(202,202,202)',
              paddingTop: 3
            }}
          >
            {
              (() => {
                if (model[index].fields && model[index].fields.length > 0) {
                  return model[index].fields.map((field, key) => {
                    switch (field.type) {
                    case 'TextField':
                      return <Field
                        name={`${input.name}.${field.name}`}
                        type='text'
                        component={TextField}
                        label={field.label}
                        validate={field.validate}
                        placeholder={field.placeHolder}
                        defaultValue={field.defaultValue}
                        normalize={field.normalize}
                        help={field.help}
                        labelStyle={{
                          color: 'rgb(170,170,170)'
                        }}
                        key={key}
                      />
                    // case 'Dropbox':
                    //   return <FieldArray
                    //     label={field.label}
                    //     max={field.max}
                    //     name={`${field}.value.${field.name}`}
                    //     key={key}
                    //   />
                    }
                  })
                }
              })()
            }
          </div>
        </div>
      </FieldWrapper>
    )
  }

  componentDidMount () {
    const { meta } = this.props

    if (meta.initial) {
      if (meta.initial.index) {
        this.setState({
          index: parseInt(meta.initial.index)
        })
      }
    }
  }
}

/* Styles ======================================================================================= */
const CLASSNAMES = {
  parent: style({
    cursor: 'pointer',
    display: 'inline-block',
    marginRight: 15,
  }),
  fullwidthParent: style({
    marginRight: 0,
    cursor: 'pointer',
  }),
  label: style({
    display: 'inline-block',
    maxWidth: '100%',
    fontWeight: 700,
    paddingLeft: 10,
    cursor: 'pointer'
  }),
  base: style({
    display: 'inline-block',
  }),
  checkHelper: style({
    background: 'rgb(255, 255, 255)',
    border: 0,
    display: 'block',
    height: '100%',
    left: '0%',
    margin: 0,
    opacity: 0,
    padding: 0,
    position: 'absolute',
    top: '0%',
    width: '100%'
  }),
  checkboxWrapper: style({
    border: 'none',
    cursor: 'pointer',
    display: 'inline-block',
    height: 22,
    margin: 0,
    padding: 0,
    position: 'relative',
    verticalAlign: 'middle',
    width: 22,
    $nest: {
      '& .checkbox1': {
        alignItems: 'center',
        display: 'flex',
        height: 22,
        justifyContent: 'center',
        left: '50%',
        position: 'absolute',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        transition: '.05s all',
        width: 22,
        $nest: {
          '& i': {
            fontSize: 18
          }
        }
      },
      '& .checkbox-active': {
        width: 19,
        height: 19,
        $nest: {
          '& i': {
            fontSize: 15
          }
        }
      },
    }
  }),
  input: style({
    marginBottom: 5,
    opacity: 0,
    position: 'absolute'
  })
}