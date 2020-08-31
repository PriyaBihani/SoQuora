import React,{Component} from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'
import {firestoreConnect} from 'react-redux-firebase'
import QuestionSummary from '../Questions/QuesSummary'
import {UpdateAns} from '../../store/actions/ansAction'
import { auth } from 'firebase'

class UpdateAnswer extends Component{
    state={}
    handleChange=(e)=>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        console.log(this.state)
        const {id}= this.props.match.params
        this.props.updateAnswer(this.state,id)
        this.props.history.push("/answer/" + id);
    }
    render(){
        console.log(this.props)
        const {question,answer,auth} = this.props
        if(!auth.uid) return <Redirect to='/signin'/>
        if(answer && question){
            return(
                <div className="container">
                    <h2 className="text-center">Update Answer</h2>
                    <div>
                        <QuestionSummary question={question}/>
                    </div>
                    <div className="container">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="answer">
                                    <strong>Answer</strong>
                                </label>
                                <textarea onChange={this.handleChange} 
                                id="answer" className="form-control"
                                cols="30" rows="10" 
                                defaultValue={answer.answer.answer}>
                                </textarea>
                            </div>
                            <div>
                                <button type="submit" 
                                        className="btn btn-danger float-right">
                                        Update
                                </button>
                            </div>
                            {/* <div className="text-danger text-center text-uppercase">
                            { ansError ? <p>{ansError}</p>:null}
                            </div> */}
                        </form>
                    </div>
                </div>
            )
        }else{
            return(
                <div className="container">
                    Loading Answers...
                </div>
            )
        }
        
    }
}

const mapStateToProps=(state,ownProps)=>{
    const {id} = ownProps.match.params
    console.log(state)
    const answers= state.firestore.data.answers
    const answer = answers ? answers[id]:null
    const questions = state.firestore.data.questions
    const question= questions? questions[answer.questionId] : null
    return{
        answer: answer,
        question: question,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        updateAnswer: (state,id)=>dispatch(UpdateAns(state,id))
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([
        {collection:'answers'},
        {collection:'questions'}
    ])
)(UpdateAnswer)