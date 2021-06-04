function Login(props){
    return (<div className="loginContainer">
        <h1>Login</h1>
        <input required className="loginInput" type="text"></input>
        <div className="placeHolder">Username</div>

        <input required className="passwordInput" type="text"></input>
        <div className="passwordplaceHolder">Password</div>

        <input className="loginButton" type="button" value="Login" onClick={
            props.login
            }></input>
    </div>)
}

export default Login;