import './style.css'
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { render } from 'react-dom'
import Crate from '../../src'
import Loading from './Loading'
import ColorDisplay from './ColorDisplay'

function random (min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function myHoc (Wrapped) {
  return props => {
    return <Wrapped {...props} dispatch={console.log} />
  }
}

const App = Crate.of('section').hoc(myHoc).compile()
const Display = Crate.of(ColorDisplay).compile()

const Root = props => (
  <App>
    <Display />
  </App>
)

export default Root
