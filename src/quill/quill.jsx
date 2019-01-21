/**
 * modules/quill/quill.jsx
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 *  Derek Hirotsu, dhirotsu@ventanaconstruction.com
 *
 * @flow
 */
import React from 'react'
import ReactQuill from 'react-quill'
import { stylesheet } from 'typestyle'
// $FlowFixMe
import 'react-quill/dist/quill.snow.css'

/* Components =================================================================================== */
import FieldWrapper from '../field-wrapper/field-wrapper'

/* Constants ==================================================================================== */
const MODULES = {
  toolbar: [
    [ 'bold', 'italic', 'underline' ],
    [
      { 'list': 'ordered' },
      { 'list': 'bullet' },
      { 'indent': '-1' },
      { 'indent': '+1' }
    ],
    [
      { 'color': [] },
    ],
    ['link', 'clean']
  ],
}

/* <Quill /> ==================================================================================== */
const Quill = (props: {
  isRequired: boolean,
  input: *,
  /** Used by the field wrappper as the label for the input. */
  label: string,
  meta: *
}) => {
  const {
    isRequired,
    input,
    label,
    meta
  } = props

  return (
    <FieldWrapper
      label = {label}
      labelAlign = 'top'
      id={input.name}
      isRequired={isRequired}
      {...meta}
    >
      <div
        className={CLASSNAMES.quillWrapper}
        onKeyDown={event => { event.stopPropagation() }}
      >
        <ReactQuill
          id={`jams-${input.name}`}
          {...input}
          onBlur={(range, source, quill) => {
            input.onBlur(quill.getHTML())
          }}
          onChange={(newValue, delta, source) => {
            if (source === 'user') {
              input.onChange(newValue)
            }
          }}
          modules={MODULES}
          theme='snow'
        />
      </div>
    </FieldWrapper>
  )
}

export default Quill

/* Styles ======================================================================================= */
const CLASSNAMES = stylesheet({
  quillWrapper: {
    $nest: {
      '& .ql-container, .ql-editor': {
        minHeight: 200,
      },
      '& .ql-editor': {
        maxHeight: 200
      },
    },
  }
})