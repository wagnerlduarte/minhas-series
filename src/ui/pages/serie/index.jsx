import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import { connect } from 'react-redux';
import { loadNotifications } from '../../../actions';

import { Api as api } from '../../../services';

const statuses = {
    watched: 'Assistido',
    watching: 'Assistindo',
    toWatch: 'Assistir'
}

class Serie extends Component {
    constructor(props) {
        super(props);

        this.state = {
            genres: [],
            isEdit: !!this.props.match.params.id,
            redirect: false
        }
    }

    componentDidMount() {
        if (this.state.isEdit) {
            api.loadSeries(this.props.match.params.id).then((response) => {
                const serie = response.data;

                this.setState({
                    serie: serie
                })

                this.refs.name.value = serie.name;
                this.refs.genre.value = serie.genre;
                this.refs.status.value = serie.status;
                this.refs.comments.value = serie.comments;
            })
        }

        api.loadGenres().then((response) => {
            this.setState({
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

        const serie = {
            id: this.props.match.params.id,
            name: refs.name.value,
            status: refs.status.value,
            genre: refs.genre.value,
            comments: refs.comments.value
        }

        if (this.state.isEdit) {
            api.editSeries(serie)
                .then(() => {
                    this.setState({
                        redirect: `/series/${refs.genre.value}`
                    })
                });
        } else {
            api.saveSeries(serie)
                .then(() => {
                    this.props.loadNotifications();
                    this.setState({
                        redirect: `/series/${refs.genre.value}`
                    })
                });
        }
    }

    render() {
        return (
            < section className="intro-section" >
                {
                    this.state.redirect &&
                    <Redirect to={this.state.redirect} />
                }
                <h1> {this.state.isEdit ? 'Editar' : 'Nova'} série</h1>
                <form>
                    <div className="form-group">
                        <label>Nome:</label>
                        <input type="text" ref="name" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Status:</label>
                        <select ref="status" className="form-control">
                            {Object.keys(statuses).map(key => this.renderOption(key, statuses[key]))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Genero:</label>
                        <select ref="genre" className="form-control">
                            {this.state.genres.map(genre => this.renderOption(genre, genre))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Comentários:</label>
                        <textarea ref="comments" className="form-control" ></textarea>
                    </div>
                    <button type="button" className="btn btn-success" onClick={() => this.saveSeries()}>Salvar</button>
                </form>
            </section >
        );
    }
}

const mapDispatchToProps = dispatch => ({
    loadNotifications: () => dispatch(loadNotifications())
});

export default connect(null, mapDispatchToProps)(Serie);
// export default Serie;