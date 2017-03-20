<h1 align="center">
  <img src="https://cdn.rawgit.com/tkh44/react-crate/master/react-crate.png" alt="React Crate - Fill Your Crate" width="200">
  <br>
  react-crate
  <br>
  <p style="font-size: 1rem;">Crate is a way to compose and build components out of existing components.</p>
  <br>
</h1>

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

### Example
```jsx
import Crate from 'react-crate'
import withProps from 'recompose/withProps'
import pure from 'recompose/pure'
import Loadable from 'react-loadable'

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
```



[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
