import React from 'react'
import {SidePanelFactory} from 'kepler.gl/components'

/**
 * reference
 * https://github.com/keplergl/kepler.gl/issues/1045
 */
function CustomSidePanelFactory(...args) {
  const CustomSidePanel = SidePanelFactory(...args)

  CustomSidePanel.defaultProps = {
    ...CustomSidePanel.defaultProps,
    panels: [
      {
        id: 'layer',
        label: 'sidebar.panels.layer',
        onClick: null,
        component: args[4]
      },
      {
        id: 'filter',
        label: 'sidebar.panels.filter',
        onClick: null,
        component: args[5]
      },
      {
        id: 'interaction',
        label: 'sidebar.panels.interaction',
        onClick: null,
        component: args[6]
      },
      {
        id: 'map',
        label: 'sidebar.panels.basemap',
        onClick: null,
        component: args[7]
      },
      {
        id: 'custom',
        label: 'custom toggle tab',
        onClick: null,
        component: () => <div style={{ color: 'white' }}>custom toggle content</div>
      }
    ]
  }

  return CustomSidePanel
}

CustomSidePanelFactory.deps = SidePanelFactory.deps

export default CustomSidePanelFactory