# :kiss: KISS

KISS (Keep It Stupid Simple) CLI is an IDEs agnostic file snippets

#### You will need Kiss if

- You are a developer
- Developers in a project share snippets files

#### Examples

```bash
# Generates an HTML page
kiss html ./index

# Generates an ExpressJS server file
kiss ./index.server

# Generates some React components file
kiss ./src/app/components/MyComponent.redux ./src/app/components/MyComponent2.dumb

# Show template's content in console output
kiss redux
```

#### Defaults available types/templates

- `html` HTML minimal ready page
- `gulpfile` Simple Gulp task
- `mocha` Simple Mocha test file
- React
  - `redux` A Redux connected pure component
  - `dumb` Component

## Install

> Must be installed globally

```bash
npm install -g kiss-cli
```

## Usage

> Create a `.kiss` folder in your project's directories to override/create templates<br>
> Kiss looks for templates in `project root directory > user's home > global install`

```bash
# Generate a single/multiple file(s) based on the same template
kiss <type> <relative/path/to/filename> [<r/p/t/filename> ...]

# Generate a single/multiple file(s) based on differents templates
kiss <relative/path/to/filename.type> [<r/p/t/filename.type> ...]
```

## History

- v0.3.1
    - Refactor all the things in ES6
    - Removing Angular, AMD, Grunt... Templates
    - Adding React Templates
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
    - `project folder > home folder > kiss folder`
- v0.1.24
    - Fix install 'npm install -g kiss-cli'

## About

> This file generator was motivated by the famous French Bonaldi's Effect:<br>
*It's totally unnecessary and therefore strictly indispensable!*<br>
But it's also a great concept of the play [La Cantatrice chauve](https://fr.wikipedia.org/wiki/La_Cantatrice_chauve) by Eugène Ionesco :)

## Issues
- Overwrite an existing file without prompts
- Files permissions
- Units Tests...

[![MIT License][license-img]][license-url] [![NPM version][npm-version-img]][npm-url] [![NPM downloads][npm-downloads-img]][npm-url] [![Build][travis-img]][travis-url] [![Coverage][coverall-img]][coverall-url]

[license-img]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license-url]: LICENSE-MIT

[coverall-url]: https://coveralls.io/r/sixertoy/kiss-cli
[coverall-img]: https://img.shields.io/coveralls/sixertoy/kiss-cli.svg?style=flat-square

[travis-url]: https://travis-ci.org/sixertoy/kiss-cli
[travis-img]: http://img.shields.io/travis/sixertoy/kiss-cli.svg?style=flat-square

[npm-url]: https://npmjs.org/package/kiss-cli
[npm-version-img]: http://img.shields.io/npm/v/kiss-cli.svg?style=flat-square
[npm-downloads-img]: http://img.shields.io/npm/dm/kiss-cli.svg?style=flat-square
