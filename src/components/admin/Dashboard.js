import React from 'react'
import MakeAdmin from './MakeAdmin'
import {connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import ListUsers from './ListUsers'


const AdminDashboard = (props)=>{
    const {isAdmin,auth} = props
    if(!isAdmin) return <Redirect to='/'/>
    if(!auth.uid) return <Redirect to='/signin'/>
    return(
        <div className="container">
            <div className="text-center"><h2>Admin panel</h2></div>
            <div>
                <MakeAdmin />
            </div>
            <div>
            <ListUsers />
            </div>
        </div>
    )
}

const mapStateToProps = (state)=>{
    return{
        isAdmin: state.admin.isAdmin,
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(AdminDashboard)