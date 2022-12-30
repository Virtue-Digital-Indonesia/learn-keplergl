/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import {toggleSplitMap, forwardTo} from 'kepler.gl/actions'
import {connect} from 'react-redux'

const MapContainer = ({ keplerGlDispatch }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <button onClick={() => keplerGlDispatch(toggleSplitMap())}>split map</button>
    </div>
  )
}

const mapDispatchToProps = (dispatch, props) => ({
  dispatch,
  keplerGlDispatch: forwardTo('foo', dispatch)
})
   
export default connect(
  state => state,
  mapDispatchToProps
)(MapContainer)