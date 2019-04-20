import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
            isLoading: false
        }

        this.loadData = this.loadData.bind(this)
        this.renderSeries = this.renderSeries.bind(this)
    }

    deleteSeries(id) {
        api.deleteSeries(id).then(() => {
            this.loadData()
        })
    }

    renderSeries(serie) {
        return (
            <div key={serie.id} className="item  col-xs-4 col-lg-4">
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
                                <Link className="btn btn-success" to={`/series/edit/${serie.id}`}>Editar</Link>
                                <a className="btn btn-success" onClick={() => this.deleteSeries(serie.id)}>Excluir</a>
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
        this.setState({ isLoading: true })
        setInterval(() => {
            api.loadSeriesByGenre(this.props.match.params.genre).then((response) => {
                this.setState({
                    isLoading: false,
                    series: response.data
                })
            })
        }, 1500)
    }

    render() {
        return (
            <section id="intro" className="intro-section">
                <h1>Series {this.props.match.params.genre}</h1>

                <div id="series" className="row list-group">
                    {
                        this.state.isLoading &&
                        <span>Aguarde, carregando...</span>
                    }
                    {!this.state.isLoading &&
                        this.state.series.map((serie) => this.renderSeries(serie))}
                    {!this.state.isLoading && !this.state.series.length &&
                        <div className="alert alert-info">Nenhuma série cadastrada</div>}
                </div>
            </section>
        );
    }
}

export default Series;