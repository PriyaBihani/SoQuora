import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'
import AllQuesList from '../Questions/AllQuesList'
import {Redirect} from 'react-router-dom'

const myQuesList = (props)=>{
    const {userId,questions,auth}= props
    if(!auth.uid) return <Redirect to='signin'/>
    return(
        <div className="container">
            
            {questions && <AllQuesList 
                questions={
                    questions.map(question=>{
                        if(userId === question.userId){
                            return question
                        }else{
                            return null
                    }})
                } 
            />}
        </div>
    )
}

const mapStateToProps=(state)=>{
    return{
       userId:state.firebase.auth.uid,
       questions:state.firestore.ordered.questions,
       auth: state.firebase.auth
    }
}
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection:'questions'}
    ])
)(myQuesList)