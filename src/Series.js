import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap'

import api from './Api';

const statuses = {
    watched: 'Assistido',
    watching: 'Assistindo',
    toWatch: 'Assistir'
}

class Series extends Component {

    constructor(props) {
        super(props);

        this.state = {
            series: [],
            modalShow: true,
            oi: 'tico'
        }

        this.loadData = this.loadData.bind(this)
        this.renderSeries = this.renderSeries.bind(this)
        this.deleteSeries = this.deleteSeries.bind(this)
    }

    deleteSeries(id) {

        this.setState({ modalShow: true })

        // api.deleteSeries(id).then(() => {
        //     this.loadData()
        // })
    }

    renderSeries(serie) {
        return (
            <div key={serie.id} className="item col-xs-4 col-lg-4">
                <div className="thumbnail">
                    <img className="group list-group-image" src="http://placehold.it/400x250/000/fff" alt="" />
                    <div className="caption">
                        <h4 className="group inner list-group-item-heading">
                            {serie.name}
                        </h4>
                        <div className="row">
                            <div className="col-xs-12 col-md-6">
                                <p className="lead">
                                    {serie.genre} / {statuses[serie.status]}
                                </p>
                            </div>
                            <div className="col-xs-12 col-md-6">
                                <Link className="btn btn-success" to={`/serie/${serie.id}`}>Editar</Link>
                                <button type="button" className="btn btn-success" onClick={() => this.deleteSeries(serie.id)}>Excluir</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.loadData()
    }

    loadData() {
        setTimeout(() => {
            api.loadSeriesByGenre(this.props.match.params.genre).then((response) => {
                this.setState({
                    series: response.data
                })
            })
        }, 1500)
    }


    render() {
        let modalClose = () => this.setState({ modalShow: false })

        return (
            <>
                <section id="intro" className="intro-section">
                    <h1>Series {this.props.match.params.genre}</h1>

                    <div id="series" className="row list-group">
                        {this.state.series.map((serie) => this.renderSeries(serie))}
                        {!this.state.series.length &&
                            <div className="alert alert-info">Nenhuma série cadastrada</div>}
                    </div>
                    teste: {this.state.oi}
                </section>
                <Modal show={this.state.modalShow} onHide={modalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal title</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>Modal body text goes here.</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.modalClose}>Close</Button>
                        <Button variant="primary" onClick={this.modalClose}>Save changes</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default Series;