<h1 align="center">
  <img src="https://cdn.rawgit.com/tkh44/react-crate/master/react-crate.png" alt="React Crate - Fill Your Crate" width="200">
  <br>
  react-crate
  <br>
  <br>
</h1>
<p align="center" style="font-size: 1rem;">Crate is a way to compose and build components out of existing components.</p>

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

### Basic Usage
```jsx
import Crate from 'react-crate'
import recompose from 'react-crate/lib/recompose'
import rebass from 'react-crate/lib/rebass'
import loadable from 'react-crate/lib/loadable'

function myHoc (Wrapped) {
  return props => {
    return <Wrapped {...props} dispatch={console.log} />
  }
}

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

const Root = props => (
  <AsyncTestComponent p={16} color={'#343a40'} backgroundColor={'#f8f9fa'} />
)
```

### [Recompose](https://github.com/acdlite/recompose)

```bash
npm install recompose -S
```

```javascript
import Crate from 'react-crate'
import recompose from 'react-crate/lib/recompose'

const MyCrate = Crate.of({
  recompose
  //...
})

MyCrate
  .mapProps(/*...*/)
  .withProps(/*...*/)
  .withPropsOnChange(/*...*/)
  .withHandlers(/*...*/)
  .defaultProps(/*...*/)
  .renameProp(/*...*/)
  .renameProps(/*...*/)
  .flattenProp(/*...*/)
  .withState(/*...*/)
  .withReducer(/*...*/)
  .branch(/*...*/)
  .renderComponent(/*...*/)
  .renderNothing()
  .shouldUpdate(/*...*/)
  .pure()
  .onlyUpdateForKeys(/*...*/)
  .onlyUpdateForPropTypes()
  .withContext(/*...*/)
  .getContext(/*...*/)
  .lifecycle(/*...*/)
  .toClass()
  .compile('div')

```

### [React Redux](https://github.com/reactjs/react-redux)

```bash
npm install react-redux -S
```

```javascript
import Crate from 'react-crate'
import reactRedux from 'react-crate/lib/react-redux'

const MyCrate = Crate.of({
  reactRedux
  //...
})

MyCrate
  .connect(/*...*/)
  .compile('div')

```

### [React Loadable](https://github.com/thejameskyle/react-loadable)

```bash
npm install react-loadable -S
```

```javascript
import Crate from 'react-crate'
import loadable from 'react-crate/lib/loadable'

const MyCrate = Crate.of({
  loadable
  //...
})

MyCrate
  .asyncCompile({
    loader: () => import('./AsyncLoadedComponent'),
    LoadingComponent: Loading,
    delay: 200
  })

```

### [Rebass](https://rebass-beta.now.sh)

```bash
npm install rebass@0.4.0-beta.9 -S
```

```javascript
import Crate from 'react-crate'
import rebass from 'react-crate/lib/rebass'

const MyCrate = Crate.of({
  rebass
  //...
})

MyCrate
  .withRebass()
  .compile('div')

```

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
