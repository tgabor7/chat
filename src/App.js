import logo from './logo.svg';
import './App.css';
import {useState} from 'react'

const axios = require('axios')

function App() {

  var [message, setMessage] = useState('asd\nqwe\nasd')
  
  return ( <div className="App">
	{message} <br/>
	  <input type="text" onChange={e=>{setMessage(e.target.value)}}></input>
	  <input type="button" onClick={()=>{
		  axios.get('http://localhost:4000/chat/get', {
			header: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		  }).then(response=>{
			  alert(response.data)
		  }).catch(err=>{console.log(err)})
	  }} value="Send"></input>
   </div>);
}

export default App;
