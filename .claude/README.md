# Claude Code Configuration

This folder contains shared [Claude Code](https://www.claude.com/product/claude-code) configurations for documentation review.

## Setup

1. Install Claude Code in your terminal by following [this instructions](https://www.claude.com/product/claude-code)

## Folder Structure

- `commands/` - Shared custom commands

## Claude as a copy editor workflow

- Open Claude Code, either in the VS Code extension or in the command line. I (@alcuadrado) recommend the CLI.
- Login if necessary
- Run the custom command `/review @<mdx file>`
- You can auto-accept the changes to that file, and to `.claude/session/`
- Open the document in VS Code
- Any proposed changed will be shown as a merge conflict (`current` changes is the original version)
- The top line of the merge conflict will show what Claude considers to be wrong
- The bottom line of the merge conflict will show what Claude proposes as a fix
- Click Compare Changes in a merge conflict to see a better diff (tip: Change the setting `"merge-conflict.diffViewPosition": "Below"`)
- Read the diff and decide if you want to accept the changes, by clicking "Accept Current Change" or "Accept Incoming Change"

LIMITATIONS: The diff viewer doesn't get updated/closed when you accept the changes, but you can scroll to the next change.

### Cleaning up the history

From time to time you should delete the `.claude/session/_.md_" files, to reset the history of reviews, and start with a fresh review.
