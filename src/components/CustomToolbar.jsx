/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import {toggleSplitMap, forwardTo, addDataToMap} from 'kepler.gl/actions'
import {connect} from 'react-redux'
import useSwr from 'swr'
import evidence from '../utils/evidence.json'

const MapContainer = ({ keplerGlDispatch }) => {
  const { data : dataCovid } = useSwr('covid', async () => {
    const response = await fetch(
      'https://gist.githubusercontent.com/leighhalliday/a994915d8050e90d413515e97babd3b3/raw/a3eaaadcc784168e3845a98931780bd60afb362f/covid19.json'
    )
    const data = await response.json()
    return data
  })

  return (
    <div style={{ marginBottom: '20px' }}>
      <button style={{ marginRight: '8px'}} onClick={() => keplerGlDispatch(toggleSplitMap())}>split map</button>
      
      <button style={{ marginRight: '8px'}} onClick={() => keplerGlDispatch(
        addDataToMap({
          datasets: {
            info: {
              label: 'COVID-19',
              id: 'covid19'
            },
            data: dataCovid
          },
          option: {
            centerMap: true,
            readOnly: false
          },
          config: {}
        })
      )}>
        add data covid
      </button>

      <button style={{ marginRight: '8px'}} onClick={() => keplerGlDispatch(
        addDataToMap({
          datasets: {
            info: {
              label: 'EVIDENCE',
              id: 'evidence'
            },
            data: evidence
          },
          option: {
            centerMap: true,
            readOnly: false
          },
          config: {}
        })
      )}>
        add data evidence
      </button>
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