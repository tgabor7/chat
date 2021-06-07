import {useEffect, useState} from 'react'

const axios = require('axios')

function Dashboard(props){

	return (<div className="dashboardContainer">
		<p>Available users</p>
		{props.users}
		</div>)

}

export default Dashboard
