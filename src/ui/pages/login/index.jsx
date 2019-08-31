import React, { Component } from "react"
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap"
import "./Login.css"

import FormDivider from '../../components/form-divider'
import SocialLink from '../../components/social-link'

import { Auth as auth } from '../../../services'
import Facebook from "../../components/facebook-login";

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: ""
        }
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        auth.login(this.state).then(() => {
            this.props.history.push('/')
        })
    }

    render() {
        const providers = ['facebook', 'github', 'google', 'twitter']; // To remove a provider from the list just delete it from this array...
        return (
            <div className="Login">
                <div className="row">
                    <div className="col-md-12">
                        {providers.map(provider => (
                            <SocialLink provider={provider} key={provider} />
                        ))}
                        {/* <Facebook /> */}
                    </div>
                </div>
                <FormDivider />
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email" size="large">
                        <FormLabel>Email</FormLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" size="large">
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    <Button
                        block
                        size="large"
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        Login
                    </Button>
                </form>
            </div>
        )
    }
}