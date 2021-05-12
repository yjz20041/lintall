#!/usr/bin/env node
const program = require('commander');
const command_lint = require('../command/lint');

program.version(require('../package').version);

const config = require('../util/config');

const {
  lintBlob
} = config;

// program.usage('<command>')

// program
//   .command('lint')
//   .description('')
//   .action(command_lint);

program
  .option('-e --es [t]', 'es blob')
  .option('-s --style [t]', 'style blob')
  .option('-f --fixed', 'if fixed auto')
  .action((options) => {
    let {
      es,
      style,
      fixed
    } = options;
    if (typeof es !== 'string') {
      es = lintBlob.es;
    }
    if (typeof style !== 'string') {
      style = lintBlob.style;
    }
    command_lint.lintAll({
      es,
      style
    }, fixed);
  });

program.command('commit').action(async () => {
  try {
    await command_lint.lintCommit();
  } catch(e) {
    process.exit(1);
  }
  
});

program.command('es <blob> [fixed]').action(async (blob, fixed) => {
  const esBlob = blob || lintBlob.es;
  try {
    await command_lint.lintES(esBlob, fixed);
  } catch(e) {
    process.exit(1);
  }
  
})

program.command('style <blob> [fixed]').action(async (blob, fixed) => {
  const styleBlob = blob || lintBlob.style;
  try {
    await command_lint.lintStyle(styleBlob, fixed);
  } catch(e) {
    process.exit(1);
  }
})


program.parse(process.argv);


