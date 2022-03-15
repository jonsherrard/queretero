# queretero

Hello there! Welcome to my coding application

## Running the Application at V2 Stage:

```sh
# git clone this repository as you'd like
# Once inside the root dir:
cd comments
npm install
npm run start
```

Then navigate to `http://localhost:3000` in a chrome/brave/safari browser.

For speed of development, and setup for you dear reader. I've opted to forego any front-end asset compilation at all!

How did I write a React application you ask?

Well, I've some experience with Jason Miller's library `htm`, which lets you write "JSX-like" components in template literal strings, so I opted for that with CDN delivered Tailwind for CSS.

This all means that once you've run `npm start` and `express` is doing it's thing, you're ready to go. The caveat being: I haven't considered older browsers whatsoever, I'm using lots of new ES6 syntax in my JavaScript, so I hope you're using Safari, Firefox, or a Chromium browser.

N.B An SQLite database has been commited with example comments and upvotes.

## Testing V2

Use the form input and submit button to add a new comment to the database.

Click the upvote button register a new upvote. Open two browsers in real time to see them update in realtime via websockets.

Click reply to open a nested reply form.

## Overview

```md
View: Handlebars
Server: Express
JavaScript:

- Vanilla (public/scripts/client.js)
- `htm` hosted on unpkg
- `React` hosted on unpkg
- `ReactDOM hosted on unpkg
  CSS: Tailwind.css hosted by tailwind
  Database: SQLite with Prisma ORM and Migrations Tool
```

## Notes

- Username and profile image is mocked using faker.js

## Testing

- I wrote some automated tests for the `POST` APIs.
- Everything else wasx manually tested

## Development Journey

I document the larger phases of work through Pull Requests.

### Version 1

1. [Static HTML and CSS layout for comments based on Figma Design](https://github.com/jonsherrard/queretero/pull/1) | [Files](https://github.com/jonsherrard/queretero/pull/1/files)

2. [Static HTML and CSS for the input form based on Figma Design](https://github.com/jonsherrard/queretero/pull/2) | [Files](https://github.com/jonsherrard/queretero/pull/2/files)

3. [Basic comments endpoint and introduction of Prisma ORM](https://github.com/jonsherrard/queretero/pull/3) | [Files](https://github.com/jonsherrard/queretero/pull/3/files)

4. [Vanillla JavaScript AJAX form posting](https://github.com/jonsherrard/queretero/pull/4) | [Files](https://github.com/jonsherrard/queretero/pull/4/files)
5. [Server rendering of stored comments](https://github.com/jonsherrard/queretero/pull/5) | [Files](https://github.com/jonsherrard/queretero/pull/5/files)
6. [Upvote API and Upvote client .js](https://github.com/jonsherrard/queretero/pull/6) | [Files](https://github.com/jonsherrard/queretero/pull/6/files)
7. [Focus reply input UX tweak](https://github.com/jonsherrard/queretero/pull/7) | [Files](https://github.com/jonsherrard/queretero/pull/7/files)
8. [Mobile CSS styles](https://github.com/jonsherrard/queretero/pull/8) | [Files](https://github.com/jonsherrard/queretero/pull/8/files)

### Version 2

9. [First version of React-powered upvoting client (not realtime)](https://github.com/jonsherrard/queretero/pull/9) | [Files](https://github.com/jonsherrard/queretero/pull/9/files)
10. [First-pass at adding realtime to Upvotes](https://github.com/jonsherrard/queretero/pull/11) | [Files](https://github.com/jonsherrard/queretero/pull/11/files)
11. [Refactor of state management in the client to prevent WebSocket listener bug](https://github.com/jonsherrard/queretero/pull/11) | [Files](https://github.com/jonsherrard/queretero/pull/11)

---

N.B There are some "in-between" commits for updating packages, tidying commits, and amending typos. [Full commit list](https://github.com/jonsherrard/queretero/commits/main)

---

## Running the Application at V1 Stage:

```sh
# git clone this repository as you'd like
# Once inside the root dir:
cd comments
npm install
npx prisma generate # (You may receive a message along the lines of "already run")
npm run start
```

Then navigate to `http://localhost:3000` in a chrome/brave/safari browser (only browsers I've had time to test so far)

N.B An SQLite database has been commited with example comments and upvotes.

## Testing V1

Use the form input and submit button to add a new comment to the database.

Click the upvote button register a new upvote.

Click reply to focus the input comment (no threading in version 1)

## Overview

```
View: Handlebars
Server: Express
JavaScript: Vanilla (public/scripts/client.js)
CSS: Tailwind.css
Database: SQLite with Prisma ORM and Migrations Tool
```

## Notes

- Username and profile is hard-coded

## Testing

- I wrote some automated tests for the `POST` APIs.
- Everything else is manually tested

---

Thank you for reading if you got this far!
