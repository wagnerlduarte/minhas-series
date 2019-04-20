import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import api from './Api';

const statuses = {
    watched: 'Assistido',
    watching: 'Assistindo',
    toWatch: 'Assistir'
}

class NewSeries extends Component {

    constructor(props) {
        super(props);

        this.state = {
            genres: [],
            isLoading: false,
            redirect: false
        }
    }

    componentDidMount() {
        this.setState({ isLoading: true })

        api.loadGenres().then((response) => {
            this.setState({
                isLoading: false,
                genres: response.data
            })
        })
    }

    renderOption(value, description) {
        return (
            <option key={value} value={value}>{description}</option>
        )
    }

    saveSeries() {
        const refs = this.refs;

        const newSerie = {
            name: refs.name.value,
            status: refs.status.value,
            genre: refs.genre.value,
            comments: refs.comments.value
        }

        api.saveSeries(newSerie)
            .then((response) => {
                this.setState({
                    redirect: `/series/${refs.genre.value}`
                })
            });
    }

    render() {
        return (

            < section className="intro-section" >
                {
                    this.state.redirect &&
                    <Redirect to={this.state.redirect} />
                }
                <h1>Nova série</h1>
                <form>
                    Nome: <input type="text" ref="name" className="form-control" /><br />
                    Status:
                    <select ref="status">
                        {Object.keys(statuses).map(key => this.renderOption(key, statuses[key]))}
                    </select><br />
                    Genero:
                    <select ref="genre">
                        {this.state.genres.map(genre => this.renderOption(genre, genre))}
                    </select><br />
                    Comentários: <textarea ref="comments" className="form-control" ></textarea><br />
                    <button type="button" onClick={() => this.saveSeries()}>Salvar</button>
                </form>
            </section >
        );
    }
}

export default NewSeries;