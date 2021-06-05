# Hammy Change Log
This document serves as the complete changelog for Hammy's development. All versions listed here record the changes that have occurred between versions uploaded to this repository.

## v1.5.0.1 (Hotfix)
### Minor Updates
- `dotenv` package updated to v10
- Fixed a security vulnerability with websocket package via update

## v1.5
### Major Updates
- More administrative commands added (load, unload, reload)
- Added two more phrases
### Minor Updates
- `help` command hides administrative commands
- Updated Discord.js to v12.5.3
- Some minor code tweaks

## v1.4.1
### Minor Updates
- Added an alias to `killmode`
### Bug-fixes
- Fixed a problem with the `help` command
- Fixed a syntax error in the `shutdown` command

## v1.4
### Major Updates
- Removed the `evaluate` command, was unneeded
- Keysmash phrase now gets randomized instead of being a static phrase
- New command: `killmode`, try if you dare ;)
### Minor Updates
- Tidied up command code
- Merged phraseSwitch function in message event to main module

## v1.3
### Major Updates
- Mentioning the bot now returns the universal bot prefix
- Two new commands: `pun` and `evaluate` (restricted to bot owner)
- Seven new phrases added, now for a total of 20

## v1.2.2
### Major Updates
- HammyBot repository and bot shortened to Hammy
- README file updated
### Minor Updates
- Discord.js updated to v12.5.1
- GitHub link in `invite` command updated to match repository name
- All instances of HammyBot shortened to new name
- Removed cached user count from `botinfo` command

## v1.2.1
### Minor Updates
- Discord.js updated to v12.4.1

## v1.2
### Major Updates
- Added four commands: `botinfo`, `help`, `invite`, and `shutdown` (last one is owner-specific)
- Bot prefix changed from "!" to tilde ("~")
- Colors JSON file added to compliment embed messages
- One new phrase added!
### Minor Updates
- Code cleanup in *message* event
- Ready message changed and set in *config/settings.json* file
- 'removeEndingZeroes' function moved to new *config/util.js* file for use in *ready* event and `botinfo` command

## v1.1.1
### Minor Updates
- Added one new phrase
- "Hope <name> has a wonderful day!" message now uses member's nickname if applicable

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
