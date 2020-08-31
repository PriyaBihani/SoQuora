import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'
import QuestionSummary from '../Questions/QuesSummary'
import moment from 'moment';
import DeleteButton from "../Answers/deleteButton";
import UpdateButton from '../Answers/updateButton'

const MyAnsQues = (props)=>{
    console.log(props)
    const {answer}=props
  
    if(props.question){
        return(
            <div key={props.question.id}>
                <QuestionSummary question={props.question}/>
                <div className="card m-3 p-3">
                    <div className="card-header">
                        <h2>Answer</h2>
                    </div>
                    <div className="card-body">
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
                </div>
                <div className="float-right">
                    <DeleteButton answerId={answer.answer.id} />
                </div>
                <div className="float-right">
                    <UpdateButton answerId={answer.id}/>
                </div>
                <hr/>
            </div>
        )
    }else{
        return(
            <div className="container">
                Loading Question....
            </div>
        )
    }
}

const mapStateToProps=(state,ownProps)=>{
    const quesId = ownProps.quesId
    const questions = state.firestore.data.questions
    console.log(state)
    const question = questions ? questions[quesId] :null
    return{
        question: question
    }
}

export default compose(
    firestoreConnect([
        {collection: 'questions'}
    ]),
    connect(mapStateToProps)
    
)(MyAnsQues)