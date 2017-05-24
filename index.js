module.exports = Maze
Maze.Maze = Maze
Maze.ends = ends

const { cells } = require('grid')
const { adjacent } = require('cell')
const { choose } = require('frand')
const { add, multiply, equals } = require('vector2d')
const { resolve, values: directions } = require('direction')

function Maze(width, height, seed) {
	var maze = []
	var nodes = cells({ width, height }).filter(cell => cell.x % 2 && cell.y % 2)
	var node = choose(nodes, seed++)
	var stack = [node]
	while (stack.length) {
		maze.push(node)
		var index = nodes.indexOf(node)
		if (index !== -1) {
			nodes.splice(index, 1)
		}
		var neighbors = []
		var deltas = new Map()
		for (var direction of directions) {
			var delta = resolve(direction)
			var target = add(node, multiply(delta, 2))
			var neighbor = nodes.find(node => equals(node, target))
			if (neighbor) {
				neighbors.push(neighbor)
				deltas.set(neighbor, delta)
			}
		}
		if (neighbors.length) {
			var neighbor = choose(neighbors, seed++)
			var midpoint = add(node, deltas.get(neighbor))
			maze.push(midpoint)
			stack.push(neighbor)
			node = neighbor
		} else {
			stack.pop()
			node = stack[stack.length - 1]
		}
	}
	return maze
}

function ends(maze) {
	return maze.filter(cell => {
		var neighbors = maze.filter(other => adjacent(cell, other))
		return neighbors.length === 1
	})
}
