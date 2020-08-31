export const CheckAdmin = ()=>{
    return(dispatch,getState,{getFirebase,getFirestore})=>{
        const firebase = getFirebase()
        firebase.auth().currentUser
        .getIdTokenResult(true)
        .then((idTokenResult)=>{
            const isAdmin = idTokenResult.claims.admin
            dispatch({type:"CHECKING_ADMIN",isAdmin})
        }).catch(err=>{
            dispatch({type:"ERROR_CHECKING_ADMIN",err})
        })
    }
}