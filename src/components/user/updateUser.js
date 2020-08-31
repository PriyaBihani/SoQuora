import React,{Component} from 'react'
import {connect} from 'react-redux'
import {updUser} from '../../store/actions/authActions'
import UserLogo from './userLogo'
import {Link,Redirect} from 'react-router-dom'

class UpdateUser extends Component{
    state={}
    handleChange=e=>{
        this.setState({
            [e.target.id] : e.target.value
        })
    }
    handleSubmit=e=>{
        e.preventDefault()
        console.log(this.state)
        this.props.updateUser(this.state)
        this.props.history.push("/userProfile");
    }
    render(){
        const {userDetails,auth}=this.props
        if(!auth.uid) return <Redirect to="/signin" />
        return(
            <div className="container">
            <h2 className="text-center">Update</h2>
            <form onSubmit={this.handleSubmit}>
                     
                    <UserLogo initials={userDetails.initials}/>
                    {/* <div className="form-group">
                        <label htmlFor='password'>Change Password</label>
                    </div> */}
                    <div className="float-right mt-4">
                    <div className="form-group">
                        <label htmlFor='firstName'>First Name</label>
                        <input type="text" id="firstName" className="form-control" defaultValue={userDetails.firstName} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor='lastName'>Last Name</label>
                        <input type="text" id="lastName" className="form-control"defaultValue={userDetails.lastName}onChange={this.handleChange}/>
                    </div>
                    <div>
                        <button type="submit"className="btn btn-outline-danger text-danger">Update</button>
                    </div>
                    <div >
                        <Link to='/updatePassword' className="btn m-3 mt-5  btn-outline-danger btn-lg btn-block">Change Password</Link>
                     </div>
                    {/* <div className="text-danger text-center text-uppercase">
                        {authError ? <p>{authError}</p>:null}
                    </div> */}
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state=>{
    return{
        userDetails: state.firebase.profile,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        updateUser: creds=> dispatch(updUser(creds))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UpdateUser)