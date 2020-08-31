import React from 'react'
import { Link } from "react-router-dom";

const updateButton= (props)=>{
    console.log(props)
    const {answerId}= props
    return(
        <div className="container">
            <Link to={'/updateAns/'+ answerId} className="btn btn-danger">
                Update
            </Link>
        </div>
    )
}

export default updateButton