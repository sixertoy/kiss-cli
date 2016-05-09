# Kiss!

> Keep It Stupid Simple templated files generator

[![MIT License][license-img]][license-url] [![NPM version][npm-version-img]][npm-url] [![NPM downloads][npm-downloads-img]][npm-url] [![Build][travis-img]][travis-url] [![Coverage][coverall-img]][coverall-url]

**You will need Kiss:**
- if you are a developper
- if you are a team of developpers
- and... especially, if you are sharing models with all contributors of a project across a lot of and differents IDE *(subl, atom, vim, intllij...)*

<img src="https://raw.githubusercontent.com/sixertoy/kiss-cli/v0.1.40/img/kiss-cli.gif" width="577" height="479" />

This templated files generator was motivated by the famous French Bonaldi's Effect:<br>
*It's totally unnecessary and therefore strictly indispensable!*<br>
But it's also a great concept of the play [La Cantatrice chauve](https://fr.wikipedia.org/wiki/La_Cantatrice_chauve) by Eugène Ionesco... in fact.

## Install

> **must be installed globally**

```bash
npm install -g kiss-cli
```

## Usage

```bash
kiss <relative/path/to/output/file> <type>
```

Show a content of a models
```bash
kiss <model-name>
```

## Default available templates

- **amd** naked AMD module
- **angular-module** a naked and simple Angular module
- **grunt-task**
- **gruntfile**
- **gulpfile**
- **html**
- **js** naked CommonJS module
- **mocha** base for a Mocha test file

## Options

Show KISS version
```bash
kiss -V
kiss --version
```

Show KISS help with a list of available templates and their paths
```bash
kiss -h
kiss --help
```

## History

- v0.1.41
    - Remove --debug option
    - Remove commander as cli parser
- v0.1.40
    - Manage dotfiles
- v0.1.34
    - Custom templates in your home folder
    - Custom templates in your project folder
    - ```project folder > home folder > kiss folder```
- v0.1.24
    - Fix install 'npm install -g kiss-cli'

## Issues
- Overwrite an existing file without prompts
- Files permissions

[license-img]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license-url]: LICENSE-MIT

[coverall-url]: https://coveralls.io/r/sixertoy/kiss-cli
[coverall-img]: https://img.shields.io/coveralls/sixertoy/kiss-cli.svg?style=flat-square

[travis-url]: https://travis-ci.org/sixertoy/kiss-cli
[travis-img]: http://img.shields.io/travis/sixertoy/kiss-cli.svg?style=flat-square

[npm-url]: https://npmjs.org/package/kiss-cli
[npm-version-img]: http://img.shields.io/npm/v/kiss-cli.svg?style=flat-square
[npm-downloads-img]: http://img.shields.io/npm/dm/kiss-cli.svg?style=flat-square
