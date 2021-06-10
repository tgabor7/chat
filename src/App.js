import icon from './icon.svg';
import './App.css';
import React, {useEffect, useState} from 'react'
import Login from './Login'
import Dashboard from './Dashboard'
import Footer from './Footer'
import Header from './Header'

const axios = require('axios')

function App() {
  
  var [messages, setMessages] = useState([])
  var [message, setMessage] = useState('')
  var [page, setPage] = useState(1)
  const [sender, setSender] = useState('')
  const [receiver, setReceiver] = useState('')
  const [users, setUsers] = useState([])

  useEffect(()=>{
	  
	if(sender !== '' && receiver !== '')update()
	  
  })

  let updateMessages = (m)=>{
	let currentMessages = messages.slice();
	currentMessages.push({message: m, sender: 0})
	setMessages(currentMessages)
  }
   
  let sendMessage = (m)=>{
	  axios.post('http://localhost:4000/chat/post', {message: m, sender: sender, receiver: receiver}).then(()=>{

	  })
  }
  let update = ()=>{
	  getMessages(receiver, sender)
  }
  let getMessages = (e, s)=>{
	const url = 'http://localhost:4000/chat/get/' + e + '/' + s
	axios.get(url).then(response=>{
	let tmp = response.data.map(m=>{
			return {message: m.message, sender: m.sender === s ? 0 : 1}
		})
		setMessages(tmp)
	})
  }
  let updateUsers = (s)=>{
	axios.get('http://localhost:4000/user').then(response=>{
		let tmp = response.data.map(e=>{
			return <div className="userCard" key={e.name} onClick={()=>{
				setReceiver(e.name)
				setPage(0)
			}}>{e.name}</div>
		})
		setUsers(tmp)
	})
  }
  
	if(page !== 0) return (<div className="mainContainer"><Dashboard users={users} page={page} setPage={setPage} /><Header logout={()=>{
		setPage(0)

	}} sender={sender} setPage={setPage} /><Login page={page} updateUsers={updateUsers} setPage={setPage} sender={sender} setSender={setSender} login={(name)=>{
		setPage(3)
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
	  <Header logout={()=>{
		setSender('')
		setPage(0)
	}} sender={sender} setPage={setPage} />
	  <div className="mainContainer">
	<div className="container" ref={container}>
	
	
	<div className="messageContainer">
	{messages_render}
	</div>
	
	</div>
	<div className="innercontainer">
	  <input type="text" className="messageField" ref={messageField} 
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
		  alert(sender)
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