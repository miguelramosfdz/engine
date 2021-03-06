
/**
 * statuses of various db objects
 * @module status
 */

module.exports = {
  seal: {
    pending: '0',
    sealed: '1'
  },
  send: {
    pending: '0',
    sent: '1'
  },
  // receive: {
  //   notreceived: '0',
  //   received: '1'
  // },
  watch: {
    unseen: '0',
    seen: '1',
    confirmed: '2'
  },
  tx: {
    unconfirmed: '0',
    confirmed: '1'
  }
}
