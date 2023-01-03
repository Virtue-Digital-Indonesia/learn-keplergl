import React, { useState } from 'react'
import { LoadDataModalFactory } from 'kepler.gl/components'
import { LOADING_METHODS } from 'kepler.gl/dist/constants/default-settings'
import { useDispatch } from 'react-redux'
import { addDataToMap } from 'kepler.gl/dist/actions/actions'
import evidence from '../utils/evidence.json'

const LoadViaURL = () => {
  const dispatch = useDispatch()
  const [loadUrl, setLoadUrl] = useState()

  const fetchData = async (url) => {
    if(!url) return
    const response = await fetch(url, {
      method: 'GET'
    })
    const result = await response.json()

    dispatch(addDataToMap({
      datasets: {
        info: {
          label: 'COVID-19',
          id: 'covid19'
        },
        data: result
      },
      option: {
        centerMap: true,
        readOnly: false
      },
      config: {}
    }))
  }
  return(
    <div>
      <input type='text' placeholder='https://url' onChange={(event) => setLoadUrl(event.target.value)}/>
      <button onClick={() => fetchData(loadUrl)}>load</button>
    </div>
  )
}

const LoadViaDB = () => {
  const dispatch = useDispatch()
  
  return(
    <div>
      <button onClick={() => dispatch(addDataToMap({
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
      }))}>add evidence</button>
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
        id: 'viadb',
        label: 'Via Database',
        elementType: () => <LoadViaDB /> // props available
      }
    ]
  }

  return LoadDataModal
}

CustomLoadDataModalFactory.deps = LoadDataModalFactory.deps

export default CustomLoadDataModalFactory