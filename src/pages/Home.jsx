import React from 'react'
import theme from '../utils/theme'
import CustomToolbar from '../components/CustomToolbar'
import { injectComponents, PanelHeaderFactory } from 'kepler.gl/dist/components'


const CustomPanelHeader = () => (<div style={{ color: 'white', padding: '10px' }}>Custom Header</div>)
const CustomPanelHeaderFactory = () => CustomPanelHeader

// Inject custom component into Kepler.gl,
const KeplerGl = injectComponents([
  [PanelHeaderFactory, CustomPanelHeaderFactory]
])

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