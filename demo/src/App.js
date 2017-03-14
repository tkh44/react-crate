import './style.css'
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { render } from 'react-dom'
import crate from '../../src'
import Loading from './Loading'

const pp = obj => JSON.stringify(obj, null, 2)

function random (min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function myHoc (Wrapped) {
  return props => {
    return <Wrapped {...props} myHoc={'this-is-a-hoc'} />
  }
}

const App = crate()
  .componentDidMount(() => {
    console.log('componentDidMount')
  })
  .withState('button', 'updateButton', { hovered: false })
  .prop('foo', props => props.name)
  .className(props => ['set-classname', ...props.colors])
  .style(props => ({ border: `2px solid ${props.colors[5]}`, padding: 8}))
  .hoc(myHoc)
  .componentWillReceiveProps(nextProps => {
    console.log('componentWillReceiveProps')
  })
  .componentWillUpdate((nextProps, nextState) => {
    console.log('componentWillUpdate', nextProps, nextState)
  })
  .withState('mouse', 'updateMouse', {x: 0, y: 0})
  .withHandlers({
    onMouseMove: props => {
      return e => {
        return props.updateMouse({x: e.clientX, y: e.clientY})
      }
    }
  })
  .on(document, 'mousemove', (e, props) => props.onMouseMove(e))
  .asyncCompile({
    loader: () => import('./AsyncTestComponent'),
    LoadingComponent: Loading,
    delay: 200
  })

const inputCrate = crate()
  .withState('input', 'updateInput', props => ({ value: props.value }))

const TextInput = inputCrate.withProps({
  type: 'text'
})

const ColorInput = inputCrate.withProps({
  type: 'color'
}).style({margin: 16}).compile(props => <input type={props.type} value={props.input.value}
                           onChange={({target: {value}}) => props.updateInput({value})}/>)


const Root = (props) => (
  <App
    name={'Kye'}
    location={'Boulder'}
    twitter={'tkh44'}
    github={'tkh44'}
    colors={[
      '#ff6b6b',
      '#f06595',
      '#cc5de8',
      '#845ef7',
      '#5c7cfa',
      '#329af0',
      '#22b8cf',
      '#20c997',
      '#51cf66',
      '#94d82d',
      '#fcc419',
      '#ff922b'
    ]}
  >
  </App>
)

export default Root
