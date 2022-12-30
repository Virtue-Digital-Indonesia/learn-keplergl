import React from 'react'
import KeplerGl from 'kepler.gl'
import theme from '../utils/theme'
import CustomToolbar from '../components/CustomToolbar'

const Home = () => {
  return (
    <>
      <CustomToolbar />
      <KeplerGl
        id="foo"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
        width={window.innerWidth}
        height={window.innerHeight}
        theme={theme}
      />
    </>
  )
}

export default Home