import './style.css'
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { render } from 'react-dom'
import withProps from 'recompose/withProps'
import { Crate } from '../../src'
import Loading from './Loading'
import ColorDisplay from './ColorDisplay'
import recompose from '../../src/recompose'
import rebass from '../../src/rebass'
import loadable from '../../src/loadable'

const pp = obj => JSON.stringify(obj, null, 2)

function random (min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function myHoc (Wrapped) {
  return props => {
    return <Wrapped {...props} dispatch={console.log} />
  }
}

const time = function (time) {
  return Wrapped => {
    return props => {
      console.log('wrapped', Wrapped)
      return <Wrapped {...props} time={time} />
    }
  }
}

// You can create a collection of your higher order functions
// You could have react-crate-recompose, react-crate-loadable, etc
// The advantage being that users can pull in just what they need

// Create our custom crate bringing in our recompose collection
const MyCrate = Crate.of({
  recompose,
  rebass,
  loadable,
  myHoc: function () {
    return this.hoc(myHoc)
  }
})

const AsyncTestComponent = MyCrate.pure()
  .withRebass()
  .myHoc()
  .withProps({ injected: true })
  .asyncCompile({
    loader: () => import('./AsyncTestComponent'),
    LoadingComponent: Loading,
    delay: 200
  })

const App = props => <div>{props.children}</div>

const Root = props => (
  <App>
    <AsyncTestComponent p={16} color={'#343a40'} backgroundColor={'#f8f9fa'} />
  </App>
)

// Export it as a split & pre-loaded component
export default Root
