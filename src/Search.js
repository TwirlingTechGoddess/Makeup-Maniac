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
    this.props.filterProducts(this.state.value + ' ')
  }

  render() {
    const searchNav = 
    // <NavLink to='/search' 
    //                            key='search' 
    //                            className='nav'>
                        <form>
                          <input className='Search'
                                 type='search' 
                                 placeholder='search for brands or keywords' 
                                 value={this.state.value}
                                 onChange={this.handleChange.bind(this)}/>
                        </form>
                      // </NavLink>

    return(
      <div>
        {searchNav}
      </div>
    )
  }



}

export default Search;