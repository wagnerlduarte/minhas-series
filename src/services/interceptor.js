import React from 'react';

import axios from 'axios';

import { connect } from 'react-redux';
import { loader } from '../actions';
import { bindActionCreators } from 'redux';


class Interceptor extends React.PureComponent {

    constructor(props) {
        super(props)

        this.setup = this.setup.bind(this)

        this.setup();
    }

    setup() {
        let count = 0;

        // Add a request interceptor
        axios.interceptors.request.use((config) => {
            // Do something before request is sent
            this.props.loader(true);
            count++;
            return config;
        })

        // Add a response interceptor
        axios.interceptors.response.use((response) => {
            // Do something with response data
            if ((--count) === 0)
                this.props.loader(false);


            return response;
        }, (error) => {
            // Do something with response error
            if (!(--count))
                this.props.loader(false);

            return Promise.reject(error);
        })
    }

    render() {
        return null;
    }
}

// const mapDispatchToProps = dispatch => ({
//     loader: (value) => dispatch(loader(value))
// });

const mapDispatchToProps = dispath =>
    bindActionCreators(
        {
            loader
        }, dispath
    )

export default connect(null, mapDispatchToProps)(Interceptor);