/**
 * modules/cards/cards.jsx
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 * @flow
 */
import React, { Component } from 'react'
import { Field, FieldArray } from 'redux-form'
import type { FieldProps } from 'redux-form'
import { stylesheet } from 'typestyle'

/* Common ======================================================================================= */
import THEME from '../theme.js'

/* Components =================================================================================== */
import CardSection from './card-section'
import {
  Button,
  Checkbox,
  DateTimePicker,
  DebounceInput,
  Dropbox,
  DropdownList,
  FilterWrapper,
  FormSection,
  QuickAction,
  // Quill,
  Roll,
  TextField,
} from '..'
import { CHECKBOX_FILTER_ROLL_MODEL } from './checkbox-filter-roll-fields'

/* Types ======================================================================================== */
type CardModelType = [
  {
    /** React component for dropdown items */
    optionRenderer: any,
    /** React component for dropdown value */
    valueRenderer: any,
    /** Collect a certain set from data and populate to dropdown list */
    collect: { key: string, data: [] },
    /** Data set for dropdown list */
    data: string,
    defaultValue: any,
    displayLineBreak: boolean,
    /** Filter for dropdown list */
    filter: { key: string, data: [] },
    /** Filter dynamic let a dropdown list from a parent card alters child card's dropdown list */
    filterDynamic: (data: [], filter: {}) => [],
    filterDynamicEnabled: boolean,
    filterDynamicTarget: string,
    /** Generate label for react-select */
    generateLabel: Function,
    isFilter: boolean,
    isNumeric: boolean,
    isRequired: boolean,
    label: string,
    model: CardModelType,
    name: string,
    max: number,
    /** Placeholder text for text input */
    placeHolder: string,
    /** Search key for debounce input */
    searchKey: string,
    style: CSSRule,
    type: string,
    /** API URL for debounce input */
    url: string,
    validate: () => boolean
  }
]

type CardPropType = {
  contentStyle: CSSRule,
  data: {},
  disableFixedHeader: boolean,
  fields: *,
  filterTargets: *,
  fullHeight: boolean,
  isChild: boolean,
  label: string,
  model: *,
  noPadding: boolean,
  onDrop: () => void,
  resetFilterField: (field: string) => void
} & FieldProps

/* <Cards /> ==================================================================================== */
class Cards extends Component<*, *> {
  /* Types ====================================================================================== */
  props: CardPropType
  parent: any
  state: {
    /** Array of filter target objects for filtered dropdown components to filter upon. */
    filterTargets: [*],
    /** For tracking key of touched filter target  */
    filterTargetKey: string,
    isExpended: boolean
  }

  /* Class ====================================================================================== */
  state = {
    filterTargets: {},
    filterTargetKey: '',
    isExpended: true
  }

  render () {
    const {
      contentStyle,
      fields,
      label,
      meta: { error },
      model,
      noPadding,
      disableFixedHeader,
      isChild,
      fullHeight
    } = this.props
    const tools = []
    const modelIndex = {}
    let index = 0

    for (const key in model) {
      modelIndex[key] = index % THEME.colors.length
      const item = model[key]
      tools.push(
        <Button
          label={item.label}
          type='button'
          size='xs'
          icon={
            <span
              className={CLASSNAMES.buttonIcon}
              style={{
                background: THEME.colors[index++ % THEME.colors.length],
              }}
            />
          }
          onClick={() => {
            /** Scroll to bottom */
            const formBoundingRect = this.parent.form.getBoundingClientRect()
            window.scrollTo(0, window.scrollY + formBoundingRect.y + formBoundingRect.height - window.innerHeight / 2)

            fields.push({
              type: key,
              value: {}
            })
          }}
        />
      )
    }
    return (
      <FormSection
        title={label}
        tools={tools}
        noPadding={noPadding}
        fixedHeader={!disableFixedHeader}
        fixedHeaderOffset={-50}
        className={CLASSNAMES.card}
        ref={(parent) => { this.parent = parent }}
        style={
          isChild ? {
            marginBottom: 0,
            background: 'none',
            height: fullHeight ? '100%' : ''
          } : {
            background: 'none'
          }
        }
      >
        <div
          style={{
            ...contentStyle,
            position: 'relative'
          }}
          ref={(contentWrapper) => { this.contentWrapper = contentWrapper}}
        >
          <QuickAction
            items={(() => {
              if (tools) {
                return tools.map(element => {
                  return {
                    label: element.props.label,
                    onClick: element.props.onClick
                  }
                })
              } else {
                return []
              }
            })()}
            getParent={() => { return this.contentWrapper }}
          />
          {
            fields.length > 0 ? fields.map((field, key) => {
              return <CardSection
                key={`${key}_${fields.length}`}
                modelIndex={modelIndex[fields.get(key).type]}
                model={model[fields.get(key).type]}
                isExpended={this.state.isExpended}
                remove={() => {
                  fields.remove(key)
                }}
                id={`jams-${fields.name}[${key}]`}
                body={
                  <div className={CLASSNAMES.cardBody}>
                    <div className={CLASSNAMES.cardFields}>
                      {
                        (() => {
                          const form = model[fields.get(key).type].form

                          if (form) {
                            return <div className={CLASSNAMES.cardFormWrapper}>
                              {
                                form.map((formFields, key2) => {
                                  return <div
                                    className={CLASSNAMES.cardFormContainer}
                                    key={key2}
                                  >
                                    {this.renderFields(formFields, field, key)}
                                  </div>
                                })
                              }
                            </div>
                          }
                        })()
                      }
                    </div>
                    <div
                      style={{
                        display: 'inline-block',
                        width: '100%'
                      }}
                    >
                      {this.renderFields(model[fields.get(key).type].fields, field, key)}
                    </div>
                  </div>
                }
              />

            }) : <div>
              <span className={CLASSNAMES.cardEmpty}>
                <span className='base'>
                    Empty
                </span>
              </span>
            </div>
          }
        </div>
        {error && <li className='error'>{error}</li>}
      </FormSection>
    )
  }

