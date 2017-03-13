// eslint-disable-next-line no-unused-vars
import React from 'react'
import { render } from 'react-dom'

import crate from '../../src'

const pp = obj => JSON.stringify(obj, null, 2)

const buttonCrate = crate().style({
  height: '1.6em',
  width: '100%',
  background: 'none',
  color: 'white',
  fontSize: '1em',
  outline: 'none'
})

const BlueButton = buttonCrate.style({ background: 'blue' }).compile('button')

function myHoc (Wrapped) {
  return props => {
    return <Wrapped {...props} myHoc={'this-is-a-hoc'} />
  }
}

const App = crate()
  .prop('foo', 'bar')
  .className(props => ['set-classname', ...props.colors])
  .style({ border: '2px solid blue', padding: 8 })
  .hoc(myHoc)
  .componentDidMount(() => {
    console.log('componentDidMount')
  })
  .componentWillReceiveProps(nextProps => {
    console.log('componentWillReceiveProps')
  })
  .componentWillUpdate((nextProps, nextState) => {
    console.log('componentWillUpdate', nextProps, nextState)
  })
  .state('buttonState', 'updateButtonState', { hovered: false })
  .inspect()
  .compile()

render(
  <App
    name={'Kye'}
    location={'Boulder'}
    twitter={'tkh44'}
    github={'tkh44'}
    colors={['red', 'green', 'blue', 'brown', 'black', 'purple', 'yellow', 'pink']}
  >
    <h1>App</h1>
    {(props, i) => (
      <BlueButton key={i} onMouseEnter={(e) => {
        props.updateButtonState({ hovered: true })
      }} onMouseLeave={(e) => {
        props.updateButtonState({hovered: false})
      }}>
        {`Hovered: ${props.buttonState.hovered}`}
      </BlueButton>
    )}
  </App>,
  document.querySelector('#demo')
)
