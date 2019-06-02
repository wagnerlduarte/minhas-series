import React, { Component } from 'react';

import Rating from 'react-rating';
import { NavDropdown } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Api as api } from '../../../services';

import './bell-notification.css'

class BellNotification extends Component {

  constructor(props) {
    super(props)

    this.state = {
      notificationCounter: 0,
      notifications: [],
      updated: false
    }

    this.renderNotification = this.renderNotification.bind(this)
    this.changeRate = this.changeRate.bind(this)
    this.getNotifications = this.getNotifications.bind(this)
  }

  getNotifications() {
    api.getUnratedSeries().then((response) => {
      const notifications = response.data

      this.setState({
        notifications: notifications,
        notificationCounter: notifications.length
      })
    })
  }

  componentDidUpdate() {
    if (this.state.updated) {
      this.setState({ updated: false });
      this.getNotifications();
    }
  }

  componentDidMount() {
    this.getNotifications();
  }

  changeRate(rate, serie) {
    api.loadSeries(serie.id).then((response) => {
      let serieResponse = response.data;
      serieResponse.rate = rate;
      api.editSeries(serieResponse).then(() => {
        this.setState({ updated: true });
        toast.success('Avaliação salva com sucesso!', this.state.toastOptions)
      })
    })
  }

  renderNotification(serie) {
    return (
      <li>
        <div className="col-3"><div className="notify-img"><img src="http://placehold.it/45x45/000/fff" alt="" /></div></div>
        <div className="col-9 pd-l0">
          <span className="font-weight-bold">{serie.name}</span> ainda não possui avaliação.
          <a href="javascript:;" className="rIcon">
            <i className="far fa-dot-circle"></i>
          </a>
          <hr />
          <Rating
            initialRating={0}
            emptySymbol="far fa-heart fa-2x"
            placeholderSymbol="fas fa-heart text-danger fa-2x"
            fullSymbol="fas fa-heart text-danger fa-2x"
            fractions={2}
            onChange={(size) => this.changeRate(size, serie)}
          />
          {/* <p className="time">Şimdi</p> */}
        </div>
      </li>
    )
  }

  render() {
    return (
      <>
        <NavDropdown className="notify-drop" title={<i className="fas fa-bell"><span class="badge badge-danger">{this.state.notificationCounter}</span></i>} id="nav-dropdown">
          <div className="notify-drop-title">
            <div className="row">
              <div className="col-md-6 col-sm-6 col-xs-6">Notificações</div>
              <div className="col-md-6 col-sm-6 col-xs-6 text-right"><a href="javascript:;" className="rIcon allRead" data-tooltip="tooltip" data-placement="bottom" title="tümü okundu."><i className="far fa-dot-circle"></i></a></div>
            </div>
          </div>
          <div className="drop-content">
            {this.state.notifications.length &&
              this.state.notifications.map(this.renderNotification)}
          </div>
          <div className="notify-drop-footer text-center">
            <a href="javascript:;"><i className="fa fa-eye"></i> Visualizar tudo</a>
          </div>
        </NavDropdown>
      </>

    );
  }
}

export default BellNotification;