import React, { Component } from 'react';
import _ from 'lodash'

class Selector extends Component {
  constructor(props) {
    super(props)

    this.change = this.change.bind(this)
  }
  change(event) {
    _.get(this.props, 'changeStart', false) ? 
    this.props.changeStart(event.target.value) :
    this.props.changeEnd(event.target.value)
  }
  render() {
    const data = this.props.data
    
    const option = (key) => (
      <option key={key}> {key} </option>
    )
    
    return(
      <select size={_.size(data) > 4 ? '4' : _.size(data)} onChange={this.change}>
        {_.map(data, (value, key) => option(key))}
      </select>
    ) 
  }
}

export default Selector