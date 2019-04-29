import React, { Component } from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import Interceptor from './Interceptor';

import { Loader } from './loader/loader.component';

import Home from './Home';
import Serie from './Serie';
import About from './About';
import Series from './Series';

class App extends Component {

    constructor() {
        super()

        this.state = {
            loading: false
        }

        this.interceptor = new Interceptor()
        this.changeLoadingState = this.changeLoadingState.bind(this)
    }

    changeLoadingState(status) {
        this.setState({
            loading: status
        })
    }

    render() {
        this.interceptor.setup(this.changeLoadingState);

        return (
            <div>
                <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
                    <div className="container">
                        <div className="navbar-header page-scroll">
                            <a className="navbar-brand page-scroll" href="#page-top">
                                <img src="/images/logo.png" alt="logo" height="30" />
                            </a>
                        </div>
                        <div className="collapse navbar-collapse navbar-ex1-collapse">
                            <ul className="nav navbar-nav">
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/serie">Nova Série</Link>
                                </li>
                                <li>
                                    <Link to="/about">Sobre</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <section className="container">
                    <Switch>
                        <Route path="/" component={Home} exact />
                        <Route path="/serie" render={(props) => <Serie {...props} />} exact />
                        <Route path="/serie/:id" render={(props) => <Serie key={props.match.params.id} {...props} />} exact />
                        <Route path="/series/:genre" component={Series} exact />
                        <Route path="/about" component={About} exact />
                        <Redirect to="/" />
                    </Switch>
                </section>
                {this.state.loading &&
                    <Loader />
                }
            </div>
        )
    }
}

export default App;
