import React from 'react';
import PropTypes from 'prop-types';

import { Auth as auth } from '../../../services';

class ConnectProvider extends React.Component {
  componentDidMount() {
    const {
      match: { params: { provider } },
      location: { search },
    } = this.props;

    auth.callbackProvider(provider, search)
      .then(() => {
        this.redirectUser('/');
      });
  }

  redirectUser = path => {
    this.props.history.push(path);
  };

  render() {
    return (
      <div>
        <h1>Retrieving your token and checking its validity</h1>
      </div>
    );
  }
}

ConnectProvider.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default ConnectProvider;
