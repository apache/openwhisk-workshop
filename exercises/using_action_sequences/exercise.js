const exercise = require('workshopper-exercise')()
const shell = require('shelljs')

exercise.requireSubmission = false

exercise.addVerifyProcessor(function (cb) {
  shell.exec('wsk action get reverse-sentence-words', {silent: true}, (code, stdout, stderr) => {
    const exists = (code === 0)

    if (exists) {
      this.emit('pass', 'OpenWhisk Action reverse-sentence-words exists')
      const action = JSON.parse(stdout.match(/{[^]*$/)[0])
      if (action.exec.kind === 'sequence') {
        this.emit('pass', 'OpenWhisk Action reverse-sentence-words is a sequence')
        if (action.parameters[0].key === '_actions' &&
            action.parameters[0].value.length === 3) {
          this.emit('pass', 'OpenWhisk Action reverse-sentence-words invokes three actions')
        } else {
          this.emit('fail', 'OpenWhisk Action reverse-sentence-words does not invoke three actions')
        }
      } else {
        this.emit('fail', 'OpenWhisk Action reverse-sentence-words is not a sequence')
      }
    } else {
      this.emit('fail', 'OpenWhisk Action reverse-sentence-words does not exist')
    }

    cb(null, exists)
  })
})

exercise.addVerifyProcessor(function (cb) {
  shell.exec('wsk action invoke reverse-sentence-words -b -r -p text "1 2 3 4 5 6 7 8 9 10"', {silent: true}, (code, stdout, stderr) => {
    const success_code = (code === 0)
    let found_message = false

    if (success_code) {
      this.emit('pass', 'OpenWhisk Action reverse-sentence-words invoked successfully')
      found_message = (stdout.match('"text": "10 9 8 7 6 5 4 3 2 1"'))
      if (found_message) {
        this.emit('pass', 'OpenWhisk Action reverse-sentence-words returns reversed sentence')
      } else {
        this.emit('fail', 'OpenWhisk Action reverse-sentence-words does not return reversed sentence')
      }
    } else {
      this.emit('fail', 'OpenWhisk Action reverse-sentence-words failed to invoke successfully')
    }

    cb(null, found_message)
  })
})

module.exports = exercise
