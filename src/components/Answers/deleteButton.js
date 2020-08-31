import React from 'react'
import {connect} from 'react-redux'
import {deleteAnswer} from '../../store/actions/ansAction'

const deleteButton = ({answerId,deleteAnswer})=>{
    return(
        <div >
         <button onClick={()=>{deleteAnswer(answerId)}} className="btn btn-danger">Delete</button>
        </div>
    )
}

const mapDispatchToProps=(dispatch)=>{
    return{
        deleteAnswer: (Id)=>dispatch(deleteAnswer(Id))
    }
}

export default connect(null,mapDispatchToProps)(deleteButton)