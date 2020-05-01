# HammyBot Change Log
This document serves as the complete changelog for HammyBot's development. All versions listed here record the changes that have occurred between versions uploaded to this repository.

## v1.1
### Major Updates
- Main `index.js` file cleaned up, moved events to */events* directory
- Phrases moved to */config/phrases.json*
- Added one new phrase, replaces text depending on roles
- Re-added special phrase as one of the phrases
- Removed bot token from */config/settings.json*, uses dotenv

## v1.0.2
### Minor Updates
- Added one new phrase
- Phrases now use a random number generator to select phrases, no longer cycles in order
- Removed counter and luckyNum variables, no longer needed

## v1.0.1
### Minor Updates
- Added a new shutdown command restricted to the bot owner
- Added a logging channel option for the *ready* event
- Updated a phrase to return message author's username instead of a static word

## v1.0
### Major Updates
- First version of HammyBot!
- Using Discord.js v12.2
- Cycles through 8 unique phrases, with some changing depending on the phrase
- Returns a special phrase every 50 or so uses
