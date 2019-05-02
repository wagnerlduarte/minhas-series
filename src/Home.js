import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Tab, Row, Col, ListGroup } from 'react-bootstrap'


import api from './Api';
import SerieThumbnail from './SerieThumbnail';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            genres: [],
            series: {}
        }

        this.renderPaneContent = this.renderPaneContent.bind(this);
    }

    componentDidMount() {
        api.loadGenres().then((response) => {
            this.setState({
                genres: response.data
            })
        })
    }

    renderListItem(genre) {
        return (
            <ListGroup.Item key={genre} action href={`#${genre}`}>
                {genre}
            </ListGroup.Item>
        )
    }

    renderPaneContent(genre) {
        return (
            <Tab.Pane onEnter={() => this.onSelectTab(genre)} key={genre} eventKey={`#${genre}`}>
                {this.state.series[genre] && this.state.series[genre].length > 0 &&
                    this.state.series[genre].map((serie) => {
                        return <SerieThumbnail serie={serie} showButtons={false}></SerieThumbnail>
                    })
                }
            </Tab.Pane>
        )
    }

    onSelectTab(genre)
    {
        api.loadSeriesByGenre(genre).then((response) => {
            const series = this.state.series;

            series[genre] = response.data;

            this.setState({
                series: series
            })
        })
    }

    render() {
        return (
            <div>
                <section id="intro" className="intro-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <h1><img src="images/logo.png" alt="logo" /></h1>
                                <p>Nunca mais esqueça uma série que você assistiu ou que alguém lhe indicou.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    {
                        <div>
                            <h5>Ver séries do gênero:</h5>

                            {this.state.genres.length > 0 &&
                                <Tab.Container id="list-group-tabs-example">
                                {/* defaultActiveKey={`#${this.state.genres[0]}`} */}
                                    <Row>
                                        <Col sm={4}>
                                            <ListGroup>
                                                {this.state.genres.map(this.renderListItem)}
                                            </ListGroup>
                                        </Col>
                                        <Col sm={8}>
                                            <Tab.Content>
                                                {this.state.genres.map(this.renderPaneContent)}
                                            </Tab.Content>
                                        </Col>
                                    </Row>
                                </Tab.Container>
                            }

                        </div>
                    }
                </section>
            </div>
        )
    }
}

export default Home;