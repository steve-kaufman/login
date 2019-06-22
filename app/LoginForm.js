import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class LoginForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    add_user() {
        fetch('/add-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        }).then(res => res.text()).then(res => console.log(res));
    }
    on_submit(e) {
        e.preventDefault();
        fetch('/auth', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        }).then(res => res.text()).then(res => console.log(res));
    }
    on_change_uname(e) {
        this.setState({
            username: e.target.value,
            password: this.state.password
        });
    }
    on_change_passwd(e) {
        this.setState({
            username: this.state.username,
            password: e.target.value
        });
    }

    render() {
        return (
            <div className="LoginForm">
                <Container>
                <Form>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="text" placeholder="Username" />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                  <Button variant="secondary" type="button">
                    Add User
                  </Button>
                </Form>
                </Container>
            </div>
        );
    }
}
