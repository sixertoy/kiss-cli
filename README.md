# Kiss!

> Keep It Stupid Simple file template

[![MIT License][license-img]][license-url] [![NPM version][npm-version-img]][npm-url] [![NPM downloads][npm-downloads-img]][npm-url]


##### **Kiss** is a command line tool for creating templated files, written in JavaScript/NodeJS

Generator of files which was motivated by the one and only, Bonaldi's Effect:<br>
*It's totally unnecessary and therefore strictly indispensable!*<br>
This great concept was first designed by the play [La Cantatrice chauve](https://fr.wikipedia.org/wiki/La_Cantatrice_chauve) by Eugène Ionesco.


## Install

```bash
npm install -g kiss-cli
```

> **must be installed globally**

## Usage

```bash
kiss <relative/path/to/output/file> <type> 
```

## Customs Templates

:warning: **All custom snippets in a .kiss folder must have executable rights**

### All Projects of an user
If you want to use your own templates for all of your projects:
- Create a ```.kiss``` folder in your home directory
- Then add your own templates files inside it

### Single Project
If you want to use your own templates for a single project:
- Create a ```.kiss``` folder in the root directory of your project
- Then add your own templates files inside it

## Defaults Templates Types

- **amd**
> an AMD module
- **angular-module**
> a Angular module
- **grunt-task**
> a simple Grunt's task
- **gruntfile**
> base for a Gruntfile
- **gulpfile**
> base for a Gulpfile
- **html**
> a simple HTML page
- **js**
> a simple CommonJS module
- **mocha**
> base for Mocha test file

### Priorities

Project Templates > User Templates > .kiss templates

## Options

```bash
# Show help with templates paths
kiss -S
kiss --debug
# Show available templates and theirs paths
kiss -S
kiss --show
# Show template content
kiss -S amd
```

## Issues

- No Mocha tests
- Overwrite existing file by default without prompts

## History

- v0.1.36 remove chalk module
- v0.1.34 a directory ```.kiss``` in project or home folder can now be used to override defaults templates - :warning: chmod -R 0755
- v0.1.24 Fix install 'npm install -g kiss-cli'
- v0.1.22 Add gulpfile template
- v0.1.16 Fix NPM install...

[license-img]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license-url]: LICENSE-MIT

[npm-url]: https://npmjs.org/package/kiss-cli
[npm-version-img]: http://img.shields.io/npm/v/kiss-cli.svg?style=flat-square
[npm-downloads-img]: http://img.shields.io/npm/dm/kiss-cli.svg?style=flat-square
