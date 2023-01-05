import React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

/**
 * custom toggle here
 */
const CustomPanelToggle = (...deps) => {
  const [currentSelected, setCurrentSelected] = React.useState(0)

  const handleTabChange = (event, newValue) => {
    setCurrentSelected(newValue)
  }

  return (
    <>
      <Tabs value={currentSelected} onChange={handleTabChange}>
        {deps[0].panels.map((panelItem, index) => (
          <Tab
            sx={{ color: 'white', fontSize: '10px', padding: '4px 12px', minWidth: '40px' }}
            key={panelItem.id}
            onClick={() => deps[0].togglePanel(panelItem.id)}
            label={panelItem.label}
            {...a11yProps(index)}
          />
        ))}
      </Tabs>
    </>
  )
}

const CustomPanelToggleFactory = () => CustomPanelToggle

export default CustomPanelToggleFactory

/**
 * deps structure
 * [
    {
        "panels": [
            {
                "id": "layer",
                "label": "sidebar.panels.layer",
                "onClick": null,
                component: props => jsx
            },
            {
                "id": "filter",
                "label": "sidebar.panels.filter",
                "onClick": null,
                component: props => jsx
            },
            {
                "id": "interaction",
                "label": "sidebar.panels.interaction",
                "onClick": null,
                component: props => jsx
            },
            {
                "id": "map",
                "label": "sidebar.panels.basemap",
                "onClick": null,
                component: props => jsx
            }
        ],
        "activePanel": "layer",
        "togglePanel": function
    },
    {}
]
 */