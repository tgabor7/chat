function Login(login){
    return (<div className="loginContainer">
        <h1>Login</h1>
        <input required className="loginInput" type="text"></input>
        <div className="placeHolder">Username</div>
        <input className="loginButton" type="button" value="Login" onClick={login}></input>
    </div>)
}

export default Login;