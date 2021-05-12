const shell = require('shelljs');
const cwd = process.cwd();

const lintCommit = () => {
  return new Promise((resolve, reject) => {
    console.log(`start commitlint`);
    const estpl = `
      commitlint -E HUSKY_GIT_PARAMS --color
    `
    shell.exec(estpl, {
      cwd
    }, (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject();
      }
      console.log(`${code} end commitlint`);
    });
  })
}

const lintES = (blob, fix = false) => {
  return new Promise((resolve, reject) => {
    console.log(`start eslint`);
    const estpl = `
      eslint ${blob} --color --fix=${fix}
    `
    shell.exec(estpl, {
      cwd
    }, (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject();
      }
      console.log(`${code} end eslint`);
    });
  })
}

const lintStyle = (blob, fix = false) => {
  return new Promise((resolve, reject) => {
    console.log(`start stylelint`);
    const estpl = `
      stylelint ${blob} --color --fix=${fix}
    `
    shell.exec(estpl, {
      cwd
    }, (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject();
      }
      console.log(`${code} end stylelint`);
    });
  })
}

const lintAll = async ({
  es,
  style
}, fix = false) => {
  try {
    await lintES(es, fix);
    await lintStyle(style, fix);
    console.log('end');
  } catch(e) {
    process.exit(1);
  }
}

module.exports = {
  lintAll,
  lintCommit,
  lintES,
  lintStyle
};