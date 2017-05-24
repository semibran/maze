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

See [`test.js`](https://github.com/semibran/maze/blob/master/test.js) for an extensive example. You could also clone this repository and run the script locally if you'd like to test the maze generator for yourself.

### `Maze(width, height, seed)`
Generate a `Maze` of the specified `width` and `height` with the given `seed`.
```js
var maze = Maze(25, 25, Math.PI)
```
A `Maze` is just a plain array of `{ x, y }` pairs (cells).

### `ends(maze)`
Find all the dead ends in the given `maze` and returns a list of cells denoting their positions.
```js
console.log(`This maze has ${ends(maze).length} dead ends.`)
```

## license
MIT
