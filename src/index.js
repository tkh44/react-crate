import { Component as ReactComponent, Children, createClass, createElement as h } from 'react'
import createEagerFactory from 'recompose/createEagerFactory'
import getDisplayName from 'recompose/getDisplayName'
import Loadable from 'react-loadable';

const isFn = test => typeof test === 'function'
const id = Component => Component

export default class Crate {
  constructor (fn = id) {
    this.fn = fn
    return this
  }

  map (fn) {
    return new Crate(fn(this.fn))
  }

  fold (fn) {
    return fn(this.fn)
  }

  compile (Component = 'div') {
    return this.fold(hoc => hoc(Component))
  }

  hoc (fn) {
    return this.map(hoc => Wrapped => hoc(fn(Wrapped)))
  }

  static of (Component) {
    return new Crate(_ => Component)
  }
}