#!/usr/bin/env node
'use strict';
var meow = require('meow');
var postmarkLog = require('./');

var cli = meow({
  help: [
    'Usage',
    '  postmark-log <input>',
    '',
    'Example',
    '  postmark-log Unicorn'
  ].join('\n')
});

postmarkLog(cli.input[0]);
