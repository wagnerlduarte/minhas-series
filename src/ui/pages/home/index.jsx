import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Tab, Row, Col, ListGroup } from 'react-bootstrap'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clickButton } from '../../../actions';

import { Api as api } from '../../../services';
import { SerieThumbnail } from '../../';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            genres: [],
            series: {},
            selectedGenre: undefined
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
                <Row>
                    {this.state.series[genre] && this.state.series[genre].length > 0 &&
                        this.state.series[genre].map((serie, index) => {
                            return <SerieThumbnail key={index} serie={serie} showButtons={false}></SerieThumbnail>
                        })
                    }
                </Row>
                {
                    this.state.series[genre] && this.state.series[genre].length === 0 &&
                    <div className="alert alert-primary">Nenhuma série cadastrada</div>
                }
            </Tab.Pane>
        )
    }

    onSelectTab(genre) {
        const limitResult = 3

        this.setState({
            selectedGenre: genre
        })

        api.loadSeriesByGenre(genre, limitResult).then((response) => {
            const series = this.state.series;

            series[genre] = response.data;

            this.setState({
                series: series
            })
        })
    }

    state = {
        inputValue: ''
    }
    inputChange = event => {
        this.setState({
            inputValue: event.target.value
        })
    }

    render() {
        const {
            clickButton,
            newValue
        } = this.props;

        const { inputValue } = this.state;

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
                                                {this.state.selectedGenre &&
                                                    <Link className="float-right" to={`series/${this.state.selectedGenre}`}>Ver mais...</Link>
                                                }
                                            </Tab.Content>
                                        </Col>
                                    </Row>
                                </Tab.Container>
                            }

                            <input onChange={this.inputChange} value={inputValue} type='text' />
                            <button onClick={() => clickButton(inputValue)}>
                                Click me!
                            </button>
                            <h1>{newValue}</h1>

                        </div>
                    }
                </section>
            </div>
        )
    }
}

const mapStateToProps = store => ({
    newValue: store.clickState.newValue
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ clickButton }, dispatch);

// export default Home;
export default connect(mapStateToProps, mapDispatchToProps)(Home);