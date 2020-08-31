const intiState={
    ansError:null
}

const ansReducer =(state=intiState,action)=>{
    switch(action.type){
        case "CREATE_ANSWER":
            console.log('answer created')
            return {
                ...state,
                ansError:null
            }    
        case "CREATE_ANSWER_ERROR":
            console.log("creating answer error")
            return{
                ...state,
                ansError:"Creating answer error"
            }
        case"ANSWER_DELETED_SUCCESS":     
            console.log("deleted answer")
            return{
                ...state,
                ansError:null
            }
        case"ERROR_DELETING_ANSWER":
            console.log("err deleting answer",action.err)
            return{
                ...state,
                ansError:"Error deleting the answer"
            }
            case 'UPDATED_ANSWER_SUCCESS':
                console.log("updated answer")
                return{
                    ...state,
                    ansError:null
                }
            case 'ERROR_UPDATING_ANSWER':  
                console.log("error updating answer")
                return{
                    ...state,
                    ansError:'Error updating the answer'
                }     
        default:
            return state    
    }
}
export default ansReducer