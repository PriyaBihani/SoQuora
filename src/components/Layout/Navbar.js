import React from 'react'
import {Link} from 'react-router-dom'
import SignedOutLinks from './SignedOutLinks'
import SignedInLinks from './SignedInLinks'
import {connect} from 'react-redux'

const Navbar = (props)=>{
    const {auth}= props
    const links = auth.uid ? <SignedInLinks />:<SignedOutLinks/>
    return(
        <nav className="navbar navbar-expand-sm navbar-light bg-light mb-5">
            <div className="container">
                <Link to='/' className="navbar-brand text-danger">
                <strong>SoQuora </strong>
                </Link>
                {links}
            </div>
        </nav>
    )
}

const mapStateToProps=(state)=>{
    console.log(state)
    return{
        auth:state.firebase.auth
    }
}

export default connect(mapStateToProps)(Navbar)