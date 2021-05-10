#!/usr/bin/env node
const program = require('commander');
const command_lint = require('../command/lint');

program.version(require('../package').version);

program.usage('<command>')

program
  .command('lint')
  .description('')
  .action(command_lint);

program.parse(process.argv);