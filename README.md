# Kiss!

> Keep It Stupid Simple CLI, an IDEs agnostic file snippets

[![MIT License][license-img]][license-url] [![NPM version][npm-version-img]][npm-url] [![NPM downloads][npm-downloads-img]][npm-url] [![Build][travis-img]][travis-url] [![Coverage][coverall-img]][coverall-url]

**You will need Kiss:**
- if you are a developer
- if developers in a project need to used the same snippets
- to quickly create files from a command line based on user defined snippets (project > user's home > global)


<img src="https://raw.githubusercontent.com/sixertoy/kiss-cli/master/img/kiss-cli.gif" width="577" height="479" />


## Examples

Generating a simple HTML page and an Angular module
```bash
kiss index.html src/mymodule.ng
```
> Kiss use [fs-extra](https://github.com/jprichardson/node-fs-extra) modules to generate unexisting folders

## Install

> **Kiss-cli must be installed globally**

```bash
npm install -g kiss-cli
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

Generate a single/multiple file(s) based on the same template
```bash
kiss <type> <relative/filename> [<relative/filename> ...]
```

Generate a single/multiple file(s) based on differents templates
```bash
kiss <relative/filename.type> [<relative/filename.type> ...]
```

Generate a single/multiple file(s) with no extension based on a templates
```bash
kiss <type> <relative/filename.> [<relative/filename.type> ...]
```

Show a model's content
```bash
kiss <model-name>
```

Show version
```bash
kiss -V
kiss --version
```

Show help, list available templates and their paths
```bash
kiss -h
kiss --help
```

## Templates Behaviors

You can create a `.kiss` folder in you ~/home and in a specific project's folder to override/create templates

```project folder > home folder > kiss folder```

## History

- v0.2.0
    - Generate files by types extension
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

## About

This file generator was motivated by the famous French Bonaldi's Effect:<br>
*It's totally unnecessary and therefore strictly indispensable!*<br>
But it's also a great concept of the play [La Cantatrice chauve](https://fr.wikipedia.org/wiki/La_Cantatrice_chauve) by Eugène Ionesco :)

## Issues
- Overwrite an existing file without prompts
- Files permissions
- Units Tests...

[license-img]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license-url]: LICENSE-MIT

[coverall-url]: https://coveralls.io/r/sixertoy/kiss-cli
[coverall-img]: https://img.shields.io/coveralls/sixertoy/kiss-cli.svg?style=flat-square

[travis-url]: https://travis-ci.org/sixertoy/kiss-cli
[travis-img]: http://img.shields.io/travis/sixertoy/kiss-cli.svg?style=flat-square

[npm-url]: https://npmjs.org/package/kiss-cli
[npm-version-img]: http://img.shields.io/npm/v/kiss-cli.svg?style=flat-square
[npm-downloads-img]: http://img.shields.io/npm/dm/kiss-cli.svg?style=flat-square
