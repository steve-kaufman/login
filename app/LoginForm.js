import React, { Component } from 'react'

import './styles/Form.css'

export default class LoginForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  addUser () {
    fetch('/add-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    }).then(res => res.text()).then(res => console.log(res))
  }
  onSubmit (e) {
    e.preventDefault()
    fetch('/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    }).then(res => res.text()).then(res => console.log(res))
  }
  onChangeUname (e) {
    this.setState({
      username: e.target.value,
      password: this.state.password
    })
  }
  onChangePasswd (e) {
    this.setState({
      username: this.state.username,
      password: e.target.value
    })
  }

  render () {
    return (
      <div className="LoginForm">
        <form onSubmit={ this.onSubmit.bind(this) }>
          <label htmlFor="#uname">Username</label>
          <input id="uname" type="text" placeholder="Username"
            onChange={ this.onChangeUname.bind(this) }/>

          <label htmlFor="#passwd">Password</label>
          <input id="passwd" type="password" placeholder="Password"
            onChange={ this.onChangePasswd.bind(this) }/>

          <button id="login-btn" type="submit">
            Log In
          </button>

          <button id="adduser-btn" onClick={ this.addUser.bind(this) } type="button">
            Add User
          </button>
        </form>
      </div>
    )
  }
}
