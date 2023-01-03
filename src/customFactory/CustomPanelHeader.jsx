import React from 'react'
import {PanelHeaderFactory} from 'kepler.gl/components'

function CustomPanelHeaderFactory(...args) {
  const PanelHeader = PanelHeaderFactory(...args)

  PanelHeader.defaultProps = {
    ...PanelHeader.defaultProps,
    logoComponent: props => <a href={props.appWebsite}>{props.appName}</a>, // get appName and appWebsite from prop
  }

  return PanelHeader
}

CustomPanelHeaderFactory.deps = PanelHeaderFactory.deps

export default CustomPanelHeaderFactory