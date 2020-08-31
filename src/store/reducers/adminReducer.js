const initState={
    isAdmin:false
}

const adminReducer=(state=initState,action)=>{
    switch(action.type){
        case "CHECKING_ADMIN":
            console.log("checking admin")
            return{
                ...state,
                isAdmin:action.isAdmin
            }
        case "ERROR_CHECKING_ADMIN":
            return{
                ...state
            }
        default:
            return state    
    }
}

export default adminReducer