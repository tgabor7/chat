import React, { useState } from "react"

function Dialog(props) {

    if(props.show) return (<div>
        <div className="dialogContainer">
            <p>{props.message}</p>
        <input type="button" onClick={()=>{
            props.setShow(false)
        }} value="OK"></input></div>
    </div>)

    return (<div>

    </div>)
}

export default Dialog