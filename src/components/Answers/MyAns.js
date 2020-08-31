import React,{Component}from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'
import MyAnsQues from '../user/MyAnsQues'
import { Redirect } from 'react-router-dom'

class MyAns extends Component{
    render(){
        const {userId,answers,auth}= this.props
        if(!auth.uid) return <Redirect to='/signin' />
        return(
            <div className="container">
              {answers && answers.map(answer=>{
                if(userId=== answer.userId){
                    return (
                        <div className="container" key={answer.id}>
                            <MyAnsQues quesId={answer.questionId} answer={answer} />
                        </div>
                    )
                }
            })}
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        userId: state.firebase.auth.uid,
        answers: state.firestore.ordered.answers,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: "questions"},
        {collection:"answers"}
    ])
)(MyAns)