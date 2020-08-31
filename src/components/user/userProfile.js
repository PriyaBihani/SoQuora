import React, { Component } from 'react'
import {connect } from 'react-redux'
// import moment from 'moment'
import {Link, Redirect} from 'react-router-dom'
import UserLogo from './userLogo'
const firebase= require("firebase")
require("firebase/functions")

class userProfile extends Component{
    render(){
        const {credentials,auth}=this.props
        if(!auth.uid) return <Redirect to='/signin'/>
        const handleDelete =()=>{
            const functions = firebase.functions()
            const deleteUser = functions.httpsCallable("deleteUser")
            deleteUser(auth.uid).then(res=>{
                console.log(res)
                if(res.data.deleted ===true) return <Redirect to='/signup' />
            })
        }
        
        return(
           
            <div className="container">
                {/* <div className="m-3">
                    Last Login At {moment(auth.lastLoginAt.getMinutes.calendar()}
                </div> */}
                <UserLogo initials={credentials.initials} />
                
                <div className="details mt-5 float-right">
                <div >
                    <strong>First Name : </strong>{credentials.firstName}
                </div>
                <div>
                    <strong>Last Name :</strong> {credentials.lastName}
                </div>
                <div>
                    <strong>Email :</strong> {auth.email}
                    <div className="text-muted float-right ml-1">
                        You can't change your email
                    </div>
                </div>
                <div className="mt-2">
                    {/* <strong> Phone Number : </strong>  */}
                    {/* <button className="btn btn-outline-danger btn-sm">ADD</button> */}
                </div>
                <div>
                    <Link to='/updateUser' className="btn mt-5 btn-outline-danger btn-lg btn-block">Edit</Link>
                </div>
                </div>
                <div className="clearfix"></div>
                <div >
                    <Link to='#' onClick={handleDelete} className="btn m-3 mt-5  btn-outline-danger btn-lg btn-block">Delete Account</Link>
                </div>
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    console.log(state)
    return{
        credentials:state.firebase.profile,
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(userProfile)