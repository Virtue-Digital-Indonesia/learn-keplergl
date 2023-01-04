/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { LoadDataModalFactory } from 'kepler.gl/components'
import { LOADING_METHODS } from 'kepler.gl/dist/constants/default-settings'
import { useDispatch } from 'react-redux'
import { addDataToMap } from 'kepler.gl/dist/actions/actions'
import exDataEvidence from '../utils/exDataEvidence'
import sampleTripData from '../utils/sampleTripData'
import sampleGpsData from '../utils/sampleGpsData'
import { getProcessor } from '../utils'
import sampleIconCsv, { config as configIconCsv } from '../utils/sampleIconCsv'
import sampleS2csv, { config as configS2csv } from '../utils/sampleS2csv'
import sampleSmallGeojson from '../utils/sampleSmallGeojson'

const LoadViaURL = () => {
  const dispatch = useDispatch()
  const [loadUrl, setLoadUrl] = useState()
  const [label, setLabel] = useState('')
  const [type, setType] = useState('geojson')

  const fetchData = async (url) => {
    if(!url || !type || !label) return
    let controller = new AbortController()
    const response = await fetch(url, {
      method: 'GET',
      signal: controller.signal
    })

    const result = type === 'csv' ? await response.text() : await response.json()

    const params = {
      datasets: {
        info: {
          label,
          id: label,
        },
        data: getProcessor(type || 'geojson', result),
      }
    }
    dispatch(addDataToMap(params))
    controller.abort()
  }

  return(
    <div>
      <div style={{ marginBottom: '8px' }}>
        <input type='text' placeholder='label' onChange={(event) => setLabel(event.target.value)} />
      </div>

      <div style={{ marginBottom: '8px' }}>
        <input type='text' placeholder='https://url' onChange={(event) => setLoadUrl(event.target.value)} />
      </div>

      <div style={{ marginBottom: '8px' }}>
        <select onChange={event => setType(event.target.value)}>
          <option value='geojson'>geojson</option>
          <option value='csv'>csv</option>
          <option value='row'>row</option>
        </select>
      </div>

      <button onClick={() => fetchData(loadUrl)}>load</button>
    </div>
  )
}

const LoadViaSampleData = () => {
  const dispatch = useDispatch()

  const handleOnClick = (label, id, inputData, type, config) => {
    const params = {
      datasets: {
        info: {
          label,
          id,
        },
        data: type ? getProcessor(type, inputData) : inputData,
        config: config ? config : {}
      }
    }
    dispatch(addDataToMap(params))
  }

  return(
    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', flexWrap: 'wrap' }}>
      <div style={{ padding: '8px', width: '25%' }}>
        <h3>Example point evidence</h3>
        <button onClick={() => handleOnClick('evidence', 'evidence', exDataEvidence, null)}>try sample</button>
      </div>

      <div style={{ padding: '8px', width: '25%' }}>
        <h3>Sample trip data</h3>
        <button onClick={() => handleOnClick('tripdata', 'tripdata', sampleTripData, 'geojson')}>try sample</button>
      </div>

      <div style={{ padding: '8px', width: '25%' }}>
        <h3>Sample gps data</h3>
        <button onClick={() => handleOnClick('gps', 'gps', sampleGpsData, 'csv')}>try sample</button>
      </div>

      <div style={{ padding: '8px', width: '25%' }}>
        <h3>Sample icon csv data</h3>
        <button onClick={() => handleOnClick('iconcsv', 'iconcsv', sampleIconCsv, 'csv', configIconCsv)}>try sample</button>
      </div>

      <div style={{ padding: '8px', width: '25%' }}>
        <h3>Sample s2 data</h3>
        <button onClick={() => handleOnClick('s2csv', 's2csv', sampleS2csv, 'csv', configS2csv)}>try sample</button>
      </div>

      <div style={{ padding: '8px', width: '25%' }}>
        <h3>Sample small geojson data</h3>
        <button onClick={() => handleOnClick('smallgeo', 'smallgeo', sampleSmallGeojson, 'geojson')}>try sample</button>
      </div>
    </div>
  )
}

const CustomLoadDataModalFactory = (...deps) => {
  const LoadDataModal = LoadDataModalFactory(...deps)
  
  LoadDataModal.defaultProps = {
    ...LoadDataModal.defaultProps,
    loadingMethods: [
      {
        id: LOADING_METHODS.upload,
        label: 'modal.loadData.upload',
        elementType: deps[1]
      },
      {
        id: 'viaurl',
        label: 'Via Url',
        elementType: () => <LoadViaURL /> // props available
      },
      {
        id: 'sampledata',
        label: 'Sample Data',
        elementType: () => <LoadViaSampleData /> // props available
      }
    ]
  }

  return LoadDataModal
}

CustomLoadDataModalFactory.deps = LoadDataModalFactory.deps

export default CustomLoadDataModalFactory