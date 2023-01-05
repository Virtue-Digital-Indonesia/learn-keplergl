/* eslint-disable no-unused-vars */
import React from 'react'
import theme from '../utils/theme'
import { injectComponents, CustomPanelsFactory, PanelToggleFactory, SidePanelFactory, PanelHeaderFactory, LoadDataModalFactory } from 'kepler.gl/components'
import CustomPanelToggleFactory from '../customFactory/CustomToggleFactory'
import CustomizePanelsFactory from '../customFactory/CustomizePanelsFactory'
import CustomSidePanelFactory from '../customFactory/CustomSidePanelFactory'
import CustomPanelHeaderFactory from '../customFactory/CustomPanelHeader'
import CustomLoadDataModalFactory from '../customFactory/CustomLoadDataModalFactory'

/**
 * learn more replace custom component https://docs.kepler.gl/docs/api-reference/advanced-usages/replace-ui-component
 */
// Inject custom component into Kepler.gl,
const KeplerGl = injectComponents([
  [LoadDataModalFactory, CustomLoadDataModalFactory],
  [SidePanelFactory, CustomSidePanelFactory],
  [PanelHeaderFactory, CustomPanelHeaderFactory],
  [CustomPanelsFactory, CustomizePanelsFactory],
  [PanelToggleFactory, CustomPanelToggleFactory],
])

const Home = () => {

  return (
    <>
      <KeplerGl
        id="foo"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
        width={window.innerWidth}
        height={window.innerHeight}
        theme={theme}
        appName='Logo'
        appWebsite='https://github.com'
        logoComponent={false}
      />
    </>
  )
}

export default Home