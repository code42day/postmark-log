[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][gemnasium-image]][gemnasium-url]

# postmark-log

Logs messages sent by postmark service.

## Install

```sh
$ npm install --global postmark-log
```

## Usage

```sh

Usage: bin/postmark-log --server-key|-k <key> [--days|-d <number>]

Options:
  --help            Show help                                          [boolean]
  --version         Show version number                                [boolean]
  --server-key, -k  Postmark API server key                  [string] [required]
  --days, -d        Number of days in the past we will log         [default: 10]
```

## License

MIT © [Damian Krzeminski](https://pirxpilot.me)

[npm-image]: https://img.shields.io/npm/v/postmark-log.svg
[npm-url]: https://npmjs.org/package/postmark-log

[travis-url]: https://travis-ci.org/pirxpilot/postmark-log
[travis-image]: https://img.shields.io/travis/pirxpilot/postmark-log.svg

[gemnasium-image]: https://img.shields.io/gemnasium/pirxpilot/postmark-log.svg
[gemnasium-url]: https://gemnasium.com/pirxpilot/postmark-log
