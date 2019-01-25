import React, { Component } from 'react'
import { classes, stylesheet } from 'typestyle'

/* Constants ==================================================================================== */
import ANIMATIONS from '../utils/animations'
import THEME from '../theme-handler'

export default class QuickAction extends Component {
  state = {
    toggled: false,
    falg: false,
    x: 0,
    y: 0,
  }

  render () {
    const {
      toggled,
      x,
      y,
    } = this.state
    const { items } = this.props
    let index = 0

    return <div
      className={classes(CLASSNAMES.quickActionWrapper, ANIMATIONS.fadeInDown)}
      style={{
        display: toggled ? '' : 'none',
        left: x,
        top: y,
      }}
    >
      {
        items.map((element, key) => {
          return <div
            className={
              classes(
                ANIMATIONS.fadeInDown,
                key === 0 ? '' : ANIMATIONS.delay[Math.round(0.025 * key * 1000) / 1000],
                CLASSNAMES.quickActionItem,
              )
            }
            key={key}
            style={{
              borderBottom: (() => {
                if (key < items.length - 1) {
                  return '1px solid rgb(245,245,245)'
                }
              })()
            }}
            onClick={element.onClick}
          >
            <span
              className={CLASSNAMES.buttonIcon}
              style={{
                background: THEME.colors[index++ % THEME.colors.length],
              }}
            />
            {element.label}
          </div>
        })
      }
    </div>
  }

  componentDidMount () {
    window.addEventListener('keydown', this.onKeydown)
    window.addEventListener('keyup', this.onKeyUp)
    window.addEventListener('mousemove', this.onMouseMove)
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.onKeydown)
    window.removeEventListener('keyup', this.onKeyUp)
    window.removeEventListener('mousemove', this.onMouseMove)
  }

  onMouseMove = event => {
    const { flag } = this.state
    const { getParent } = this.props

    if (getParent() && !flag) {
      getParent().addEventListener('mouseenter', this.onMouseEnter)
      getParent().addEventListener('mouseleave', this.onMouseLeave)

      this.setState({ flag: true })
    }

    if (!this.state.toggled) {
      this.setState({
        x: event.clientX,
        y: event.clientY
      })
    }
  }

  onMouseEnter = () => {
    this.setState({
      hovered: true
    })
  }

  onMouseLeave = () => {
    this.setState({
      hovered: false
    })
  }

  onKeydown = event => {
    switch (event.keyCode) {
    case 17: {
      if (!this.state.toggled && this.state.hovered) {
        this.setState({
          toggled: true
        })
      }
    }
    }
  }

  onKeyUp = () => {
    this.setState({
      toggled: false
    })
  }
}

const CLASSNAMES = stylesheet({
  quickActionWrapper: {
    background: 'white',
    boxShadow: '1px 1px 5px 1px rgba(0,0,0,0.07)',
    display: 'inline-block',
    overflow: 'hidden',
    position: 'fixed',
    userSelect: 'none',
    zIndex: 200,
  },
  quickActionItem: {
    background: 'white',
    color: 'rgb(60,60,60)',
    cursor: 'pointer',
    fontSize: 11,
    fontWeight: 600,
    padding: '5px 15px',
    $nest: {
      '&:hover': {
        background: 'rgb(220,220,220)',
        transition: '.25s all'
      }
    }
  },
  buttonIcon: {
    borderRadius: '50%',
    display: 'inline-block',
    height: 6,
    left: 0,
    marginRight: 5,
    top: 0,
    width: 6,
  }
})