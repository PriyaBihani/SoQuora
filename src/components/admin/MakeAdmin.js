import React,{Component} from 'react'
const firebase= require("firebase")
require("firebase/functions")

class MakeAdmin extends Component {
    state={
        email:''
    }
    handleSubmit= async (e)=>{
        e.preventDefault()
        console.log(this.state)
        const functions= firebase.functions()
        const addAdminRole= functions.httpsCallable("addAdminRole")
        addAdminRole(this.state).then(res=>{
            // call the function to set the state over here
            console.log(res)
        })
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.id]:e.target.value
        })
    }
    render(){
        return(
            <div className="container">
            <h5>Make Admin</h5>
            <br/>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email Id:</label>
                        <input id="email" onChange={this.handleChange} className="form-control"  type="email"/>
                    </div>
                    <button className="btn btn-danger">Make Admin</button>
                </form>
            </div>
        )
    }
}

export default MakeAdmin