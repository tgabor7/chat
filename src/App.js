import icon from './icon.svg';
import './App.css';
import React, {useEffect, useState} from 'react'
import Footer from './Footer'
import Header from './Header'
import { createStore, combineReducers } from 'redux'
import rootreducer from './reducers/reducers';
import { Provider } from 'react-redux';
import Main from './pages/Main'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

const store = createStore(rootreducer)

function App() {
  
  return (<Provider store={store}>
  <Header></Header>
  <Footer></Footer>
  <Dashboard></Dashboard>
  <Login></Login>
  <Main></Main>
  </Provider>
  )
}

export default App;