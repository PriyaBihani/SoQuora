import React, {Component} from 'react'
import {connect} from 'react-redux'
import QuestionSummary from '../Questions/QuesSummary'
import {createAnswer} from '../../store/actions/ansAction'
import { Redirect } from 'react-router-dom'

class CreateAns extends Component{
    state={
        answer:''
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.id]:e.target.value
        })
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        this.props.createAnswer(this.state,this.props.match.params.id)
        this.props.history.push("/quesans"+this.props.match.params.id);
    }
    render(){
        const {ansError,auth}= this.props
        if(!auth.uid) return <Redirect to='/signin' />
        if(this.props.question){
            return(
                <div className="container ml-5 mr-5">
                    <div>
                        <QuestionSummary question={this.props.question}/>
                    </div>
    
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="answer"><strong> <h3>Answer</h3></strong></label>
                                <textarea onChange={this.handleChange} id="answer" className="form-control"cols="30" rows="10"></textarea>
                            </div>
                            <div>
                                <button type="submit" className="btn btn-danger float-right">Answer</button>
                            </div>
                            <div className="text-danger text-center text-uppercase">
                            { ansError ? <p>{ansError}</p>:null}
                            </div>
                        </form>
                    </div>
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
}

const mapStateToProps=(state,ownProps)=>{
    const {id} = ownProps.match.params
    const questions = state.firestore.data.questions
    const question= questions ? questions[id] : null
    return{
        question:question,
        ansError: state.ans.ansError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps =(dispatch)=>{
    return{
        createAnswer: (ans,id)=> dispatch(createAnswer(ans,id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateAns)