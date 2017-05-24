const { Maze, ends } = require('./')
const { equals } = require('vector2d')
const { index, cells } = require('grid')
const sprites = {
	floor: '  ',
	wall: String.fromCharCode(0x2588).repeat(2)
}

var size = 25
var maze = Maze(size, size, Math.random())
var world = {
	width: size,
	height: size,
	tiles: new Array(size * size)
}

for (var cell of cells(world)) {
	world.tiles[index(world, cell)] =
		maze.find(other => equals(cell, other))
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
