import keplerGlReducer from 'kepler.gl/reducers'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {taskMiddleware} from 'react-palm/tasks'

const keplerReducer = keplerGlReducer.initialState({
  uiState: {
    //activeSidePanel: null, // hide side panel when first init/open app
    currentModal: null // dont show import data modal when first init/open app
  }
})

const reducer = combineReducers({
  keplerGl: keplerReducer,
})

// create store
export const store = createStore(reducer, {}, applyMiddleware(taskMiddleware))