import React from 'react'

/**
 * custom toggle here
 */
const CustomPanelToggle = (...deps) => {
  return (
    <>
      {deps[0].panels.map(panelItem => (
        <button
          key={panelItem.id}
          onClick={() => deps[0].togglePanel(panelItem.id)}
        >
          {panelItem.label}
        </button>
      ))}
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