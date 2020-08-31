import React from 'react'

const UserLogo = props =>{
    return(
        <div className="float-left">
            <a href="#"className="nav-link text-light btn bg-danger rounded-circle btn-lg p-5 m-5" to='/userProfile'>
                {props.initials}
            </a>
        </div>
    )
}

export default UserLogo