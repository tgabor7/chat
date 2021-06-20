let url = ()=>{
    if(process.env.NODE_ENV === 'development'){
        return 'http://localhost:4000/'
    }else{
        return 'https://test-756123.herokuapp.com/'
    }
}

module.exports = url