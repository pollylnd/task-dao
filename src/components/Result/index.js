import React, { Component } from 'react'
import _ from 'lodash'

function Queue() {
  this._nodes = []

  this.addToQueue = (priority, key) => {
    this._nodes.push({key: key, priority: priority })
    this.sort()
  }
  this.deleteFromQueue = () => {
    return this._nodes.shift().key
  }
  this.sort = () => {
    this._nodes.sort((a, b) => {
      return a.priority - b.priority
    })
  }
  this.isEmpty = () => {
    return !this._nodes.length
  }
  this.debug = () => {
    return this._nodes
  }
}

function Graph() {
  var INFINITY = 1/0
  this.vertices = {}

  this.addVertex = (name, edges) => { 
    this.vertices[name] = edges
  }
  
  this.shortestPath = (start, finish) => {
    var nodes = new Queue()
    var distances = {}
    var previous = {}
    var path = []
    var smallest
    var vertex
    var neighbor
    var alt

    for(vertex in this.vertices) {
      if(vertex === start) {
        distances[vertex] = 0
        nodes.addToQueue(0, vertex)
      }
      else {
        distances[vertex] = INFINITY
        nodes.addToQueue(INFINITY, vertex)
      }

      previous[vertex] = null
    }

    while(!nodes.isEmpty()) {
      smallest = nodes.deleteFromQueue()

      if(smallest === finish) {
        path = []

        while(previous[smallest]) {
          path.push(smallest)
          smallest = previous[smallest]
        }

        break
      }

      if(!smallest || distances[smallest] === INFINITY){
        continue
      }

      for(neighbor in this.vertices[smallest]) {
        alt = distances[smallest] + this.vertices[smallest][neighbor]

        if(alt < distances[neighbor]) {
          distances[neighbor] = alt
          previous[neighbor] = smallest

          nodes.addToQueue(alt, neighbor)
        }
      }
    }
    return path
  }

  this.pathDistance = (path) => {
    var distance = 0

    for(let vertex in path) {
      if(parseInt(vertex) + 1 < path.length) {
        distance += this.vertices[path[vertex]][path[parseInt(vertex) + 1]]
      }
    }

    return distance
  }
}

class Result extends Component {
  constructor(props) {
    super(props)

    this.g = new Graph()

    this.state = {
      path: [],
      distance: 0
    }

    this.findPathAndDistance = this.findPathAndDistance.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const { start, end } = nextProps

    if(start && end) {
      this.findPathAndDistance(start, end)
    }
  }

  findPathAndDistance(start, end) {
    const nodes = this.props.nodes

    for (let v in nodes) {
      this.g.addVertex(v, nodes[v])
    }

    const shortPath = this.g.shortestPath(start, end).concat([start]).reverse()
    

    this.setState({ path: shortPath, distance: this.g.pathDistance(shortPath) })
  }

  render() {
    const { showResult } = this.props
    console.log(showResult)


    const paths = (path) => {
      return path + ' '
    }

    return showResult ? (
      <div>
        <p>{_.map(this.state.path, (path, key) => paths(path)) } </p>
        <p>{this.state.distance}</p>
      </div>
    ) : null
  }
}

export default Result