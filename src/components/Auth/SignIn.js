import React, {Component} from 'react'
import {connect} from 'react-redux'
import {signIn} from '../../store/actions/authActions'
import {Redirect,Link } from 'react-router-dom'
import { handleBlocked } from "../../store/actions/authActions";
const firebase= require("firebase")
require("firebase/functions")

class SignIn extends Component {
    state={
        email:'',
        password:''
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.id]:e.target.value
        })
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        const functions= firebase.functions()
        const checkBlocked= functions.httpsCallable("checkBlocked")
        checkBlocked(this.state).then(res=>{
            console.log(res)
            if(res.data!=null){
                this.props.handleBlocked(res.data.message)
            }else{
                this.props.signIn(this.state)
            }
        })
        
    }
    render(){
        const {authError,auth} = this.props
        if(auth.uid) return <Redirect to='/'/>
        return(
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <h5>Sign In</h5>
                    <div className="form-group">
                        <label htmlFor='email'>Email</label>
                        <input onChange={this.handleChange} type="email" id="email" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor='password'>Password</label>
                        <input onChange={this.handleChange} type="password" id="password" className="form-control"/>
                    </div>
                    <div>
                        <button className="btn btn-danger">Login</button>
                    </div>
                    <div className="text-danger text-center text-uppercase">
                        {authError ? <p>{authError}</p>:null}
                    </div>
                </form>
                <div >
                    <Link to='/passlesslogin' className="btn m-3 mt-5  btn-outline-danger btn-lg btn-block">Password Less Sign in</Link>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return{
        authError: state.auth.authError,
        auth:state.firebase.auth
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        signIn: (creds)=>dispatch(signIn(creds)),
        handleBlocked: (message)=>dispatch(handleBlocked(message))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignIn)