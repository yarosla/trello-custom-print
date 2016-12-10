# Trello Custom Print

Customize print layout of your *Trello.com* boards.

**Working service is [>> here <<](https://yarosla.github.io/trello-custom-print/)**.

### Features

- select lists to print
- choose number of columns (1 to 6)
- optionally print descriptions, checklists, *custom fields*
- apply markdown formatting

### How to Use

- give the app permission to read your boards (enable popup windows for this to work)
- select board to print
- adjust layout and visibility options
- press print button

About privacy: This is single page web app hosted on GitHub without any server side logic. So don't be afraid your data is intercepted or stored somewhere.

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
