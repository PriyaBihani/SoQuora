import React, { Component } from 'react' 
import {connect } from "react-redux";
import {CreateQues} from '../../store/actions/quesAction'
import {Redirect} from 'react-router-dom'

class CreateQuestion extends Component {
    state={
        question:'',
        explainQuestion:''
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.id]:e.target.value
        })
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        this.props.CreateQues(this.state)
        this.props.history.push("/");
    }
    render(){
        const {quesError,auth}= this.props
        if(!auth.uid) return <Redirect to='/signin'/>
        return(
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="question">Question</label>
                        <textarea onChange={this.handleChange}   id="question" className="form-control"></textarea>
                    </div>    
                    <div className="form-group">
                        <label htmlFor="explainQuestion">Explain Question</label>
                        <textarea onChange={this.handleChange}   id="explainQuestion" className="form-control"cols="30" rows="10"></textarea>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-danger">Ask</button>
                    </div>
                    <div className="text-center text-danger text-uppercase">
                        {quesError}
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        quesError: state.ques.quesError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps =(dispatch)=>{
    return{
        CreateQues: (question)=> dispatch(CreateQues(question))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateQuestion)