[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

<h1 align="center">
  <img src="https://cdn.rawgit.com/tkh44/react-crate/master/react-crate.png" alt="React Crate - Fill Your Crate" width="200">
  <br>
  Crate
  <br>
  <br>
</h1>

Crate is a way to compose and build components out of existing components.


### Example
```jsx harmony
import Crate from 'react-crate'
import withProps from 'recompose/withProps'
import { connect } from 'react-redux'
import { withRebass } from 'rebass'

const Button = props => <button style={props.style}>{props.text}</button>

const AuthButton = Crate.of(Button)
  .hoc(connect(state => ({ loggedIn: state.auth.loggedIn })))
  .hoc(withProps(props => ({ text: props.loggedIn ? 'sign out' : 'log in' })))
  .hoc(withRebass)
  .compile()

const LoginForm = props => {
  return (
    <div>
      ...
      <AuthButton
        caps
        mt={16}
        mb={16}
        color={'white'}
        backgroundColor={'#51cf66'}
      />
    </div>
  )
}
```




[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
