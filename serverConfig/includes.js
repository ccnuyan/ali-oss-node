import lodash from 'lodash'; import chalk from 'chalk';

global._ = lodash;

/* eslint-disable no-console */
global.printError = (error, filename, exit) => {
  console.log(chalk.red(`---------- ${filename} ----------`));
  console.log(chalk.white(error));
  console.log(chalk.red(`---------- ${filename} ----------`));
  if (exit) {
    process.exit(1);
  }
};

global.printMessage = (message, filename) => {
  console.log(chalk.blue(`---------- ${filename} ----------`));
  console.log(chalk.white(message));
  console.log(chalk.blue(`---------- ${filename} ----------`));
};

global.report = () => {
  let chalkcontent = chalk.grey('running in ');
  chalkcontent += serverConfig.mode === 'production' ? chalk.red(serverConfig.mode) : chalk.blue(serverConfig.mode);
  chalkcontent += chalk.grey(' mode');

  console.log(chalkcontent);
};

export default global;
