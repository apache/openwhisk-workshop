#!/usr/bin/env node

const workshopper = require('workshopper')
const path = require('path')

workshopper({
  name: 'openwhisk-workshop',
  title: 'Developer workshop for OpenWhisk',
  subtitle: '\x1b[23mSelect an exercise and hit \x1b[3mEnter\x1b[23m to begin',
  exerciseDir: path.join(__dirname, 'exercises'),
  appDir: __dirname,
  footerFile: false
})
