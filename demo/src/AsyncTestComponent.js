import React from 'react'
import crate from '../../src/index'

const MousePos = props => <h4>{`Mouse Position: X(${props.mouse.x}), Y(${props.mouse.y})`}</h4>

const buttonCrate = crate().style({
  height: '1.6em',
  width: '100%',
  background: 'none',
  color: 'white',
  fontSize: '1em',
  padding: 0,
  outline: 'none',
  border: 'none',
  cursor: 'pointer'
})

const BlueButton = buttonCrate.style({background: '#329af0' }).compile('button')

export default props => {
  return (
    <section {...props}>
      <h1>React Crate</h1>
      <MousePos {...props} />
      <BlueButton
        onMouseEnter={e => {
          props.updateButton({ hovered: true })
        }}
        onMouseLeave={e => {
          props.updateButton({ hovered: false })
        }}
      >
        {`Hovered: ${props.button.hovered}`}
      </BlueButton>
      {props.children}
    </section>
  )
}
