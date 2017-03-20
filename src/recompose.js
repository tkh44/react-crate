import mapProps from 'recompose/mapProps'
import withProps from 'recompose/withProps'
import withPropsOnChange from 'recompose/withPropsOnChange'
import withHandlers from 'recompose/withHandlers'
import defaultProps from 'recompose/defaultProps'
import renameProp from 'recompose/renameProp'
import renameProps from 'recompose/renameProps'
import flattenProp from 'recompose/flattenProp'
import withState from 'recompose/withState'
import withReducer from 'recompose/withReducer'
import branch from 'recompose/branch'
import renderComponent from 'recompose/renderComponent'
import renderNothing from 'recompose/renderNothing'
import shouldUpdate from 'recompose/shouldUpdate'
import pure from 'recompose/pure'
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys'
import onlyUpdateForPropTypes from 'recompose/onlyUpdateForPropTypes'
import withContext from 'recompose/withContext'
import getContext from 'recompose/getContext'
import lifecycle from 'recompose/lifecycle'
import toClass from 'recompose/toClass'

export default {
  mapProps (...args) {
    return this.hoc(mapProps(...args))
  },
  withProps (...args) {
    return this.hoc(withProps(...args))
  },
  withPropsOnChange (...args) {
    return this.hoc(withPropsOnChange(...args))
  },
  withHandlers (...args) {
    return this.hoc(withHandlers(...args))
  },
  defaultProps (...args) {
    return this.hoc(defaultProps(...args))
  },
  renameProp (...args) {
    return this.hoc(renameProp(...args))
  },
  renameProps (...args) {
    return this.hoc(renameProps(...args))
  },
  flattenProp (...args) {
    return this.hoc(flattenProp(...args))
  },
  withState (...args) {
    return this.hoc(withState(...args))
  },
  withReducer (...args) {
    return this.hoc(withReducer(...args))
  },
  branch (...args) {
    return this.hoc(branch(...args))
  },
  renderComponent (...args) {
    return this.hoc(renderComponent(...args))
  },
  renderNothing () {
    return this.hoc(renderNothing)
  },
  shouldUpdate (...args) {
    return this.hoc(shouldUpdate(...args))
  },
  pure () {
    return this.hoc(pure)
  },
  onlyUpdateForKeys (...args) {
    return this.hoc(onlyUpdateForKeys(...args))
  },
  onlyUpdateForPropTypes () {
    return this.hoc(onlyUpdateForPropTypes)
  },
  withContext (...args) {
    return this.hoc(withContext(...args))
  },
  getContext (...args) {
    return this.hoc(getContext(...args))
  },
  lifecycle (...args) {
    return this.hoc(lifecycle(...args))
  },
  toClass () {
    return this.hoc(toClass)
  }
}
