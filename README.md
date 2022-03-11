# queretero

Hello there! Welcome to my coding application.

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
