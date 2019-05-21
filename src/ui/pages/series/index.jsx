import React, { Component } from 'react';
import { Row } from 'react-bootstrap'

import { Api as api } from '../../../services';

import { SerieThumbnail } from '../../';

class Series extends Component {

    constructor(props) {
        super(props);

        this.state = {
            series: [],
            loadedSeries: false
        }

        this.loadData = this.loadData.bind(this)
        this.renderSeries = this.renderSeries.bind(this)
    }

    renderSeries(serie) {
        return (
            <SerieThumbnail key={serie.id} serie={serie} showButtons={true} loadData={this.loadData} />
        )
    }

    componentDidMount() {
        this.loadData()
    }

    loadData() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                api.loadSeriesByGenre(this.props.match.params.genre).then((response) => {
                    this.setState({
                        series: response.data,
                        loadedSeries: true
                    })
                    resolve()
                })

            }, 1500)
        })
    }

    render() {
        return (
            <>
                <section id="intro" className="intro-section">
                    <h1>Series {this.props.match.params.genre}</h1>
                    <Row>
                        {this.state.loadedSeries && this.state.series.length > 0 &&
                            this.state.series.map(this.renderSeries)}
                    </Row>
                    {this.state.loadedSeries && !this.state.series.length &&
                        <div className="alert alert-primary">Nenhuma série cadastrada</div>}
                </section>
            </>
        );
    }
}

export default Series;