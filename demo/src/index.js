// eslint-disable-next-line no-unused-vars
import React from 'react'
import { render } from 'react-dom'
import crate from '../../src'


function run () {
  const Root = require('./App').default
  render(<Root/>, document.querySelector('#demo'))
}


run()

if (module.hot) {
  // Whenever a new version of App.js is available
  module.hot.accept('./App', function () {
    // Require the new version and render it instead
    run()
  })
}
