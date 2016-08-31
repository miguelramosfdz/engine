#!/usr/bin/env node
'use strict'

const fs = require('fs')
const path = require('path')
const async = require('async')
const typeforce = require('typeforce')
const protocol = require('@tradle/protocol')
const names = require('random-name')
const constants = require('../lib/constants')
const utils = require('../lib/utils')
const TYPE = constants.TYPE
// const NONCE = constants.NONCE
const argv = require('minimist')(process.argv.slice(2), {
  alias: {
    f: 'file',
    n: 'number'
  }
})

genUsers(argv)

function genUsers (opts) {
  typeforce({
    file: 'String',
    number: 'Number'
  }, opts)

  const file = path.resolve(opts.file)
  const number = opts.number
  const tmp = new Array(number).fill(0)

  async.map(tmp, function iterator (blah, done) {
    utils.newIdentity({ networkName: 'testnet' }, done)
  }, function (err, results) {
    if (err) throw err

    results.forEach(r => {
      const first = names.first()
      const last = names.last()
      r.profile = {
        name: {
          firstName: first,
          lastName: last,
          formatted: first + ' ' + last
        }
      }

      r.keys = r.keys.map(k => k.toJSON(true))
    })

    fs.writeFile(file, JSON.stringify(results, null, 2))
  })
}