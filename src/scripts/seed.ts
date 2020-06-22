import _ from 'lodash';
import boot from '../boot';

const casual = require('casual').nl_NL;
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const seed = () => {
  if (process.env.NODE_ENV !== 'development') {
    console.error('This command can only be run during development');
    process.exit(1);
  }

  rl.question('First: ', async function (companyName: string) {
    rl.close();
  });
};

boot.start().then(seed);

rl.on('close', function () {
  process.exit(0);
});
