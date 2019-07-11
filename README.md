# :wrench: KISS

KISS allows you to create your own snippets for a context and share these with your project's teammates.

```bash
npm install -g kiss-cli
mkdir myproject
cd myproject
kiss server ./index.js
```

## :popcorn: Try it!

- KISS must be installed globally
- To add new types, create templates in a folder named `.kiss` at the root directory of your project beside of your `package.json` file
- Templates files must be named `<type>.<extension>`
- Kiss priorize templates in `(project)/.kiss` **>** `/User/home/.kiss` **>** `(global)node_modules/.kiss`

**You could have need KISS if**

- You are a developer
- You are a developer in a team of developers
- You share templates with your team (Back/Front)
- You are bored of copying/pasting script content to create new script files
- ... :kiss:

#### Defaults available types/templates

- `html` HTML minimal ready page
- `server` Simple ExpressJS server
- **React**
  - `pure` React/Redux connected pure component
  - `dumb` React Stateless/Dump component
  - `jest` Simple Jest test file

## History

- v0.3.9
  - update documentation
- v0.3.4
  - :rocket: Release version
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

> This file generator was motivated by the famous French Bonaldi's Effect:<br> > _It's totally unnecessary and therefore strictly indispensable!_<br>
> But it's also a great concept of the play [La Cantatrice chauve](https://fr.wikipedia.org/wiki/La_Cantatrice_chauve) by Eugène Ionesco :)

## Issues

- Overwrite an existing file without prompts
- Not so Asynchronous
- Files permissions
- Units Tests...
- :apple: tested only

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