  /**
   * When removing card, filterTargets will repopulate. Data for dropdown are filtered on
   * componentWillMount. However, redux-form calls componentWillMount when deleting as well.
   * Therefore, need to manually repopulate like following.
   */
  componentWillReceiveProps (nextProps: CardPropType) {
    const { fields } = this.props
    const { filterTargets, filterTargetKey } = this.state

    if (fields.length !== nextProps.fields.length) {
      const newFilterTargets = []

      nextProps.fields.getAll().map(field => {
        for (const key in filterTargets) {
          const value = field.value[filterTargetKey]
          const target = filterTargets[key][filterTargetKey]

          if (value && target && value._id === filterTargets[key][filterTargetKey]._id) {
            newFilterTargets.push({ [filterTargetKey]: value })
          }
        }
      })

      this.setState({ filterTargets: newFilterTargets })
    }
  }

  renderFields (modelFields: CardModelType, field: string, key: number) {
    const { data, fields, resetFilterField } = this.props

    if (fields.length === 0) {
      return null
    }

    return modelFields.map((modelField, key2) => {
      switch (modelField.type) {
      case 'DropdownList': {
        const newData = [...data[modelField.data]]

        /** Filter */
        if (modelField.filter) {
          modelField.filter.data.map(filt => {
            for (const index in newData) {
              if (newData[index][modelField.filter.key] === filt) {
                delete newData[index]
              }
            }
          })
        }

        /** Collect, opposite of filter */
        if (modelField.collect) {
          modelField.collect.data.map(col => {
            for (const index in newData) {
              if (newData[index][modelField.collect.key] !== col) {
                delete newData[index]
              }
            }
          })
        }

        const component = <Field
          component={DropdownList}
          label={modelField.label}
          name={`${field}.value.${modelField.name}`}
          textField='name'
          validate={modelField.validate}
          // optionRenderer={modelField.optionRenderer}
          // valueRenderer={modelField.valueRenderer}
          generateLabel={modelField.generateLabel}
          valueField='_id'
          data={(() => {
            const { filterTargets } = this.props

            if (modelField.filterDynamic && modelField.filterDynamicTarget && filterTargets) {
              return modelField.filterDynamic(newData, filterTargets[modelField.filterDynamicTarget]).map(option => {
                return {
                  value: option.value ? option.value : option,
                  label: option.label
                }
              })
            }
            return newData.map(option => {
              return {
                value: option.value ? option.value : option,
                label: option.label
              }
            })
          })()}
          onInitialFilterChange={(value) => {
            const { filterTargets, filterTargetKey } = this.state
            if (modelField.filterDynamicEnabled) {
              if (filterTargets[key]) {
                const target = filterTargets[key][filterTargetKey]

                if (target && value && value._id === target._id) {
                  this.populateFilterTargets(filterTargets, key, modelField.name, value)
                }
              } else {
                this.populateFilterTargets(filterTargets, key, modelField.name, value)
              }
            }
          }}
          onFilterChange={(value) => {
            const filterTargets = { ...this.state.filterTargets }

            if (modelField.filterDynamicEnabled) {
              this.populateFilterTargets(filterTargets, key, modelField.name, value)
            }
          }}
          isRequired={modelField.isRequired}
          key={key2}
        />

        if (modelField.isFilter) {
          return <FilterWrapper
            values={fields.get(key).value}
            resetField={resetFilterField}
            key={key2}
          >
            {component}
          </FilterWrapper>
        }
        return component
      }
      case 'TextField': {
        const component = <Field
          name={`${field}.value.${modelField.name}`}
          type='text'
          component={TextField}
          label={modelField.label}
          validate={modelField.validate}
          placeholder={modelField.placeHolder}
          defaultValue={modelField.defaultValue}
          key={key2}
          isRequired={modelField.isRequired}
        />
        if (modelField.isFilter) {
          return <FilterWrapper
            isNumeric={modelField.isNumeric}
            values={fields.get(key).value}
            resetField={resetFilterField}
            key={key2}
          >
            {component}
          </FilterWrapper>
        }
        return component
      }
      case 'DebounceInput': {
        const component = <Field
          component={DebounceInput}
          label={modelField.label}
          name={`${field}.value.${modelField.name}`}
          placeholder={modelField.placeHolder}
          searchKey={modelField.searchKey}
          type='text'
          url={modelField.url}
          validate={modelField.validate}
          generateLabel={modelField.generateLabel}
          key={key2}
        />

        if (modelField.isFilter) {
          return <FilterWrapper
            values={fields.get(key).value}
            resetField={resetFilterField}
            key={key2}
          >
            {component}
          </FilterWrapper>
        }

        return component
      }
      case 'Checkbox':
        /** Return checkbox as Roll if it is a filter */
        if (modelField.isFilter) {
          return <Field
            key={key2}
            label={modelField.label}
            name={`${field}.value.${modelField.name}`}
            component={Roll}
            model={CHECKBOX_FILTER_ROLL_MODEL}
          />
        }

        return (
          <Field
            component={Checkbox}
            label={modelField.label}
            name={`${field}.value.${modelField.name}`}
            style={modelField.style}
            key={key2}
          />
        )
      case 'Quill':
        return (
          <Field
            component={Quill}
            label={modelField.label}
            name={`${field}.value.${modelField.name}`}
            key={key2}
            isRequired={modelField.isRequired}
          />
        )
      case 'DateTimePicker':
        return (
          <Field
            component={DateTimePicker}
            defaultValue={modelField.defaultValue}
            label={modelField.label}
            name={`${field}.value.${modelField.name}`}
            displayTime={false}
            type='text'
            validate={modelField.validate}
            key={key2}
          />
        )
      case 'Dropbox': {
        return (
          <FieldArray
            label={modelField.label}
            max={modelField.max}
            name={`${field}.value.${modelField.name}`}
            component={Dropbox}
            onDrop={this.props.onDrop}
            key={key2}
          />
        )
      }
      case 'Cards':
        return (
          <FieldArray
            component={Cards}
            data={data}
            disableFixedHeader={true}
            filterTargets={this.state.filterTargets[key]}
            isChild={true}
            label={modelField.label}
            model={modelField.model}
            name={`${field}.value.${modelField.name}`}
            noPadding={true}
            validate={modelField.validate}
            contentStyle={{
              ...modelField.style,
              padding: 20,
              background: '#e6e6e6'
            }}
            resetFilterField={resetFilterField}
            key={key2}
          />
        )
      }
    })
  }

