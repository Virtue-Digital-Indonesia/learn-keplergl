/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react'
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
import { Box, Button, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import JSZip from 'jszip'

const BottomAction = ({ onClickAdd }) => {
  return(
    <Stack sx={{ marginTop: '20px'}}>
      <Button onClick={onClickAdd} variant='contained'>Add Data</Button>
    </Stack>
  )
}

const LoadFileDrop = () => {
  const dispatch = useDispatch()
  const [dragActive, setDragActive] = useState()
  const [datasets, setDatasets] = useState([])
  const inputRef = useRef(null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const convertToRealData = (label, id, type, resultInText) => {
    return {
      info: { id, label, },
      data: getProcessor(type, (type === 'geojson' || type === 'json') ? JSON.parse(resultInText) : resultInText)
    }
  }

  const handleDrop = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const zip = new JSZip()
      const file = e.dataTransfer.files[e.dataTransfer.files.length-1]
      const getType = file?.type?.split('/')[1] || file.name.split('.')[1]

      if (getType === 'zip') {
        zip.loadAsync(file)
          .then(async zipFiles => {
            let result = []
            for(let key of Object.keys(zipFiles.files)) {
              result.push({
                name: zipFiles.files[key].name,
                text: await zipFiles.files[key].async('text')
              })
            }

            return result
          })
          .then(result => {
            let temp = result.map(item => convertToRealData(
              item.name,
              item.name,
              item.name.split('.')[1],
              item.text
            ))
            setDatasets([...datasets, ...temp])
          })
      } else {
        const resultInText = await file.text()
        setDatasets([
          ...datasets,
          convertToRealData(file.name, file.name, getType, resultInText)
        ])
      }
    }
  }

  const handleInputChange = async (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[e.target.files.length-1]
      const result = await file.text()
      const getType = file?.type?.split('/')[1] || file.name.split('.')[1]
      
      const params = {
        info: {
          id: file.name,
          label: file.name
        },
        data: getProcessor(getType, (getType === 'geojson' || getType === 'json') ? JSON.parse(result) : result)
      }
      setDatasets([...datasets, params])
    }
  }

  return(
    <Stack>
      <Typography sx={{
        marginBottom: '12px',
      }}>Add one or more files to the map. Supported formats include CSV, JSON, and GeoJSON. Those format can be packaged in zip format.</Typography>
      
      <Box onDragEnter={handleDrag} component='form' sx={{
        width: '100%',
        height: '200px',
        textAlign: 'center',
        position: 'relative',
      }} onSubmit={e => e.preventDefault()}>
        <input ref={inputRef} onChange={(e) => handleInputChange(e)} type='file' id='input-file-upload' multiple={true} style={{ display: 'none' }} />
        <label id='label-file-upload' htmlFor='input-file-upload' style={{
          height: '100%',
          display: 'flex',
          border: '1px dashed #DB9CFF',
          padding: '16px',
          borderRadius: '8px',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: dragActive ? '#F9EDFF' : 'white'
        }}>
          {dragActive && (
            <Box sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: '8px',
              top: '0px',
              right: '0px',
              bottom: '0px',
              left: '0px',
            }} id='drag-file-element' onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={e => handleDrop(e)}></Box>
          )}
          <Box>
            <Typography>Drag and drop your file here or</Typography>
            <Button onClick={() => inputRef.current.click()} className='upload-button'>Browser</Button>
          </Box> 
        </label>
      </Box>

      <Stack direction='row' flexWrap='wrap' marginTop='20px'>
        {datasets.map(item => (
          <Box key={item.id} sx={{
            width: '33.33%',
            paddingBottom: '12px',
            padding: '4px'
          }}>
            <Box sx={{
              border: '1px dashed #DB9CFF',
              padding: '16px',
              borderRadius: '8px',
            }}>
              <Typography noWrap>{item.info.label}</Typography>
            </Box>
          </Box>
        ))}
      </Stack>

      <BottomAction
        onClickAdd={() => dispatch(addDataToMap({
          datasets,
        }))}
      />
    </Stack>
  )
}

