import React from 'react'
import { Link } from "react-router-dom";

const updateButton= (props)=>{
    console.log(props)
    const {questionId}= props
    return(
        <div className="container">
            <Link to={'/updateQues/'+ questionId} className="btn btn-danger">
                Update
            </Link>
        </div>
    )
}

export default updateButton