const loginReducer = (state = false, action)=>{
    switch(action.type){
        case 'Signin':
            return !state
        default:
            return state
    }
}

module.exports = loginReducer