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
import { Box, Button, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'

const LoadViaURL = () => {
  const dispatch = useDispatch()
  const [loadUrl, setLoadUrl] = useState()
  const [label, setLabel] = useState('')
  const [type, setType] = useState('geojson')
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = async (url) => {
    if(!url || !type || !label) return
    setIsLoading(true)
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
    setIsLoading(false)
    dispatch(addDataToMap(params))
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