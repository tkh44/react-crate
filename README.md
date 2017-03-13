# react-crate

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

react-crate is a way to compose and build components out of existing components.


## Demo
_(demo/src/index.js)_

[fiddle](https://jsfiddle.net/tkh44/wszntqnm/2)

```jsx
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { render } from 'react-dom'
import crate from 'react-crate'

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

```

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
