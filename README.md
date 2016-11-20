# Trello Custom Print

Customize print layout of your *Trello.com* boards.

**Working service is [>> here <<](https://yarosla.github.io/trello-custom-print/)**.

### Technical Details

- built with Angular 2 & Bootstrap 3 using Webpack
- uses Trello API to fetch your data
- compiles to static web page (no server-side components)
- hosted on GitHub

### Contributors Welcome

- further customize layout options (see `board-settings.component`)
- develop more card templates (see `src/cards` folder)

### Building

    npm install -g typescript webpack
    npm install

Get your Trello API key from here: https://trello.com/app-key

Debug:

    API_KEY=xxx webpack -d --watch

Production:

    API_KEY=xxx webpack -p
