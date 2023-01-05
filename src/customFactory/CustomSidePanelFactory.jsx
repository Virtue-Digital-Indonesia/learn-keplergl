import React from 'react'
import {SidePanelFactory} from 'kepler.gl/components'
import CustomToolbar from '../components/CustomToolbar'

/**
 * reference
 * https://github.com/keplergl/kepler.gl/issues/1045
 */
function CustomSidePanelFactory(...deps) {
  const CustomSidePanel = SidePanelFactory(...deps)

  CustomSidePanel.defaultProps = {
    ...CustomSidePanel.defaultProps,
    panels: [
      {
        id: 'layer',
        label: 'sidebar.panels.layer',
        onClick: null,
        component: deps[4]
      },
      {
        id: 'filter',
        label: 'sidebar.panels.filter',
        onClick: null,
        component: deps[5]
      },
      {
        id: 'interaction',
        label: 'sidebar.panels.interaction',
        onClick: null,
        component: deps[6]
      },
      {
        id: 'map',
        label: 'sidebar.panels.basemap',
        onClick: null,
        component: deps[7],
      },
      {
        id: 'custom',
        label: 'custom',
        onClick: null,
        component: () => <CustomToolbar />
      }
    ]
  }

  return CustomSidePanel
}

CustomSidePanelFactory.deps = SidePanelFactory.deps

export default CustomSidePanelFactory