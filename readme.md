# maze
> Deterministically generate perfect mazes

Alright, maybe this maze generator isn't perfect, but at least it creates "perfect mazes".

![Isometric maze](maze.png "Spunky rendering engine not included.")

## install
```sh
npm install semibran/maze
```

## usage
```js
const { Maze, ends } = require('maze')
```

A `Maze` is a plain object with the fields `width`, `height`, and `cells`, and a `Cell` is just an `{ x, y }` pair.

See [`/test.js`](https://github.com/semibran/maze/blob/master/test.js) for a more extensive example. You could also clone this repository and run the script locally if you'd like to test the maze generator for yourself.

### `Maze`
Generate a `Maze` of the specified `width` and `height` with the given [`seed`](https://github.com/semibran/random#seed).
```js
var maze = Maze(25, 25)(Seed(Math.PI))
```
This function is curried, so you could assign it to a variable and generate multiple mazes of that specific size later on.
```js
var generateMaze = Maze(25, 25)
```

### `ends`
Find all the dead ends in the given maze and returns a list of cells denoting their positions.
```js
console.log(`This maze has ${ends(maze).length} dead ends.`)
```

## license
MIT
