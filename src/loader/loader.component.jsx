import React from 'react'

import './loader.css'

export const Loader = props => (
  <div className="loader loader-double is-active" />
)

export const SmallLoader = props => (
  <div
    style={{ width: props.width, height: props.height }}
    className="small-loader"
  />
)
