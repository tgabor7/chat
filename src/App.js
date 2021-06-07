import icon from './icon.svg';
import './App.css';
import React, {useEffect, useState} from 'react'
import Login from './Login'
import Dashboard from './Dashboard'
import Footer from './Footer'

const axios = require('axios')

function App() {
  
  var [messages, setMessages] = useState([])
  var [message, setMessage] = useState('')
  var [page, setPage] = useState(2)
  const [sender, setSender] = useState('usertest1')
  const [receiver, setReceiver] = useState('usertest2')
  const [users, setUsers] = useState([])

  let updateMessages = (m)=>{
	let currentMessages = messages.slice();
	currentMessages.push({message: m, sender: 0})
	setMessages(currentMessages)
  }
   
  let sendMessage = (m)=>{
	  axios.post('http://localhost:4000/chat/post', {message: m, sender: sender, receiver: receiver}).then(()=>{

	  })
  }

  let updateUsers = ()=>{
	axios.get('http://localhost:4000/user').then(response=>{
		let tmp = response.data.map(e=>{
			return <div className="userCard" onClick={()=>{
				setReceiver(e.name)
				setPage(1)
				getMessages(e.name)
				alert(e.name)
				alert(sender)
			}}>{e.name}</div>
		})
		setUsers(tmp)
	})
  }
  let getMessages = (e)=>{
	axios.get('http://localhost:4000/chat/get/' + sender + '/' + e).then(response=>{
		let tmp = response.data.map(e=>{
			return {message: e.message, sender: e.sender === sender ? 0 : 1}
		})
		setMessages(tmp)
	})
  }
  
  useEffect(()=>{
	
	updateUsers()
  }, [])

 
	if(page === 2) return (<div className='mainContainer'><div className="header"> Chat app<p>Logged in as {sender}</p></div><Dashboard users={users} /><Footer /></div>)

	if(page === 0) return (<div className="mainContainer"><div className="header"> Chat app<p>Logged in as {sender}</p></div><Login login={()=>{
		updateUsers()
		setPage(2)
	}}/><Footer /></div>)

  
  let sendButton = React.createRef();
  let messageField = React.createRef();
  let container = React.createRef();
 
  const messages_render = messages.map(e=>{
	  return <div><div className={e.sender == 0 ? "message0" : "message1"}>{e.message} </div><br /><br /></div>
  })

  let validateMessage = (m)=>{
	  if(m.length < 1) return false
	  return true
  }
  
  return ( <div className="App">
	  <div className="header"> Chat app  <p>Logged in as <h1>{sender}</h1></p><input type="button" value="logout" onClick={()=>{
		  setPage(0)
	  }}></input></div>
	  <div className="mainContainer">
	<div className="container" ref={container}>
	
	
	<div className="messageContainer">
	{messages_render}
	</div>
	
	</div>
	<div className="innercontainer">
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
		  sendMessage(message)
		  setTimeout(function(){
			c.scroll(0, scroll)
			scroll+=100
		  },100)
		  }} value="Send"></input></div>
	<div className="name">{receiver}</div>
	</div>
	<Footer />
   </div>);
}

export default App;
