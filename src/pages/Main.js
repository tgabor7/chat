import React,{useState, useEffect} from "react"
import { useSelector } from "react-redux"
import Footer from '../Footer'
import Header from '../Header'
import Dashboard from "./Dashboard"
import Login from "./Login"

const axios = require('axios')
const dotenv = require('dotenv')
const Url = require('../Url')

function Main(){
    var [messages, setMessages] = useState([])
    var [message, setMessage] = useState('')
    const [receiver, setReceiver] = useState('')
    const [users, setUsers] = useState([])
    const [time, setTime] = useState(0) 
    const [sender, setSender] = useState('')
  
    const page = useSelector(state=>state.page)
    
    let updateMessages = (m)=>{
      let currentMessages = messages.slice();
      currentMessages.push({message: m, sender: 0})
      setMessages(currentMessages)
    }
     
    let sendMessage = (m)=>{
        axios.post(Url() +'chat/post', {message: m, sender: sender, receiver: receiver}).then(()=>{
  
        })
    }
    let update = ()=>{
        getMessages(receiver, sender)
    }
    let getMessages = (e, s)=>{
      const url = Url() + 'chat/get/' + e + '/' + s
      const config = {
          headers: {
              'auth-token': window.sessionStorage.getItem('auth-token')
          }
      }
      axios.get(url, config).then(response=>{
      let tmp = response.data.map(m=>{
              return {message: m.message, sender: m.sender === s ? 0 : 1}
          })
          setMessages(tmp)
      })
    }
    let updateUsers = (s)=>{
      axios.get(Url() + 'user').then(response=>{
          let tmp = response.data.map(e=>{
              if(e.name === s) return
              return <div className="userCard" key={e.name} onClick={()=>{
                  setReceiver(e.name)
                  //setPage(0)
              }}><div className='profilepicture'><img src='../logo.svg'></img></div><div className='usercardtext'>{e.name}</div></div>
          })
          setUsers(tmp)
      })
    }
    
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
    
    return (<>{page === 2 ? <div className="App">
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
        setTimeout(function(){
          c.scroll(0, scroll)
          scroll+=100
        },100)
        }} value="Send"></input></div>
  <div className="nameContainer"><div className="name">{receiver}</div></div>
  </div>
 </div> : ''}
    
        </>);
}

export default Main