  populateFilterTargets (filterTargets: *, key: number, targetKey: string, value: *) {

    filterTargets[key] = {}
    filterTargets[key][targetKey] = value

    this.setState({
      filterTargets: {
        ...this.state.filterTargets,
        ...filterTargets
      },
      filterTargetKey: targetKey
    })
  }
}

/* Styles ======================================================================================= */
const CLASSNAMES = stylesheet({
  card: {
    paddingLeft: '0px !important',
    paddingRight: '0px !important',
    paddingTop: '0px !important',
    background: 'none !important',
    marginBottom: '0px !important',
    $nest: {
      '& .panel:last-of-type': {
        marginBottom: '0 !important'
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
    height: 18,
    lineHeight: '18px',
  },
  cardRemove: {
    border: 'none',
    float: 'right',
    outline: 'none',
    background: 'none',
    color: '#ff8787',
    height: 24,
    width: 24
  },
  cardFields: {
    position: 'relative'
  },
  cardBody: {
    padding: 15,
    borderLeft: '5px solid rgb(241,241,241)',
  },
  cardFormWrapper: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-between'
  },
  cardFormContainer: {
    width: 'calc(50% - 20px)',
  },
  cardEmpty: {
    display: 'inline-block',
    background: 'white',
    boxShadow: '1px 1px 1px 1px rgba(0,0,0,0.07)',
    height: 100,
    position: 'relative',
    textAlign: 'center',
    width: '100%',
    $nest: {
      '& .base': {
        fontSize: 12,
        fontWeight: 700,
        left: '50%',
        position: 'absolute',
        top: 'calc(50%)',
        transform: 'translate(-50%, -50%)'
      }
    }
  },
  button: {
    borderColor: 'white !important',
    marginBottom: '0 !important',
    $nest: {
      '& .label': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'white !important',
        color: 'rgb(60,60,60) !important',
      },

    }
  },
  buttonIcon: {
    display: 'inline-block',
    width: 6,
    height: 6,
    borderRadius: '50%',
    left: 0,
    top: 0,
    marginRight: 5
  }
})

/* Exports ====================================================================================== */
export default Cards