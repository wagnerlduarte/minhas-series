import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter, NavLink } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    Home,
    Serie,
    About,
    Series,
    Login,
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

        this.interceptor = new Interceptor()
        this.changeLoadingState = this.changeLoadingState.bind(this)
        this.logout = this.logout.bind(this)
    }

    componentDidUpdate() {
        const isAuthenticated = Auth.isAuthenticated();

        if (isAuthenticated !== this.state.showHeader) {
            this.setState({
                showHeader: Auth.isAuthenticated()
            })
        }

    }

    changeLoadingState(status) {
        this.setState({
            loading: status
        })
    }

    logout() {
        Auth.logout()
        this.props.history.push('/')
    }

    render() {
        this.interceptor.setup(this.changeLoadingState);

        return (
            <div>
                {this.state.showHeader &&
                    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top" role="navigation">
                        <div className="collapse navbar-collapse">
                            <a className="navbar-brand">
                                <img src="/images/logo.png" alt="logo" height="30" />
                            </a>
                            <ul className="nav navbar-nav mr-auto">
                                <li className="nav-item">
                                    <NavLink activeClassName="active" className="nav-link" to="/home">Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink activeClassName="active" className="nav-link" to="/serie">Nova Série</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink activeClassName="active" className="nav-link" to="/about">Sobre</NavLink>
                                </li>
                            </ul>
                            <ul className="nav navbar-nav">
                                <BellNotification />
                                <li className="nav-item">
                                    <a className="nav-link" href="javascript:;" onClick={() => this.logout()}>Logout <i className="fas fa-sign-out-alt"></i></a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                }

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
                        <Redirect to="/" />
                    </Switch>
                </section>
                {this.state.loading &&
                    <Loader />
                }

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
