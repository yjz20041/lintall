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

program.command('commit').action(async () => {
  try {
    await command_lint.lintCommit();
  } catch(e) {
    process.exit(1);
  }
  
});

program.command('es [blob]')
  .option('-f --fix', 'if fix auto')
  .action(async (blob, { fix }) => {
    console.log(blob, fix)
    const esBlob = blob || lintBlob.es;
    try {
      await command_lint.lintES(esBlob, fix);
    } catch(e) {
      process.exit(1);
    }
})

program.command('style [blob]')
  .option('-f --fix', 'if fix auto')
  .action(async (blob, { fix }) => {
  const styleBlob = blob || lintBlob.style;
  try {
    await command_lint.lintStyle(styleBlob, fix);
  } catch(e) {
    process.exit(1);
  }
})
const command = process.argv[2];
const defaultCommand = ![
  'commit',
  'es',
  'style'
].find(item => item === command);
if (defaultCommand) {
  program
  .option('-e --es [t]', 'es blob')
  .option('-s --style [t]', 'style blob')
  .option('-f --fix', 'if fix auto')
  .action((options) => {
    let {
      es,
      style,
      fix
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
    }, fix);
  });
}



program.parse(process.argv);


