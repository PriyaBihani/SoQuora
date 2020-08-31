import React from 'react'
import moment from 'moment'
import DeleteButton from './deleteButton'
import {connect} from 'react-redux'
import UpdateButton from '../Answers/updateButton'

const ansList= (props)=>{
    console.log(props)
    const {quesId,answers,isAdmin,auth} = props
    console.log(answers)
    const ansList = answers.map(answer=>{
        console.log(answer.questionId)
        if(quesId === answer.questionId){
            return(
                <div key={answer.id}>
                    <div className="card p-4">
                    <div className="card-text">
                        {answer.answer.answer}
                    </div>
                    <div className="clearfix"></div>
                    <span className="card-text text-muted float-right">
                        posted by {answer.userFirstName} {answer.userLastName}
                    </span>
                    <div className="clearfix"></div>
                    <span className="card-text text-muted float-right">
                    {moment(answer.createdAt.toDate()).calendar()}
                    </span>
                    </div>
                    {
                        (auth.uid===answer.userId || isAdmin ===true) ? 
                        (   <div className="mt-3 mb-3 mr-2">
                                <div className="float-right">
                                    <DeleteButton answerId={answer.id}/>
                                </div>
                                <div className="clearfix"></div>
                                <br/>
                            </div>
                        ):null
                    }
                    {
                        (auth.uid===answer.userId)?
                        (
                            <div className="float-right">
                                <UpdateButton answerId={answer.id}/>
                            </div>
                        ):null
                    }
                   
                </div>
            )
        }else{
            return null
        }
    })
    return(
        <div >
            {ansList}
        </div>
    )
}

const mapStateToProps=(state)=>{
    return{
        isAdmin:state.admin.isAdmin,
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(ansList)