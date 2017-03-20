import './style.css'
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { render } from 'react-dom'
import withProps from 'recompose/withProps'
import { Crate } from '../../src'
import Loading from './Loading'
import ColorDisplay from './ColorDisplay'
import Loadable from 'react-loadable'

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

const App = props => <pre>{pp(props)}</pre>

const Root = props => (
  <App>
    <HasProps />
  </App>
)

// You can create a collection of your higher order functions
// You could have react-crate-recompose, react-crate-loadable, etc
// The advantage being that users can pull in just what they need
const recomposeCollection = {
  withProps(...args) {
    const hoc = withProps(...args)
    return this.hoc(hoc)
  },
  pure() {
    return this.hoc(pure)
  }
}

// Create our custom crate bringing in our recompose collection
const MyCrate = Crate.of({
  recomposeCollection,
  myHoc: function () {
    return this.hoc(myHoc)
  },
  asyncCompile: function (options) {
    const AsyncComponent = Loadable(options)
    return this.fold(hoc => {
      return hoc(AsyncComponent)
    })
  }
})

// Export it as a split & pre-loaded component
export default MyCrate
  .myHoc()
  .withProps({ injected: true })
  .asyncCompile({
    loader: () => import('./AsyncTestComponent'),
    LoadingComponent: Loading,
    delay: 200
  })
