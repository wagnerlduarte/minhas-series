import React, { Component } from 'react';
import { Route, Link, Switch, Redirect, withRouter } from 'react-router-dom';
import Interceptor from './Interceptor';
import auth from './auth'

import { Loader } from './loader/loader.component';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './Home';
import Serie from './Serie';
import About from './About';
import Series from './Series';
import Login from "./login/Login";

const PrivateRoute = ({ component: Component, render: render, ...rest }) => {
    if (render && auth.isAuthenticated()) {
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
                    auth.isAuthenticated() ? (
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
        const isAuthenticated = auth.isAuthenticated();

        if (isAuthenticated !== this.state.showHeader) {
            this.setState({
                showHeader: auth.isAuthenticated()
            })
        }

    }

    changeLoadingState(status) {
        this.setState({
            loading: status
        })
    }

    logout() {
        auth.logout()
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
                                    <Link className="nav-link" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/serie">Nova Série</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/about">Sobre</Link>
                                </li>
                            </ul>
                            <ul className="nav navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link" href="javascript:;" onClick={() => this.logout()}>Logout</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                }

                <section className="container">
                    <Switch>
                        <Route path="/" exact render={(props) => {
                            if (!auth.isAuthenticated()) {
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
