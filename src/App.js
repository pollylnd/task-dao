import React, { Component } from 'react';
import data from './data/graph.json'
import Selector from './components/Selector'
import Result from './components/Result'

import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      start: 'A',
      end: 'A',
      showResult: false
    }

    this.changeStart = this.changeStart.bind(this)
    this.changeEnd = this.changeEnd.bind(this)
    this.showResult = this.showResult.bind(this)
  }

  changeStart(start) {
    this.setState({ start: start })
  }

  changeEnd(end) {
    this.setState({ end: end })
  }

  showResult() {
    this.setState({showResult: true})
  }

  render() {
    return(
      <div className='App'>
        <div className='Selectors'>
          <Selector data={data.vertex[0]} changeStart={this.changeStart} />
          <Selector data={data.vertex[0]} changeEnd={this.changeEnd} />
        </div>
        
        <button onClick={this.showResult} >Отправить</button>
        <Result showResult={this.state.showResult} nodes={data.vertex[0]} start={this.state.start} end={this.state.end} />
      </div>
      
    )
  }
}

export default App
