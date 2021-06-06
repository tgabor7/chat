import { useState } from "react";

const axios = require('axios')

function Login(props){

    const [page, setPage] = useState(0)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')
    const [userError, setUserError] = useState('')

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
        axios.get('http://localhost:4000/user/validateUser/' + username).then((r)=>{
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

    if(page === 0) return (<div className="loginContainer">
        <h1>Login</h1>
        <div className="Input"><input required value={username} onChange={e=>{setUsername(e.target.value)}} type="text"></input>
        <div className="placeHolder">Username</div></div>

        <div className="Input"><input required type="password" value={password} onChange={e=>{setPassword(e.target.value)}}></input>
        <div className="placeHolder">Password</div></div>

        <p>Don't have an account?<a onClick={()=>{
            setPage(1)
        }}>Sign up!</a></p>
        <input className="loginButton" type="button" value="Login" onClick={
            props.login
            }></input>
    </div>)
    else return (<div className="loginContainer">
    <h1>Register</h1>
    
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
            setPage(0)
        }}>Log in!</a></p>

    <input className="loginButton" type="button" value="Register" onClick={
        //props.login
        ()=>{
            if(validate()){
                setPage(0)
            }
            
        }

        }></input>
</div>)
}

export default Login;