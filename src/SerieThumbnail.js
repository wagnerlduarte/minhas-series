import React, { Component } from 'react';

import { Link } from 'react-router-dom';

const statuses = {
    watched: 'Assistido',
    watching: 'Assistindo',
    toWatch: 'Assistir'
}

class SerieThumbnail extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
                <div key={this.props.serie.id} className="item col-xs-4 col-lg-4">
                    <div className="img-thumbnail">
                        <img className="img-fluid group list-group-image" src="http://placehold.it/400x250/000/fff" alt="" />
                        <div className="caption">
                            <h4 className="group inner list-group-item-heading">
                                {this.props.serie.name}
                            </h4>
                            <div className="row">
                                <div className="col-xs-12 col-md-6">
                                    <p className="lead">
                                        {this.props.serie.genre} / {statuses[this.props.serie.status]}
                                    </p>
                                </div>
                                {this.props.showButtons &&
                                    <div className="col-xs-12 col-md-6">
                                        <Link className="btn btn-success" to={`/serie/${this.props.serie.id}`}>Editar</Link>
                                        <button type="button" className="btn btn-success" onClick={() => this.deleteSeries(this.props.serie.id)}>Excluir</button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default SerieThumbnail;