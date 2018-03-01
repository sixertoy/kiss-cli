# :kiss: KISS

KISS (Keep It Stupid Simple) CLI is an IDEs agnostic file snippets

#### You could have need KISS if

- You are a developer
- You are a developer in a team of developers
- You share your templates with your team (Back/Front)
- You are bored of copying/pasting 2, 3, 4... times from the same file in a row
- ... :watch:

#### A Terminal's story telling (A.K.A. The Example)

```bash
# ---- Creating a new template
# Create a .kiss at your project root directory
cd myproject
mkdir .kiss
# Create a new JSX template
touch ./.kiss/jsx.js
# Fill template content
echo "const MyComponent = () => (<div />);" > ./.kiss/jsx.js
# ---- Now it's time to write a new React component from scratch
# ...(check an already existing file similar to the one you would like to create, in your current project)
# ...(copy your existing content)
# ...(paste your existing content into the new file)
# ...(check unnecessary code)
# ...(remove all unnecessary code)
# ...(check if you forgot something)
# ...(you probably forgot something)
# ...(remove or add this something)
# 
# Or use KISS :)
kiss ./src/app/components/mycomponent.redux ./src/app/components/mytoggler.dumb
# now you can share your templates with your teammates ;)
```

## Usage

> Create a `.kiss` folder in your project's directories to override/create templates<br>
> Kiss looks for templates in `project root directory > user's home > global install`

```bash
# Generate a single/multiple file(s) based on the same template
kiss <type> <relative/path/to/myfile.ext> [<r/p/t/myfile.ext> ...]

# Generate a single/multiple file(s) based on differents templates
kiss <relative/path/to/myfile.type> [<r/p/t/myfile.type> ...]
```

## Install

> Must be installed globally

```bash
npm install -g kiss-cli
```

#### Defaults available types/templates

- `html` HTML minimal ready page
- `gulpfile` Simple Gulp task
- `mocha` Simple Mocha test file
- React
  - `redux` A Redux connected pure component
  - `dumb` Component

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
