import React, { Component, useState } from 'react';
import { Route, Switch, Redirect, withRouter, NavLink } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    Navbar,
    Nav
} from 'react-bootstrap';

import {
    Home,
    Serie,
    About,
    Series,
    Login,
    ConnectProvider,
    Loader,
    BellNotification
} from './ui';

import { Interceptor, Auth } from './services'

const PrivateRoute = ({ component: Component, render: render, ...rest }) => {
    if (render && Auth.isAuthenticated()) {
        return (
            <Route
                {...rest}
                render={render}
            />)
    }
    else {
        return (
            <Route
                {...rest}
                render={props => (
                    Auth.isAuthenticated() ? (
                        <Component {...props} />
                    ) : (
                            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                        )
                )}
            />
        )
    }
}

class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            showHeader: false
        }

        this.logout = this.logout.bind(this)
    }

    componentDidMount() {
        this.setState({
            showHeader: Auth.isAuthenticated()
        })
    }

    componentDidUpdate() {
        const isAuthenticated = Auth.isAuthenticated();

        if (isAuthenticated !== this.state.showHeader) {
            this.setState({
                showHeader: isAuthenticated
            })
        }

    }

    logout() {
        Auth.logout()
        this.props.history.push('/')
    }

    render() {

        return (
            <div>

                {this.state.showHeader &&
                    <Navbar bg="light" expand="lg" className="fixed-top" role="navigation" style={{ minHeight: '56px' }}>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <a className="navbar-brand">
                                <img src="/images/logo.png" alt="logo" height="30" />
                            </a>
                            <Nav className="mr-auto" >
                                <Nav.Link activeClassName="active" className="nav-link" href="/home">Home</Nav.Link>
                                <Nav.Link activeClassName="active" className="nav-link" href="/serie">Nova Série</Nav.Link>
                                <Nav.Link activeClassName="active" className="nav-link" href="/about">Sobre</Nav.Link>
                            </Nav>
                            <ul className="nav navbar-nav">
                                <BellNotification />

                                <Nav.Link className="nav-link" href="javascript:;" onClick={() => this.logout()}>Logout <i className="fas fa-sign-out-alt"></i></Nav.Link>

                            </ul>
                        </Navbar.Collapse>
                    </Navbar>
                }

                <Interceptor />

                <section className="container">
                    <Switch>
                        <Route path="/" exact render={(props) => {
                            if (!Auth.isAuthenticated()) {
                                return <Login {...props} />
                            } else {
                                return <Redirect to={'/home'} />
                            }
                        }
                        } />
                        <PrivateRoute path="/home" component={Home} exact />
                        <PrivateRoute path="/serie" render={(props) => <Serie {...props} />} exact />
                        <PrivateRoute path="/serie/:id" render={(props) => <Serie key={props.match.params.id} {...props} />} exact />
                        <PrivateRoute path="/series/:genre" component={Series} exact />
                        <PrivateRoute path="/about" component={About} exact />
                        <Route exact path="/connect/:provider" component={ConnectProvider} />
                        <Redirect to="/" />
                    </Switch>
                </section>

                <Loader />

                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable
                    pauseOnHover
                />
            </div>
        )
    }
}

export default withRouter(App);