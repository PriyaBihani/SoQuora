import React from 'react'
import moment from 'moment'

const questionSummary=(props)=>{
    return(
        <div key={props.question.id}>
            <div className="card">
                <span className="card-header">
                    <h4>{props.question.question}</h4>
                </span>
                <div className="card-body">
                    <span className="card-text">
                        {props.question.explainQuestion}
                    </span>
                    <span className="card-text text-muted float-right">
                        posted by {props.question.userFirstName} {props.question.userLastName}
                    </span>
                    <div className="clearfix"></div>
                    <span className="card-text text-muted float-right">
                    {moment(props.question.createdAt.toDate()).calendar()}
                    </span>
                </div>
             </div>
        </div>        
    )
}

export default questionSummary