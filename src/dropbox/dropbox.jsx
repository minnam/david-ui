/**
 * modules/dropbox/dropbox.jsx
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 *  Derek Hirotsu, dhirotsu@ventanaconstruction.com
 * @flow
 */
import * as React from 'react'
import { classes, stylesheet } from 'typestyle'
import { Field } from 'redux-form'
import Dropzone from 'react-dropzone'

/* Components =================================================================================== */
import Button from '../button/button'
import DropdownList from '../dropdown/dropdown'
import FieldWrapper from '../field-wrapper/field-wrapper'
import validation from '../validation'

/* Constants ==================================================================================== */
const ATTACHMENT_TYPES = [
  {
    value: 'Site Photo',
    label: 'Site Photo'
  },
  {
    value: 'Document',
    label: 'Document'
  }
]

/* <Dropbox /> ================================================================================== */
export default class Dropbox extends React.Component<*, *> {

  state: {
    dragOver: boolean,
    files: []
  }

  colSize: number = 4
  state = {
    dragOver: false,
    files: []
  }

  render () {
    const {
      fields,
      label,
      meta,
      max = 8
    } = this.props
    const { files, dragOver } = this.state

    return (
      <FieldWrapper
        label = {`${label} (${files.length}/${max})`}
        id={fields.name}
        {...meta}
      >
        <Dropzone
          accept=".jpeg,.jpg,.png,.pdf"
          className={classes(CLASSNAMES.parentBase, dragOver && CLASSNAMES.parentDragOver)}
          name={fields.name}
          onDrop={this.onDrop}
          onDragOver={event => {
            this.setState({
              dragOver: true
            })
          }}
        >
          {
            () => {
              if (!files.length) {
                return <span className={CLASSNAMES.instruction}>
                  Drop images here or click to upload images
                </span>
              }
              return (
                <div className={CLASSNAMES.itemContainer}>
                  {
                    files.map((file, key) => {
                      return (
                        <div
                          className={CLASSNAMES.itemBase}
                          key={key}
                          onClick={event => {
                            event.stopPropagation()
                          }}
                        >
                          <span className={CLASSNAMES.itemContentWrapper}>
                            <span className={CLASSNAMES.spanFlex}>
                              <label className={CLASSNAMES.label}>
                                Type
                              </label>
                              <span className={CLASSNAMES.itemType}>
                                <Field
                                  type='text'
                                  component={DropdownList}
                                  data={ATTACHMENT_TYPES}
                                  horizontal={true}
                                  name={`${fields.name}[${key}].type`}
                                  validate={[validation.required]}
                                  onChange={(event, value) => {
                                    const _files = [ ...this.state.files ]

                                    _files[key].type = value
                                    this.setState({ files: _files })
                                  }}
                                />
                              </span>
                              <span className={CLASSNAMES.spanFlex}>
                                <label className={CLASSNAMES.label}>
                                    File
                                </label>
                                <span className={CLASSNAMES.itemName}>
                                  <a
                                    href={
                                      file.preview || process.env.API_URL
                                        + file.path.replace('public', '')
                                    }
                                    target='_blank'
                                  >
                                    {file.name || file.originalname}
                                  </a>
                                </span>
                              </span>
                            </span>
                            <Button                              
                              type='button'
                              className={CLASSNAMES.remove}
                              onClick={event => {
                                this.setState({
                                  files: files.filter((_, i) => i !== key)
                                })
                                fields.remove(key)
                              }}
                              icon={ <i className='material-icons'>close</i> }
                              circle
                            />

                          </span>
                        </div>
                      )
                    })
                  }
                </div>
              )
            }
          }
        </Dropzone>
      </FieldWrapper>
    )
  }

  componentWillMount () {
    if (window.matchMedia('(min-width: 1600px)').matches) {
      this.colSize = 6
    } else if (window.matchMedia('(min-width: 1500px)').matches) {
      /* the viewport is less than 400 pixels wide */
      this.colSize = 4
    }
  }

  componentDidMount () {
    const { fields } = this.props
    if (fields.getAll()) {
      this.setState({
        files: [...fields.getAll()]
      })
    }
  }

  componentWillReceiveProps (nextProps) {
    const { fields } = nextProps

    if (fields.getAll()) {
      this.setState({
        files: [...fields.getAll()]
      })
    }
  }

  onDrop = (acceptedFiles: any): void => {
    const { onDrop, fields, max = 8 } = this.props
    const { files } = this.state
    const allFiles = [
      ...files,
    ].splice(0, max)

    if (acceptedFiles.length && allFiles.length < max) {
      onDrop([...acceptedFiles].splice(0, max - allFiles.length), (processedFiles) => {
        processedFiles.map((file) => {
          file.type = ATTACHMENT_TYPES[0].value
          return file
        })

        this.setState({
          files: [
            ...files,
            ...processedFiles
          ]
        }, () => {
          fields.removeAll()
          this.state.files.map(file => {
            fields.push(file)
          })
        })
      })
    }
  }
}

/* Style ======================================================================================== */
const CLASSNAMES = stylesheet({
  instruction: {
    fontSize: 12,
    fontWeight: 700,
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  itemBase: {
    background: 'white',
    boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.07)',
    color: 'rgba(30, 30, 30, 1)',
    cursor: 'default',
    margin: '0px 5px 5px 5px',
    width: '100%',
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    $nest: {
      '&>*:last-child': {
        marginBottom: '0px',
      },
    },
  },
  itemContentWrapper: {
    alignItems: 'center',
    borderBottom: '1px solid rgba(228, 228, 228, 1)',
    display: 'flex',
    height: 37,
    justifyContent: 'space-between',
    padding: '0px 10px 0px 10px',
    width: '100%',
  },
  itemName: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: 'calc(100% - 30px)',
  },
  itemType: {
    width: '30%',
  },
  label: {
    float: 'left',
    fontSize: 12,
    marginBottom: 2,
    paddingRight: 15,
    textAlign: 'left',
  },
  parentBase: {
    background: 'rgba(247, 247, 247, 1)',
    border: '1px dashed rgba(229, 230, 231, 1)',
    cursor: 'pointer',
    minHeight: 75,
    padding: 15,
    width: '100%',
  },
  parentDragOver: {
    borderColor: 'rgba(26, 179, 148, 1)',
  },
  remove: {
    color: 'rgba(255, 135, 135, 1)',
    transform: 'translate(25%)',
  },
  spanFlex: {
    display: 'flex',
    alignItems: 'center',
    width: '50%'
  },
})