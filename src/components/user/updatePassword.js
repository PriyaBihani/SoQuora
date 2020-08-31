import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Redirect } from 'react-router-dom'
import {UpdateUserPassword} from '../../store/actions/authActions'

class updatePassword extends Component {
    state={}
    handleSubmit=e=>{
        e.preventDefault()
        this.props.updatePassword(this.state)
        this.props.history.push("/userProfile");
    }
    handleChange=e=>{
        this.setState({
            [e.target.id] : e.target.value
        })
    }
    render(){
        const {authError,auth}= this.props
        if(!auth.uid) return <Redirect to='/'/>
        return(
            <div className="container">
               <h2 className="text-center m-5"> Update Password</h2>
               <form onSubmit={this.handleSubmit}>
               <div className="form-group">
                   <label htmlFor="currentPassword">
                   Current Password
                   </label>
                   <input className="form-control" onChange={this.handleChange} type="Password" id="currentPassword" />
                   </div>
                   <div className="form-group">
                   <label htmlFor="newPassword">
                       New Password
                   </label>
                   <input className="form-control" onChange={this.handleChange} type="Password" id="newPassword" />
                   </div>
                   <div className="float-right">
                   <button className="btn btn-outline-danger">
                       Change Password
                   </button>
                   </div>
                   <div className="text-danger text-center text-uppercase">
                        {authError ? <p>{authError}</p>:null}
                    </div>
               </form>
            </div>
        )
    }
}

const mapStateToProps = state=>{
    return{
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        updatePassword: data => dispatch(UpdateUserPassword(data))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(updatePassword)