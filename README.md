# Memory Game Project [Udacity FEND Project]

## Objectives

"The Memory Game Project is all about demonstrating your mastery of HTML, CSS, and JavaScript. You’ll build a complete browser-based card matching game (also known as Concentration)."
The number of moves made by the player is displayed.
A rating system is displayed based on the number of moves made by the player.
A timer (in seconds) is displayed to mark the running game time.

## Instructions

The starter project has some HTML and CSS styling to display a static version of the Memory Game project. You'll need to convert this project from a static project to an interactive one. This will require modifying the HTML and CSS files, but primarily the JavaScript file.

To get started, open `js/app.js` and start building out the app's functionality

The games has no dependencies. If you want to run it locally, just clone or download it and open the index.html file in your browser.

To see the game in action, access it [HERE](https://digaodev.github.io/fend-project-memory-game/);

![Screen Shot for app](https://github.com/digaodev/fend-project-memory-game/blob/docs/docs/Screen_app.png?raw=true)

## How The Game Works

The game board consists of sixteen "cards" arranged in a grid. The deck is made up of eight different pairs of cards, each with different symbols on one side. The cards are arranged randomly on the grid with the symbol face down. The gameplay rules are very simple: flip over two hidden cards at a time to locate the ones that match!

Each turn:

- The player flips one card over to reveal its underlying symbol.
- The player then turns over a second card, trying to find the corresponding card with the same symbol.
- If the cards match, both cards stay flipped over.
- If the cards do not match, both cards are flipped face down.
- The game ends once all cards have been correctly matched.

