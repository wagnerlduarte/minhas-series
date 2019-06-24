import React from 'react'

import './loader.css'

import { connect } from 'react-redux';
import { loader } from '../../../actions';

const Loader = (props) => {
  return (
    props.loading &&
    <div className="loader loader-double is-active" />
  )
}

const mapDispatchToProps = dispatch => ({
  loader: (value) => dispatch(loader(value))
});

const mapStateToProps = store => ({
  loading: store.loader.loading
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);

