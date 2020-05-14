[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][deps-image]][deps-url]

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

[travis-image]: https://img.shields.io/travis/com/pirxpilot/postmark-log.svg
[travis-url]: https://travis-ci.com/pirxpilot/postmark-log

[deps-image]: https://img.shields.io/david/pirxpilot/postmark-log.svg
[deps-url]: https://david-dm.org/pirxpilot/postmark-log
