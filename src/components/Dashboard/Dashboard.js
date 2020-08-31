import React,{Component} from 'react'
import AllQuesList from '../Questions/AllQuesList'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import{ Redirect} from 'react-router-dom'

class Dashboard extends Component {
    render(){
        const {questions,auth} = this.props
        // if(!auth.uid) return <Redirect to='signin'/>
        return(
            <div className="container">
                <AllQuesList questions={questions} />
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    // console.log(state)
    return{
        // questions:state.ques.questions
       questions:state.firestore.ordered.questions,
       auth:state.firebase.auth
    }
}

export default compose(
     connect(mapStateToProps),
     firestoreConnect([
        {collection:'questions'}
     ])

)(Dashboard)