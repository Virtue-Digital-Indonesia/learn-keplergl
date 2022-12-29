import React from 'react'
import KeplerGl from 'kepler.gl'
import theme from '../utils/theme'

const Home = () => {
  return (
    <KeplerGl
      id="foo"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
      width={window.innerWidth}
      height={window.innerHeight}
      theme={theme}
    />
  )
}

export default Home