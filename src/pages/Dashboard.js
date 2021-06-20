import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'

const axios = require('axios')

function Dashboard(props){

	const page = useSelector(state=>state.page)
	return ((props.page === 3) ? <div className="dashboardContainer">
		<p>Available users</p>
		{props.users}
		</div>: '')

}

export default Dashboard
