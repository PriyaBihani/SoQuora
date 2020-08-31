import React from 'react'
import {Link } from 'react-router-dom'
import moment from 'moment'
import DeleteButton from './deleteButton'
import UpdateButton from './updateButton'
import {connect} from 'react-redux'

const AllQuesList = (props)=>{
    const {questions,auth,isAdmin} = props
    console.log(questions)
    return(
        <div >
        { 
        questions && questions.map(question=>{
            if(question){
                return(
                <div  key={question.id}>    
                <Link to={'/quesans/'+ question.id } className="Link">
                    <div className="mb-3 card">
                        <span className="card-header text-dark">
                            <h4>{question.question}</h4>
                        </span>
                        <span className="pl-3 card-text text-muted">
                            posted by {question.userFirstName} {question.userLastName}
                        </span>
                        <span className="pl-3 card-text text-muted">
                            {moment(question.createdAt.toDate()).calendar()}
                        </span>
                    </div>
                </Link>
                 {
                    (auth.uid===question.userId || isAdmin ===true) ? 
                    (   
                        <span className="float-right">
                        <DeleteButton questionId={question.id}/>
                        </span>

                    ) : null
                 }   
                 {
                     (auth.uid===question.userId) ? 
                     (
                        <span  className="float-right">
                            <UpdateButton questionId={question.id} />
                        </span>
                     ) : null
                 }
            
            <div className="clearfix"></div>
            <br/>
            </div>
            )
            }else{
                return null
            }
        })}

        </div>
    )
}

const mapStateToProps =(state)=>{
    return{
        auth: state.firebase.auth,
        isAdmin: state.admin.isAdmin
    }
}

export default connect(mapStateToProps)(AllQuesList)