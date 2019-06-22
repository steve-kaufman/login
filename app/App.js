import React, { Component } from 'react';
import LoginForm from './LoginForm';
import Todos from './Todos';

export default class App extends Component {
    render() {
        return (
            <div className="App">
                <LoginForm />
                <Todos />
            </div>
        );
    }
}
