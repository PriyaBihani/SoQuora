import React, {Component} from 'react'
import {connect} from 'react-redux'
import {signUp} from '../../store/actions/authActions'
import {Redirect} from 'react-router-dom'

class SignUp extends Component {
    state={
        email:'',
        password:'',
        firstName:'',
        lastName:''
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.id]:e.target.value
        })
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        this.props.signUp(this.state)
    }
    render(){
        const {authError,auth}= this.props
        if(auth.uid) return <Redirect to='/'/>
        return(
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <h5>Sign Up</h5>
                    <div className="form-group">
                        <label htmlFor='email'>Email</label>
                        <input type="email" id="email" className="form-control" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor='password'>Password</label>
                        <input type="password" id="password" className="form-control" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor='firstName'>First Name</label>
                        <input type="text" id="firstName" className="form-control" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor='lastName'>Last Name</label>
                        <input type="text" id="lastName" className="form-control"onChange={this.handleChange}/>
                    </div>
                    <div>
                        <button type="submit"className="btn btn-danger">SignUp</button>
                    </div>
                    <div className="text-danger text-center text-uppercase">
                        {authError ? <p>{authError}</p>:null}
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps =(dispatch)=>{
    return{
        signUp: (newUser)=>dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUp)