import React, {Component} from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'
import {UpdateQues } from '../../store/actions/quesAction'
import {Redirect } from 'react-router-dom'

class UpdateQuestion extends Component {
    state={}
    
    handleChange=(e)=>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        this.props.updateQuestion(this.state,this.props.match.params.id)
        this.props.history.push("/");
    }

    render(){
        const {question,auth}= this.props
        if(auth.uid) return <Redirect to='/signin'/>
        if(question){
            return(
                <div className="container">
                   <h2 className="text-center"> Update Question</h2> 
                   <div className="container">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="question">Question</label>
                            <textarea onChange={this.handleChange}   id="question" className="form-control" defaultValue={question.question}></textarea>
                        </div>    
                        <div className="form-group">
                            <label htmlFor="explainQuestion">Explain Question</label>
                            <textarea onChange={this.handleChange}   id="explainQuestion" className="form-control"cols="30" rows="10" defaultValue={question.explainQuestion}></textarea>
                        </div>
                        <div>
                            <button type="submit" className="btn btn-danger float-right">Update</button>
                        </div>
                        {/* <div className="text-center text-danger text-uppercase">
                            {quesError}
                        </div> */}
                    </form>
                </div>
                </div>
            )
        }else{
            return(
                <div className="container">
                  Loading Question...
                </div>
            )
        }
        
    }
}

const mapStateToProps=(state,ownProps)=>{
    const {id} = ownProps.match.params
    const questions=state.firestore.data.questions
    const question = questions ? questions[id] : null
    return{
        question: question,
        auth: state.firebase.auth
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        updateQuestion: (state,id)=>dispatch(UpdateQues(state,id))
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([
       {collection:'questions'}
    ])
)(UpdateQuestion)
