import { combineReducers } from 'redux'

const loginReducer = require('./Loggedin')
const pageReducer = require('./Page')

const rootreducer = combineReducers({
    login: loginReducer,
     page: pageReducer})

export default rootreducer