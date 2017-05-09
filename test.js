const { Maze, ends } = require('./')
const { Seed } = require('random')
const { equals } = require('vector2d')
const { index, cells } = require('grid')
const sprites = {
	floor: '  ',
	wall: String.fromCharCode(0x2588).repeat(2)
}

var seed = Seed(Math.random())
var maze = Maze(25, 25)(seed)
var world = {
	width: maze.width,
	height: maze.height,
	tiles: new Array(maze.width * maze.height)
}

for (var cell of cells(world)) {
	world.tiles[index(world, cell)] =
		maze.cells.find(other => equals(cell, other))
			? 'floor'
			: 'wall'
}

console.log(render(world))
console.log(`This maze has ${ends(maze).length} dead ends.`)

function render(world) {
	var view = ''
	for (var cell of cells(world)) {
		var tile = world.tiles[index(world, cell)]
		var sprite = sprites[tile]
		if (!cell.x && cell.y) {
			view += '\n' + sprite
		} else {
			view += sprite
		}
	}
	return view
}
