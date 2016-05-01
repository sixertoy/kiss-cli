# Kiss!

> Keep It Stupid Simple file template

[![MIT License][license-img]][license-url] [![NPM version][npm-version-img]][npm-url] [![NPM downloads][npm-downloads-img]][npm-url] [![Build][travis-img]][travis-url] [![Coverage][coverall-img]][coverall-url]


##### **Kiss** is a command line tool for creating templated files, written in JavaScript/NodeJS

Generator of files which was motivated by the one and only, Bonaldi's Effect:<br>
*It's totally unnecessary and therefore strictly indispensable!*<br>
This great concept was first designed by the play [La Cantatrice chauve](https://fr.wikipedia.org/wiki/La_Cantatrice_chauve) by Eugène Ionesco.

<img src="https://raw.githubusercontent.com/sixertoy/kiss-cli/v0.1.40/img/kiss-cli.gif" width="577" height="479" />

## Install

> **must be installed globally**

```bash
npm install -g kiss-cli
```

## Usage

```bash
kiss <relative/path/to/output/file> <type>
```

## Customs Templates

:warning: **Check files permissions**

### All Projects of an user
If you want to use your own templates for all of your projects:
- Create a ```.kiss``` folder in your home directory
- Then add your own templates files inside it

### Single Project
If you want to use your own templates for a single project:
- Create a ```.kiss``` folder in the root directory of your project
- Then add your own templates files inside it

## Defaults Templates Types

- **amd** naked AMD module
- **angular-module** a naked and simple Angular module
- **grunt-task**
- **gruntfile**
- **gulpfile**
- **html**
- **js** naked CommonJS module
- **mocha** base for Mocha test file

## Options

```bash
# Show availables templates
kiss --debug
# Show a template content in console
kiss -D amd
```

## Issues

- Overwrite existing file by default without prompts

## History

- v0.1.40
    - Manage dotfiles
    - Custom templates extensions
    - And no extension files
- v0.1.34
    - Support customs templates
    - Templates in a project overrides home folder templates
    - Home folder templates overrides kiss globals templates
- v0.1.24
    - Fix install 'npm install -g kiss-cli'

[license-img]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license-url]: LICENSE-MIT

[coverall-url]: https://coveralls.io/r/sixertoy/kiss-cli
[coverall-img]: https://img.shields.io/coveralls/sixertoy/kiss-cli.svg?style=flat-square

[travis-url]: https://travis-ci.org/sixertoy/kiss-cli
[travis-img]: http://img.shields.io/travis/sixertoy/kiss-cli.svg?style=flat-square

[npm-url]: https://npmjs.org/package/kiss-cli
[npm-version-img]: http://img.shields.io/npm/v/kiss-cli.svg?style=flat-square
[npm-downloads-img]: http://img.shields.io/npm/dm/kiss-cli.svg?style=flat-square
