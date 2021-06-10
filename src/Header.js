import { useEffect } from "react"

function Header(props) {

 
    if(props.sender === '') return(<div className="header"> Chat app {props.sender}<input style={{'float':'right'}} type="button" value="login" onClick={()=>{
        props.setPage(1)
    }}></input></div>)
    return (<div className="header"> Chat app  <div>Logged in as <div className="username">{props.sender}</div><input type="button" value="logout" onClick={()=>{
        props.logout()
        props.setPage(1)
    }}></input></div></div>)
}

export default Header