import React, { Component } from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import Interceptor from './Interceptor';

import { Loader } from './loader/loader.component';

import Home from './Home';
import NewSeries from './NewSeries';
import EditSeries from './EditSeries';
import About from './About';
import Series from './Series';

//stateless component
// const About = () => <section className="intro-section"><h1>Sobre</h1></section>


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
                                    <Link to="/new">New Series</Link>
                                </li>
                                <li>
                                    <Link to="/about">Sobre</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <section>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/series/edit/:id" component={EditSeries} />
                        <Route path="/series/:genre" component={Series} />
                        <Route path="/about" component={About} />
                        <Route path="/new" component={NewSeries} />
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
