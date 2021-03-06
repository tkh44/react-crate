<h1 align="center">
  <img src="https://cdn.rawgit.com/tkh44/react-crate/master/react-crate.png" alt="React Crate - Fill Your Crate" width="200">
  <br>
  react-crate
  <br>
  <br>
</h1>
<p align="center" style="font-size: 1rem;">Crate is a way to compose and build components out of existing components.</p>

[![npm version](https://badge.fury.io/js/react-crate.svg)](https://badge.fury.io/js/react-crate)
[![Build Status](https://travis-ci.org/tkh44/react-crate.svg?branch=master)](https://travis-ci.org/tkh44/react-crate)
[![codecov](https://codecov.io/gh/tkh44/react-crate/branch/master/graph/badge.svg)](https://codecov.io/gh/tkh44/react-crate)

### Basic Usage

[Running Here](https://tkh44.github.io/react-crate/)

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
