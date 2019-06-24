import React, { Component } from 'react'
import Todo from './Todo'

import './styles/Todos.css'

export default class Todos extends Component {
  render () {
    return (
      <div className="Todos">
        <Todo />
        <Todo />
      </div>
    )
  }
}
