const exercise = require('workshopper-exercise')()
const shell = require('shelljs')

exercise.requireSubmission = false

exercise.addVerifyProcessor(function (cb) {
  shell.exec('wsk trigger get rule-trigger', {silent: true}, (code, stdout, stderr) => {
    let pass = false
    const exists = (code === 0)

    if (exists) {
      this.emit('pass', 'OpenWhisk Trigger rule-trigger exists')
      const trigger = JSON.parse(stdout.match(/{[^]*$/)[0])
      if (trigger.parameters.length === 1) {
        if (trigger.parameters[0].key === 'message' &&
            trigger.parameters[0].value === 'Trigger fired') {
          this.emit('pass', 'OpenWhisk Trigger rule-trigger default parameter correct')
          pass = true
        } else {
          this.emit('fail', 'OpenWhisk Trigger rule-trigger default parameter incorrect')
        }
      } else {
        this.emit('fail', 'OpenWhisk Trigger rule-trigger missing default parameter')
      }
    } else {
      this.emit('fail', 'OpenWhisk Trigger rule-trigger does not exist')
    }

    cb(null, pass)
  })
})

exercise.addVerifyProcessor(function (cb) {
  shell.exec('wsk action get first-trigger-action', {silent: true}, (code, stdout, stderr) => {
    const exists = (code === 0)
    if (exists) {
      this.emit('pass', 'OpenWhisk Action first-trigger-action exists')
    } else {
      this.emit('fail', 'OpenWhisk Action first-trigger-action does not exist')
    }

    cb(null, exists)
  })
})

exercise.addVerifyProcessor(function (cb) {
  shell.exec('wsk action get second-trigger-action', {silent: true}, (code, stdout, stderr) => {
    const exists = (code === 0)
    if (exists) {
      this.emit('pass', 'OpenWhisk Action second-trigger-action exists')
    } else {
      this.emit('fail', 'OpenWhisk Action second-trigger-action does not exist')
    }

    cb(null, exists)
  })
})

exercise.addVerifyProcessor(function (cb) {
  shell.exec('wsk rule get first-trigger-rule', {silent: true}, (code, stdout, stderr) => {
    const exists = (code === 0)
    if (exists) {
      this.emit('pass', 'OpenWhisk Rule first-trigger-rule exists')
      const rule = JSON.parse(stdout.match(/{[^]*$/)[0])
      if (rule.trigger === 'rule-trigger') {
        this.emit('pass', 'OpenWhisk Rule first-trigger-rule bound to correct trigger')
      } else {
        this.emit('fail', 'OpenWhisk Rule first-trigger-rule bound to wrong trigger')
      }
    } else {
      this.emit('fail', 'OpenWhisk Rule first-trigger-rule does not exist')
    }

    cb(null, exists)
  })
})

exercise.addVerifyProcessor(function (cb) {
  shell.exec('wsk rule get second-trigger-rule', {silent: true}, (code, stdout, stderr) => {
    const exists = (code === 0)
    if (exists) {
      this.emit('pass', 'OpenWhisk Rule second-trigger-rule exists')
      const rule = JSON.parse(stdout.match(/{[^]*$/)[0])
      if (rule.trigger === 'rule-trigger') {
        this.emit('pass', 'OpenWhisk Rule second-trigger-rule bound to correct trigger')
      } else {
        this.emit('fail', 'OpenWhisk Rule second-trigger-rule bound to wrong trigger')
      }
    } else {
      this.emit('fail', 'OpenWhisk Rule second-trigger-rule does not exist')
    }

    cb(null, exists)
  })
})

exercise.addVerifyProcessor(function (cb) {
  shell.exec('wsk trigger fire rule-trigger', {silent: true}, (code, stdout, stderr) => {
    if (code !== 0) {
      this.emit('fail', 'Unable to fire Trigger rule-trigger')
      return cb(null, false)
    }

    shell.exec('wsk activation list -l 5', {silent: true}, (code, stdout, stderr) => {
      if (code !== 0) {
        this.emit('fail', 'Unable to retrieve Activation list')
        return cb(null, false)
      }
      if (!stdout.match('rule-trigger')) {
        this.emit('fail', 'Activation logs do not include rule-trigger')
        return cb(null, false)
      }
      if (!stdout.match('first-trigger-rule')) {
        this.emit('fail', 'Activation logs do not include first-trigger-rule')
        return cb(null, false)
      }
      if (!stdout.match('second-trigger-rule')) {
        this.emit('fail', 'Activation logs do not include second-trigger-rule')
        return cb(null, false)
      }
      if (!stdout.match('first-trigger-action')) {
        this.emit('fail', 'Activation logs do not include second-trigger-action')
        return cb(null, false)
      }
      if (!stdout.match('second-trigger-action')) {
        this.emit('fail', 'Activation logs do not include second-trigger-action')
        return cb(null, false)
      }

      this.emit('pass', 'Activation logs includes correct rules, triggers and actions')
      return cb(null, true)
    })
  })
})

module.exports = exercise
