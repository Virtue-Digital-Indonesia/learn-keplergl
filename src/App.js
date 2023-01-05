import React from 'react'
import { Provider } from 'react-redux'
import Home from './pages/Home'
import { store } from './redux/store'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { StyledEngineProvider } from '@mui/material'

function App() {
  return (
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <Home />
      </StyledEngineProvider>
      
    </Provider>
  )
}

export default App
