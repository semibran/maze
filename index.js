module.exports = { Maze, ends }

const { cells } = require('grid')
const { adjacent } = require('cell')
const { choose } = require('random')
const { add, multiply, equals } = require('vector2d')
const directions = require('directions')

function Maze(width, height) {
	return function generate(seed) {
		var maze = {
			width, height,
			cells: []
		}
		var nodes = cells(maze).filter(cell => cell.x % 2 && cell.y % 2)
		var node = choose(nodes)(seed)
		var stack = [node]
		while (stack.length) {
			maze.cells.push(node)
			var index = nodes.indexOf(node)
			if (index !== -1) {
				nodes.splice(index, 1)
			}
			var neighbors = []
			var deltas = new Map()
			for (var direction in directions) {
				var delta = directions[direction]
				var target = add(node, multiply(delta, 2))
				var neighbor = nodes.find(node => equals(node, target))
				if (neighbor) {
					neighbors.push(neighbor)
					deltas.set(neighbor, delta)
				}
			}
			if (neighbors.length) {
				var neighbor = choose(neighbors)(seed)
				var midpoint = add(node, deltas.get(neighbor))
				maze.cells.push(midpoint)
				stack.push(neighbor)
				node = neighbor
			} else {
				node = stack.pop()
			}
		}
		return maze
	}
}

function ends (maze) {
	return maze.cells.filter(cell => {
		var neighbors = maze.cells.filter(other => adjacent(cell, other))
		return neighbors.length === 1
	})
}
