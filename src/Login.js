import React, { useEffect, useRef, useState } from "react";
import Dialog from './Dialog'

const axios = require('axios')
const Url = require('./Url')

function Login(props){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')
    const [userError, setUserError] = useState('')
    const [show, setShow] = useState(false)

    let validatePassword = ()=>{
        if(password.length < 8){
            setPasswordError('Password is too short')
            return false
        }else{
            setPasswordError('')
        }
        if(confirmPassword !== password){
            setConfirmPasswordError('Confirm password has to be the same as password!')
            return false
        }else {
            setConfirmPasswordError('')

        }
        return true
    }

    let validateUser = ()=>{
        axios.get(Url() + 'user/validateUser/' + username).then((r)=>{
            if(r.data !== 'ok') setUserError(r.data)
            else setUserError('')
        })
       
    }

    let validaEmail = ()=>{
        if(!email.includes('@')){
            setEmailError('Enter a valid e-mail!')
            return false
        }else{
            setEmailError('')
        }
        return true
    }

    let validate = ()=>{
        return validatePassword() && validaEmail()
        
    }

    let register = ()=>{
        axios.post(Url() + 'user/register', {name: username, password: password}).then(response=>{
            if (response.data === 'ok'){
                setShow(true)
            }
            if(response.data === 'Username taken'){
                setUserError('Username taken!')
            }
        })
    }

    if(props.page === 1) return (<div className="loginContainer">
        <h1>Login</h1>
        <form>
        <div className="Input"><input required value={username} onChange={e=>{setUsername(e.target.value)}} type="text"></input>
        <div className="placeHolder">Username</div></div>

        <div className="Input"><input required type="password" value={password} onChange={e=>{setPassword(e.target.value)}}></input>
        <div className="placeHolder">Password</div></div>

        <p>Don't have an account?<a onClick={()=>{
            props.setPage(2)
        }}>Sign up!</a></p>
        <input className="loginButton" type="button" value="Login" onClick={()=>{
                axios.post(Url() + 'user/login', {
                    name: username,
                    password: password
                }).then(response=>{
                    if(response.data === 'Failed to login!'){
                        alert(response.data)
                    }
                    else if(response.data === 'User not found'){
                        alert(response.data)
                    }
                    else {
                        props.updateUsers(username)
                        props.login(username)
                        props.setSender(username)
                        window.sessionStorage.setItem('auth-token', response.data)
                    }

                })
        }
            
            }></input>
            </form>
    </div>)
    else if(props.page === 2) return (<div className="loginContainer">
    <h1>Register</h1>
    <form>
    <div className="Input"><input required type="text" value={username} onChange={e=>{setUsername(e.target.value)}}></input>
        <div className="placeHolder">Username</div>
        <div className="error">{userError}</div></div>

        <div className="Input"><input required type="text" value={email} onChange={e=>{setEmail(e.target.value)}}></input>
        <div className="placeHolder">e-mail</div>
        <div className="error">{emailError}</div></div>

        <div className="Input"><input required type="password" value={password} onChange={e=>{setPassword(e.target.value)}}></input>
        <div className="placeHolder">Password</div>
        <div className="error">{passwordError}</div></div>

        <div className="Input"><input required type="password" value={confirmPassword} onChange={e=>{setConfirmPassword(e.target.value)}}></input>
        <div className="placeHolder">Confirm password</div>
        <div className="error">{confirmPasswordError}</div></div>

    <p>Already have an account?<a onClick={()=>{
            props.setPage(1)
        }}>Log in!</a></p>
    

    <input className="loginButton" type="button" value="Register" onClick={
        //props.login
        ()=>{
            if(validate()){
                register()                
            }
            
        }
        
        }></input>
        </form>
        <Dialog show={show} setShow={setShow} message={"Registered succesfully!"}></Dialog>
</div>)
else return (<div></div>)
}

export default Login;