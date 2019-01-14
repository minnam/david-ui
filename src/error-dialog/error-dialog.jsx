/**
 * modules/error-dialog/error-dialog.jsx
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 */
import React from 'react'

/* Components =================================================================================== */
import {
  ANIMATIONS,
  Button
} from '../'

class ErrorDialog extends React.Component<*, *> {
  state = {
    index: 0
  }

  render () {
    const fields = this.props
    const { labels } = this.props
    const { index } = this.state
    const errors = []

    Object.keys(fields).map(key => {
      const field = fields[key]
      if (field.meta && field.input) {
        if (field.meta.error && field.meta.touched) {

          errors.push({
            name: field.input.name,
            label: labels[field.input.name],
            id: `jams-${field.input.name}`
          })

        } else if (Array.isArray(field.meta.error)) {

          for (const key in field.meta.error) {
            if (field.meta.error[key] && document.getElementById(`jams-${field.input.name}[${key}]`)) {
              errors.push({
                name: `${field.input.name}[${key}]`,
                label: labels[field.input.name],
                id: `jams-${field.input.name}[${key}]`
              })
            }
          }

        }
      }
    })

    if (errors.length === 0) {
      return null
    }

    return <div
      className={ANIMATIONS.fadeInUp}
      style={{
        width: 400,
        position: 'fixed',
        padding: 15,
        background: '#ea6060',
        bottom: 15,
        left: 'calc(50% - 70px)',
        color: 'white',
        transform: 'translate(-50%, 0)',
        boxShadow: '1px 1px 5px 1px rgba(0,0,0,0.2)',
        zIndex: 1
      }}
    >
      {
        (() => {
          if (errors[index]) {
            return <span>There is an error in <span style={{ fontWeight: 600, borderBottom: '2px solid white' }}>{errors[index].label}</span></span>
          }
        })()
      }
      <Button
        label='GO TO'
        size='xs'
        style={{
          position: 'absolute',
          right: 15,
          top: '50%',
          fontSize: 11,
          transform: 'translate(0, -50%)',
        }}
        onClick={() => {
          const dirtyInput = document.getElementById(errors[index].id).getBoundingClientRect()
          window.scrollTo(0, window.scrollY + dirtyInput.y + dirtyInput.height - window.innerHeight)
        }}
      />
    </div>
  }
}

export default ErrorDialog