const LoadViaURL = () => {
  const dispatch = useDispatch()
  const [loadUrl, setLoadUrl] = useState()
  const [label, setLabel] = useState('')
  const [type, setType] = useState('geojson')
  const [isLoading, setIsLoading] = useState(false)
  const [datasets, setDatasets] = useState([])

  const fetchData = async (url) => {
    if(!url || !type || !label) return
    setIsLoading(true)
    let controller = new AbortController()
    const response = await fetch(url, {
      method: 'GET',
      signal: controller.signal
    })

    const result = type === 'csv' ? await response.text() : await response.json()

    setIsLoading(false)
    setDatasets([...datasets, {
      info: {
        label, id: label,
      },
      data: getProcessor(type || 'geojson', result),
    }])
    setLoadUrl('')
    setLabel('')
    controller.abort()
  }

  return(
    <Box>
      <Box sx={{ marginBottom: '12px' }}>
        <TextField
          label='label'
          size='small'
          sx={{
            '& input': {
              height: '100%'
            }
          }}
          onChange={(event) => setLabel(event.target.value)}
          fullWidth
          value={label}
        />
      </Box>

      <Box sx={{ marginBottom: '12px' }}>
        <TextField
          label='URL'
          size='small'
          sx={{
            '& input': {
              height: '100%'
            }
          }}
          onChange={(event) => setLoadUrl(event.target.value)}
          fullWidth
          value={loadUrl}
        />
      </Box>

      <Box sx={{ marginBottom: '12px' }}>
        <Select fullWidth value={type} size='small' onChange={event => setType(event.target.value)}>
          <MenuItem value='geojson'>geojson</MenuItem>
          <MenuItem value='csv'>csv</MenuItem>
          <MenuItem value='row'>row</MenuItem>
        </Select>
      </Box>

      <Button
        variant='contained'
        onClick={() => fetchData(loadUrl)}
      >
        {isLoading ? 'loading...' : 'load URL'}
      </Button>

      <Stack direction='row' flexWrap='wrap' marginTop='20px'>
        {datasets.map(item => (
          <Box key={item.id} sx={{
            width: '33.33%',
            paddingBottom: '12px',
            padding: '4px'
          }}>
            <Box sx={{
              border: '1px dashed #DB9CFF',
              padding: '16px',
              borderRadius: '8px',
            }}>
              <Typography noWrap>{item.info.label}</Typography>
            </Box>
          </Box>
        ))}
      </Stack>

      <BottomAction
        onClickAdd={() => dispatch(addDataToMap({
          datasets,
        }))}
      />
    </Box>
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
    <Stack direction='row' flexWrap='wrap'>
      <Box sx={{ padding: '8px', width: '25%' }}>
        <Typography sx={{ marginBottom: '8px' }}>Example point evidence</Typography>
        <Button variant='contained' size='small' onClick={() => handleOnClick('evidence', 'evidence', exDataEvidence, null)}>
          try sample
        </Button>
      </Box>

      <Box sx={{ padding: '8px', width: '25%' }}>
        <Typography sx={{ marginBottom: '8px' }}>Sample trip data</Typography>
        <Button variant='contained' size='small' onClick={() => handleOnClick('tripdata', 'tripdata', sampleTripData, 'geojson')}>try sample</Button>
      </Box>

      <Box sx={{ padding: '8px', width: '25%' }}>
        <Typography sx={{ marginBottom: '8px' }}>Sample gps data</Typography>
        <Button variant='contained' size='small' onClick={() => handleOnClick('gps', 'gps', sampleGpsData, 'csv')}>try sample</Button>
      </Box>

      <Box sx={{ padding: '8px', width: '25%' }}>
        <Typography sx={{ marginBottom: '8px' }}>Sample icon csv data</Typography>
        <Button variant='contained' size='small' onClick={() => handleOnClick('iconcsv', 'iconcsv', sampleIconCsv, 'csv', configIconCsv)}>try sample</Button>
      </Box>

      <Box sx={{ padding: '8px', width: '25%' }}>
        <Typography sx={{ marginBottom: '8px' }}>Sample s2 data</Typography>
        <Button variant='contained' size='small' onClick={() => handleOnClick('s2csv', 's2csv', sampleS2csv, 'csv', configS2csv)}>try sample</Button>
      </Box>

      <Box sx={{ padding: '8px', width: '25%' }}>
        <Typography sx={{ marginBottom: '8px' }}>Sample small geojson data</Typography>
        <Button variant='contained' size='small' onClick={() => handleOnClick('smallgeo', 'smallgeo', sampleSmallGeojson, 'geojson')}>try sample</Button>
      </Box>
    </Stack>
  )
}

const CustomLoadDataModalFactory = (...deps) => {
  const LoadDataModal = LoadDataModalFactory(...deps)
  
  LoadDataModal.defaultProps = {
    ...LoadDataModal.defaultProps,
    loadingMethods: [
      {
        id: LOADING_METHODS.upload,
        label: 'Upload File',
        elementType: props => <LoadFileDrop {...props} /> // deps[1]
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