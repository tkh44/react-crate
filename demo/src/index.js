// eslint-disable-next-line no-unused-vars
import React from 'react'
import { render } from 'react-dom'

import crate from '../../src'

const pp = obj => JSON.stringify(obj, null, 2)

function Stateless (props) {
  return (
    <pre style={props.style} className={props.className}>
      <details open>
        <summary>Stateless Component Props</summary>
        {pp(props)}
      </details>
      {props.children}
    </pre>
  )
}

const buttonCrate = crate().style({
  height: '1.6em',
  width: '100%',
  background: 'none',
  color: 'white',
  fontSize: '1em',
  outline: 'none'
})
console.log('calling compile')
const BlueButton = buttonCrate.style({ background: 'blue' }).compile('button')
console.log('compile called')

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
  .componentWillReceiveProps((nextProps) => {
    console.log('componentWillReceiveProps')
  })
  .componentWillUpdate((nextProps, nextState) => {
    console.log('componentWillUpdate', nextProps, nextState)
  })
  .state('buttonState', 'updateButtonState', { hovered: false })
  .inspect()
  .compile(Stateless)

render(
  <App
    name={'Kye'}
    location={'Boulder'}
    twitter={'tkh44'}
    github={'tkh44'}
    colors={['red', 'green', 'blue', 'brown', 'black', 'purple', 'yellow', 'pink']}
  >
    <h1>App</h1>
    <BlueButton>I'm blue</BlueButton>
  </App>,
  document.querySelector('#demo')
)
