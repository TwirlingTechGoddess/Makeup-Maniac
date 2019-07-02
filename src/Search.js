import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


class Search extends Component {
  constructor() {
    super()

    this.state = {
      value: ''
    }
  }

  handleChange(event) {
    event.preventDefault()
    this.setState({
      value: event.target.value
    })
    this.props.filterProducts(this.state.value)
  }

  render() {

    return(
      <div>
        <form>
          <input className='Search'
                 type='search' 
                 placeholder='search for brands or keywords' 
                 value={this.state.value}
                 onChange={this.handleChange.bind(this)}/>
        </form>
      </div>
    )
  }



}

export default Search;