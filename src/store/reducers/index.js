import { combineReducers } from 'redux'
import fetchOnce from './fetchOnce'
import home from './home'
import user from './user'

export default combineReducers({
  fetchOnce,
  home,
  user,
})
