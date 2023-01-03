import React from 'react'

/**
 * add more panels 
 * https://github.com/keplergl/kepler.gl/blob/master/src/components/src/side-panel/custom-panel.tsx
 */
const CustomPanels = () => {
  return (
    <>
      <div style={{ marginTop: '20px' }}>
        <button>create a custom bottom panel here</button>
      </div>
    </>
  )
}


const CustomizePanelsFactory = () => CustomPanels

export default CustomizePanelsFactory