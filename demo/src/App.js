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
  console.log('myHoc is built')
  return props => {
    return <Wrapped {...props} dispatch={console.log} />
  }
}

console.log('defining sectionCrate')
const sectionCrate = Crate.of('section').hoc(myHoc)
console.log('sectionCrate defined')

const App = sectionCrate.compile()
const Display = Crate.of(ColorDisplay).compile()

const Root = props => (
  <App>
    <Display />
  </App>
)

export default Root
