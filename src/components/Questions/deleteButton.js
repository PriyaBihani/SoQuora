import React from 'react'
import {connect} from 'react-redux'
import {deleteQuestion} from '../../store/actions/quesAction'

const deleteButton = ({questionId,deleteQuestion})=>{
    return(
        <div>
         <button onClick={()=>{deleteQuestion(questionId)}} className="btn btn-danger">Delete</button>
        </div>
    )
}

const mapDispatchToProps=(dispatch)=>{
    return{
        deleteQuestion: (Id)=>dispatch(deleteQuestion(Id))
    }
}

export default connect(null,mapDispatchToProps)(deleteButton)