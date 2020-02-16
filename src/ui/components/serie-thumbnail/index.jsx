import React, { Component } from 'react';

import { RootModal, modalTypes } from '../modal';

import { Link, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Api as api } from '../../../services';
import Rating from 'react-rating';

import { connect } from 'react-redux';
import { loadNotifications } from '../../../actions';

import './style.css'

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
            serie: { ...this.props.serie }
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

    changeRate(rate) {
        api.loadSeries(this.state.serie.id).then((response) => {
            let serie = response.data;
            serie.rate = rate;
            api.editSeries(serie).then(() => {
                this.setState({
                    serie: {
                        ...this.state.serie,
                        rate: rate
                    }
                })
                this.props.loadNotifications();
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
                                <div className="col-xs-12 col-md-5">
                                    <p className="lead">
                                        {statuses[this.state.serie.status]}
                                    </p>
                                </div>
                                {this.props.showButtons &&
                                    <div className="col-xs-12 col-md-7">
                                        <button type="button" className="btn btn-primary" onClick={() => this.props.history.push(`/serie/${this.state.serie.id}`)}>Editar</button>
                                        <button type="button" style={{ marginLeft: '.5em' }} className="btn btn-danger" onClick={() => this.modalOpen(this.state.serie.id)}>Excluir</button>
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

const mapDispatchToProps = dispatch => ({
    loadNotifications: () => dispatch(loadNotifications())
});

export default connect(null, mapDispatchToProps)(withRouter(SerieThumbnail));