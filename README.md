# :hash: :wrench: KISS

**You could have need KISS if**

- You are a developer
- You are a developer in a team of developers
- You share templates with your team (Back/Front)
- You are bored of copying/pasting script content to create new script files
- ... :kiss:

KISS allows you to create minimal snippets in your projects or in your home directory and share these with your teammates.<br>
In one single command line you can generate single or multiple files from these templates.<br>
KISS (Keep It Stupid Simple) is an IDEs agnostic shareable file templates


#### :spaghetti: a Dev story telling (A.K.A. The Example)

**What we usually do**
```bash
# ...(creating a new file)
# ...(looking for a base file)
# ...(copying existing content)
# ...(pasting existing content into the new file)
# ...(checking for unused code)
# ...(removing all unused code)
# ...(re-checking if you have forgotten something)
# ...(re-checking cause you probably forgot something)
# ...(adding some new code)
```

#### :cookie: ...and how you can do with your own defined templates

```bash
# Scaffolding a simple ExpressJS server from default templates
kiss ./myserver/index.server ./myserver/public/index.html
```

## :popcorn: Try it!

```bash
npm install -g kiss-cli
mkdir myproject
kiss ./myproject/src/nav.redux ./myproject/src/btn1.dumb ./myproject/src/btn2.dumb
```

- KISS must be installed globally
- Create a `.kiss` folder in your project's directories to override default templates
- Kiss looks for templates in `(project)/.kiss` **>** `/User/home/.kiss` **>** `(global)node_modules/.kiss`

#### Options

**Generate multiple files based on the same template**
```bash
kiss <type> <relative/path/to/myfile.ext> [<r/p/t/myfile.ext> ...]
```

**Generate multiple files based on differents templates**
```bash
kiss <relative/path/to/myfile.type> [<r/p/t/myfile.type> ...]
```

#### Defaults available types/templates

- `html` HTML minimal ready page
- `gulpfile` Gulpfile
- `mocha` Simple Mocha test file
- `server` Simple ExpressJS server
- React
  - `redux` A Redux connected pure component
  - `dumb` Dump component

## History

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

> This file generator was motivated by the famous French Bonaldi's Effect:<br>
*It's totally unnecessary and therefore strictly indispensable!*<br>
But it's also a great concept of the play [La Cantatrice chauve](https://fr.wikipedia.org/wiki/La_Cantatrice_chauve) by Eugène Ionesco :)

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
