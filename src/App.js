import icon from './icon.svg';
import './App.css';
import React, {useState} from 'react'

const axios = require('axios')

function App() {

  var [messages, setMessages] = useState([{message: 'asd', sender: 0},{message: 'qwe', sender: 1}])
  var [message, setMessage] = useState('')

  const name = "Fuck face";
  let sendButton = React.createRef();
  let messageField = React.createRef();
  let container = React.createRef();
 
  const messages_render = messages.map(e=>{
	  return <div><div className={e.sender == 0 ? "message0" : "message1"}>{e.message} </div><br /><br /></div>
  })

  let updateMessages = (m)=>{
	let currentMessages = messages.slice();
	currentMessages.push({message: m, sender: 0})
	setMessages(currentMessages)
  }
  let validateMessage = (m)=>{
	  if(m.length < 1) return false
	  return true
  }

  updateMessages.bind(this)
  validateMessage.bind(this)

  return ( <div className="App">
	<div className="container" ref={container}>
	<div className="name">{name}</div>

	<div className="messageContainer">
	{messages_render}
	</div>
	
	</div>
	<br/>
	<div className="inputContainer">
	  <input type="text" class="messageField" ref={messageField} 
	 onFocus={e=>{
		 
	 }} 
	  onKeyPress={e=>{if(e.key === 'Enter') sendButton.current.click()}}  onChange={
		  e=>{
			  setMessage(e.target.value)
			}
		  }></input>
	  <input type="button" ref={sendButton} className="sendButton" onClick={e=>{
		  if(!validateMessage(message)) return
		  updateMessages(message)
		  messageField.current.value = '';
		  setMessage('')
		  let c = container.current
		  let scroll = c.offsetHeight

		  setTimeout(function(){
			c.scroll(0, scroll)
			scroll+=100
		  },100)
		  }} value="Send"></input></div>
   </div>);
}

export default App;
