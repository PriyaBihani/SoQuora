import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
const firebase= require("firebase")
require("firebase/functions")

class ListUser extends Component{
    state={
        data: {users:null}
    }
    handleBlock=(data)=>{
        
        console.log(data)
        
        console.log("button Working")
        const functions = firebase.functions()
        const blockUser = functions.httpsCallable("blockUser")
        blockUser(data).then(res=>{
            console.log(res)
        })
    }
    handleUnblock=(data)=>{
        
        console.log(data)
        
        console.log("button Working")
        const functions = firebase.functions()
        const unblockUser = functions.httpsCallable("unblockUser")
        unblockUser(data).then(res=>{
            console.log(res)
        })
    }
    componentDidMount(){
        console.log("component mounted")
        const functions= firebase.functions()
        const getUserList= functions.httpsCallable("userList")
        getUserList().then(res=>{
            console.log(res)
            this.setState({
                ...res
            })
        })
    }
    render(){
        if(!this.props.auth.uid) return <Redirect to='/signin'/>
        const {users} = this.state.data
        console.log(users)
        const userList = users!=null ? (
            <div className="mt-5">
                <table className="table table-striped table-hover">
                    <thead>
                    <tr className="thead-dark">
                        <th> Email </th>
                        <th> Admin </th>
                        <th></th>
                    </tr>
                    </thead>
                    {
                    users.map(user=>{
                        return(
                            <tbody key={user.uid}>
                                <tr>
                                    <td>{user.email}</td>
                                    <td>
                                        {(user.customClaims!=null) ? 
                                        (  <div className="container">
                                            { user.customClaims.admin ===true? (
                                                    <div className="container">  Yes</div>
                                                ):(<div className="container"> NO</div>)
                                            }
                                            </div>
                                        ):( <div className="container">No </div>
                                        )}
                                    </td>
                                    <td>
                                        {
                                            (user.disabled != true)?(
                                                <div className="container">
                                                <button onClick={()=>this.handleBlock(user.uid)} className="btn btn-outline-danger">
                                                    Block
                                                </button>
                                                </div>
                                            ):(
                                                <div className="container">
                                                <button onClick={()=>this.handleUnblock(user.uid)} className="btn btn-outline-danger">
                                                    Unblock
                                                </button>
                                                </div>
                                            )
                                        }
                                       
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })
                    }
                </table>
            </div>
        ):(
            <div className="container m-5">
                Loading...
            </div>
        )
        return(
            <div className="container">
            {userList}
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    console.log(state)
    return{
        auth:state.firebase.auth
    }
}

export default connect(mapStateToProps)(ListUser)