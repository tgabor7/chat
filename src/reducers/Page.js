const pageReducer = (state = 0, action)=>{
    switch(action.type){
        case 'Login':
            return 0
        case 'Dashboard':
            return 1
        case 'Main':
            return 2
        default:
            return 0
    }
}

module.exports = pageReducer