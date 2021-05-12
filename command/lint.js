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

const lintES = (blob, fixed = false) => {
  return new Promise((resolve, reject) => {
    console.log(`start eslint`);
    const estpl = `
      eslint ${blob} --color --fix=${fixed}
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

const lintStyle = (blob, fixed = false) => {
  return new Promise((resolve, reject) => {
    console.log(`start stylelint`);
    const estpl = `
      stylelint ${blob} --color --fix=${fixed}
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
}, fixed = false) => {
  try {
    console.log(es, style);
    await lintCommit();
    await lintES(es, fixed);
    await lintStyle(style, fixed);
  } catch(e) {
    process.exit(1);
    console.log('end');
  }
}

module.exports = {
  lintAll,
  lintCommit,
  lintES,
  lintStyle
};