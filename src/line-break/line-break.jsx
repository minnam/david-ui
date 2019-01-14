import React from 'react'

export default props => <div
  style={{
    position: 'relative',
    height: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 7.5
  }}
  onClick={props.onClick}
>
  {
    (() => {
      if (props.title) {
        return <div
          style={{
            background: props.backgroundColor || 'white',
            color: props.color || 'rgb(160,160,160)',
            fontWeight: 700,
            left: props.diasablePadding ? 0 : 17,
            paddingRight: 15,
            paddingLeft: 15,
            position: 'absolute',
          }}
        >
          {props.title}
        </div>
      }
    })()
  }
  <div
    className="hr-line-dashed"
    style={{
      width: '100%',
      borderColor: props.lineColor || '',
      backgroundColor: 'none'
    }}
  />
</div>