import { Component as ReactComponent, Children, createClass, createElement as h } from 'react'
import listen from 'simple-listen'
import classnames from 'classnames'
import createEagerFactory from 'recompose/createEagerFactory'
import withState from 'recompose/withState'
import withReducer from 'recompose/withReducer'
import branch from 'recompose/branch'
import withPropsOnChange from 'recompose/withPropsOnChange'
import withProps from 'recompose/withProps'
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys'
import withHandlers from 'recompose/withHandlers'
import Loadable from 'react-loadable';

const isFn = test => typeof test === 'function'
const id = Component => Component
const getDisplayName = C => C.displayName || C.name || 'Component'

class Crate {
  constructor (hoc = id) {
    this.hocFn = hoc
    return this
  }

  map (fn) {
    return new Crate(fn(this.hocFn))
  }

  fold (fn) {
    return fn(this.hocFn)
  }

  compile (Component = 'div') {
    return this.fold(hoc => {
      return hoc(Component)
    })
  }

  asyncCompile (options) {
    const AsyncComponent = Loadable(options)
    return this.fold(hoc => {
      return hoc(AsyncComponent)
    })
  }

  hoc (fn) {
    return this.map(hoc => {
      return Wrapped => {
        return hoc(fn(Wrapped))
      }
    })
  }

  // Inspect your props at a certain point
  inspect () {
    return this.hoc(Wrapped => {
      const factory = createEagerFactory(Wrapped)
      return props => {
        console.log(`inspect props: ${getDisplayName(Wrapped)}`, props)
        return factory(props)
      }
    })
  }

  // Set prop by key
  prop (key, value) {
    return this.hoc(Wrapped => {
      const factory = createEagerFactory(Wrapped)
      return props => {
        return factory({
          ...props,
          [key]: isFn(value) ? value(props) : value
        })
      }
    })
  }

  // Set className prop
  // accepts anything that `classnames`
  // https://www.npmjs.com/package/classnames
  className (value) {
    return this.prop('className', props => {
      return classnames(props.className, isFn(value) ? value(props) : value)
    })
  }

  // Set style
  style (s) {
    return this.prop('style', props => {
      return {
        ...props.style,
        ...(isFn(s) ? s(props) : s)
      }
    })
  }

  lifecycle (name, fn) {
    return this.hoc(Wrapped => {
      const factory = createEagerFactory(Wrapped)
      const CrateLifecycle = createClass({
        render: function () {
          return factory(this.props)
        },
        [name]: fn
      })
      return CrateLifecycle
    })
  }

  // https://github.com/tkh44/simple-listen#api
  on(el, events, fn, capture, context) {
    return this.hoc(Wrapped => {
      const factory = createEagerFactory(Wrapped)
      class CreateOn extends ReactComponent {
        componentDidMount () {
          const callback = e => fn(e, this.props)
          this.listener = listen(el, events, callback, capture, context)
        }

        componentWillUnmount () {
          this.listener()
        }

        render () {
          return factory(this.props)
        }
      }
      return CreateOn
    })
  }
}

// Lifecycle methods
const lifecycleMethods = [
  'componentWillMount',
  'componentDidMount',
  'componentWillReceiveProps',
  'shouldComponentUpdate',
  'componentWillUpdate',
  'componentDidUpdate',
  'componentWillUnmount'
]

lifecycleMethods.forEach(method => {
  Crate.prototype[method] = function (fn) {
    return this.lifecycle(method, fn)
  }
})

// Recompose utils

// https://github.com/acdlite/recompose/blob/master/docs/API.md#withstate
Crate.prototype.withState = function state (...args) {
  return this.hoc(withState(...args))
}

// https://github.com/acdlite/recompose/blob/master/docs/API.md#withreducer
Crate.prototype.withReducer = function reducer (...args) {
  return this.hoc(withReducer(...args))
}

// https://github.com/acdlite/recompose/blob/master/docs/API.md#branch
Crate.prototype.branch = function branch (...args) {
  return this.hoc(branch(...args))
}

Crate.prototype.withProps = function branch (...args) {
  return this.hoc(withProps(...args))
}

Crate.prototype.withPropsOnChange = function branch (...args) {
  return this.hoc(withPropsOnChange(...args))
}

Crate.prototype.onlyUpdateForKeys = function branch (...args) {
  return this.hoc(onlyUpdateForKeys(...args))
}

Crate.prototype.withHandlers = function withHandlers (...args) {
  return this.hoc(withHandlers(...args))
}

// factory
export default function crate (...args) {
  return new Crate(...args)
}
