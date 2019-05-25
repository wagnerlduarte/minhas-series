import React, { Component } from 'react';

import { RootModal, modalTypes } from '../modal';

import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Rating from 'react-rating';

import { Api as api } from '../../../services';

const statuses = {
    watched: 'Assistido',
    watching: 'Assistindo',
    toWatch: 'Assistir'
}

class SerieThumbnail extends Component {

    constructor(props) {
        super(props)

        this.state = {
            modalShow: false,
            toastOptions: {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            },
            serie: {...this.props.serie}
        }

        this.modalClose = this.modalClose.bind(this)
        this.changeRate = this.changeRate.bind(this)
    }

    modalClose() {
        this.setState({ modalShow: false })
    }

    modalOpen(serieId) {
        this.setState({ modalShow: true, idSerieToDelete: serieId })
    }

    deleteSerie(id) {
        api.deleteSeries(id).then(() => {
            this.modalClose()
            toast.success('Série excluida com sucesso!', this.state.toastOptions)
            this.props.loadData()
        })
    }

    changeRate(rate){

        api.loadSeries(this.state.serie.id).then((response) => {
            let serie = response.data;
            serie.rate = rate;
            api.editSeries(serie).then(() => {
                this.setState({
                    serie: {...this.state.serie,
                        rate: rate
                    }
                })
                toast.success('Avaliação salva com sucesso!', this.state.toastOptions)
            })
        })
    }

    render() {
        return (
            <>
                <div key={this.state.serie.id} className="item col-xs-4 col-lg-4">
                    <div className="img-thumbnail">
                        <img className="img-fluid group list-group-image" src="http://placehold.it/400x250/000/fff" alt="" />
                        <div className="caption">
                            <Rating
                                initialRating={this.state.serie.rate}
                                emptySymbol="far fa-heart fa-2x"
                                placeholderSymbol="fas fa-heart fa-2x text-danger"
                                fullSymbol="fas fa-heart fa-2x text-danger"
                                fractions={2}
                                onChange={this.changeRate}
                            />
                            <h4 className="group inner list-group-item-heading">
                                {this.state.serie.name}
                            </h4>
                            <div className="row">
                                <div className="col-xs-12 col-md-6">
                                    <p className="lead">
                                        {statuses[this.state.serie.status]}
                                    </p>
                                </div>
                                {this.props.showButtons &&
                                    <div className="col-xs-12 col-md-6">
                                        <Link className="btn btn-success" to={`/serie/${this.state.serie.id}`}>Editar</Link>
                                        <button type="button" className="btn btn-success" onClick={() => this.modalOpen(this.state.serie.id)}>Excluir</button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <RootModal modalShow={this.state.modalShow}
                    modalClose={this.modalClose}
                    modalConfirm={() => { this.deleteSerie(this.state.idSerieToDelete) }}
                    message={'Você deseja realmente excluir esse item?'}
                    title={'Confirmação'}
                    modalType={modalTypes.delete} />
            </>
        );
    }
}

export default SerieThumbnail;