var yargs = require('yargs');

var argv = yargs
  .usage('Usage: $0 --server-key|-k <key> [--days|-d <number>]')
  .env('PM')  // to allow PM_SERVER_KEY
  .alias('server-key', 'k')
  .demand('k')
  .string('k')
  .describe('k',  'Postmark API server key')
  .alias('days', 'd')
  .default('d', 10)
  .describe('d', 'Number of days in the past we will log')
  .help()
  .version()
  .argv;

var postmarkLog = require('./postmark-log');
postmarkLog(argv);
