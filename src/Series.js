import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap'

import api from './Api';

import SerieThumbnail from './SerieThumbnail';

class Series extends Component {

    constructor(props) {
        super(props);

        this.state = {
            series: [],
            modalShow: false
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
            <>
                <SerieThumbnail serie={serie} showButtons={false} />
            </>
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

                    <div id="series" className="row">
                        {this.state.series.length > 0 &&
                            this.state.series.map((serie) => this.renderSeries(serie))}
                    </div>

                    {!this.state.series.length &&
                        <div className="alert alert-primary">Nenhuma série cadastrada</div>}
                </section>
                <Modal show={this.state.modalShow} onHide={modalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal title</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>Modal body text goes here.</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={modalClose}>Close</Button>
                        <Button variant="primary" onClick={modalClose}>Save changes</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default Series;