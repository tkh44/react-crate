import withRebass from 'rebass/dist/withRebass'

export default {
  withRebass() {
    return this.hoc(withRebass)
  }
}
