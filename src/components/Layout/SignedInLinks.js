import React,{Component} from 'react'
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {signOut} from '../../store/actions/authActions'
import {CheckAdmin} from '../../store/actions/adminAction'


class SignedInLinks extends Component{
    state={}
    componentDidMount(){
        this.props.isAdmin()
    }
    render(){
        const {checkAdmin} = this.props
        const adminLink = (checkAdmin) ? (
            <li className="nav-item">
                    <NavLink to='/admin' className="nav-link text-danger">Admin </NavLink>
                </li>
        ): null
    return(
        <div className="float-right">
        <ul className="navbar-nav">
                
                {adminLink}
            
                <li className="nav-item">
                    <NavLink to='#'onClick={this.props.signOut} className="nav-link text-danger">LogOut </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink to='/askques' className="nav-link text-danger"> AskQues.</NavLink>
                </li>

                <li className="nav-item dropdown">

                    <NavLink className="nav-link dropdown-toggle" to="#"
                    id="navbarDropdownMenuLink" role="button"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="text-danger">MyContent</span>
                    </NavLink>

                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <NavLink className="p-2 text-danger" to="/myquestions">My Questions</NavLink>
                        <br />
                        <NavLink className="p-2 text-danger"  to="/myanswers">My Answers</NavLink>
                    </div>

                </li>

                <li className="nav-item">
                    <NavLink className="nav-link text-light btn bg-danger rounded-circle btn-sm " to='/userProfile'>{this.props.initials}</NavLink>
                </li>
            </ul>
        </div>
    )

}}

const mapStateToProps=(state)=>{
    return{
        initials: state.firebase.profile.initials,
        checkAdmin: state.admin.isAdmin
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        signOut: ()=>dispatch(signOut()),
        isAdmin: ()=>dispatch(CheckAdmin())
    }
}


export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([
        {collection: "users"}
    ])
)(SignedInLinks)