const intiState={
    quesError:null
}

const quesReducer =(state=intiState,action)=>{
    switch(action.type){
        case "CREATE_QUESTION":
            console.log('created question',action.question)
            return{
                ...state,
                quesError:null
            }
        case "CREATE_QUESTION_ERROR":
            console.log('create question error')
            return{
                ...state,
                quesError:"Error creating question"
            }
        case "DELETED_QUESTION_SUCCESS":
            console.log('deleted question successfully')
            return{
                ...state,
                quesError:null
            }  
        case 'ERROR_DELETING_QUESTION':
            console.log("error deleting the question", action.err)
            return{
                ...state,
                quesError:'Error Deleting the question'
            }
        case 'UPDATED_QUESTION_SUCCESS':
            console.log("updated question")
            return{
                ...state,
                quesError:null
            }
        case 'ERROR_UPDATING_QUESTION':  
            console.log("error updating question")
            return{
                ...state,
                quesError:'Error updating the question'
            }         
        default:
            return state    
    }
}
export default quesReducer