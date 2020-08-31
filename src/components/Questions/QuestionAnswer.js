import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'
import {Link,Redirect } from 'react-router-dom'
import QuestionSummary from './QuesSummary'
import AnsList from '../Answers/AnsList'

const questionAnswer =(props)=>{
    const {id} = props.match.params
    const{question,answers,auth} =props
    // if(!auth.uid) return <Redirect to='/signin' />
    console.log(props)
    if(question){
        return(
            <div className="container">
                <QuestionSummary question={props.question}/>
                <br/>    
                    <Link to={'/answer/'+id}className="btn btn-danger mr-3 float-right">Answer</Link>
                <div className="clearfix"></div>
                <h2>Answers</h2>
                {answers && <AnsList quesId={id} answers={answers}/> }
            </div>
        )
    }else{
        return(
            <div className="container text-center">
                <p>Loading Questions...</p>
            </div>
        )
    } 
}

const mapStateToProps=(state,ownProps)=>{
    console.log(state)
    const id = ownProps.match.params.id
    const questions = state.firestore.data.questions
    const answers = state.firestore.ordered.answers
    const question= questions ? questions[id] : null
    return{
        question:question,
        answers: answers,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
       {collection:'questions'},
       {collection:'answers'} 
    ])
)(questionAnswer)