/**
 * modules/gallery/gallery.jsx
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 * @flow
 */
import React, { Component } from 'react'
import { style, classes } from 'typestyle'

/* <Gallery /> ================================================================================== */
export default class Gallery extends Component<*, *> {
  props: {
    /** An index is first given as a props because user can click any image to magnify */
    index: number,
    /** Actual file path is given from backend, therefore need to replace it with backend url */
    baseUrl: string,
    /** Array of image (file) objects */
    images: [{ path: string }],
    /** Style object to be applied to images */
    imageStyle: object
  }
  state: {
    /** An index is first given as a props because user can click any image to magnify */
    index: number
  }

  render () {
    const { baseUrl, images } = this.props
    const { index } = this.state
    const imageSource = `${baseUrl}/${images[index].path.replace('public/', '')}`
    const tempImage = new Image()
    tempImage.src = imageSource

    return <div className={CLASSNAMES.wrapper}>
      <div
        className={classes(CLASSNAMES.navigator, 'no-select')}
        onClick={this.navigateLeft}
      >
        <i className="material-icons">keyboard_arrow_left</i>
      </div>
      {
        (() => {
          if (tempImage.width > tempImage.height) {
            return (
              <div className={CLASSNAMES.landscape}>
                <img src={imageSource} style={imageStyle}/>
                <a
                  className={CLASSNAMES.button.fullscreen}
                  href={imageSource}
                  target='_blank'
                >
                  <i className="material-icons">fullscreen</i>
                </a>
              </div>
            )
          } else {
            return (
              <div className={CLASSNAMES.portrait}>
                <img src={imageSource} style={ imageStyle }/>
                <a
                  className={CLASSNAMES.button.fullscreen}
                  href={imageSource}
                  target='_blank'
                >
                  <i className="material-icons">fullscreen</i>
                </a>
              </div>
            )
          }
        })()
      }
      <div
        className={classes(CLASSNAMES.navigator, 'no-select')}
        onClick={this.navigateRight}
      >
        <i className="material-icons">keyboard_arrow_right</i>
      </div>
    </div>
  }

  constructor (props) {
    super(props)
    this.state = { index: props.index }
  }

  navigateLeft = () => {
    const { images } = this.props
    const { index } = this.state

    if (index - 1 < 0) {
      this.setState({
        index: images.length - 1
      })
    } else {
      this.setState({
        index: index - 1
      })
    }
  }

  navigateRight = () => {
    const { images } = this.props
    const { index } = this.state

    this.setState({
      index: (index + 1) % images.length
    })
  }
}

/* Styles ======================================================================================= */
const CLASSNAMES = {
  wrapper: style({
    position: 'relative',
    display: 'flex',
    background: 'black',
    alignItems: 'center'
  }),
  navigator: style({
    width: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    $nest: {
      '& i': {
        color: 'white',
        fontSize: 25
      }
    }
  }),
  landscape: style({
    position: 'relative',
    overflow: 'hidden',
    $nest: {
      '& img': {
        width: 700
      }
    }
  }),
  portrait: style({
    position: 'relative',
    width: 700,
    height: 600,
    background: 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    $nest: {
      '& img': {
        width: 600
      }
    }

  }),
  button: {
    fullscreen: style({
      width: 20,
      height: 20,
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.5)',
      position: 'absolute',
      right: 4,
      transform: 'translateX(-50%)',
      bottom: 10,
      boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.1)',
      cursor: 'pointer',
      $nest: {
        '& i': {
          fontSize: 20,
          color: 'rgb(30,30,30)',
          $nest: {
            '&:hover': {
              color: 'rgb(50,50,50)'
            }
          }
        }
      }
    })
  }
}