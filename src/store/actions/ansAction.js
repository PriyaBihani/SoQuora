export const createAnswer =(answer,questionId)=>{
    return(dispatch,getState,{getFirebase,getFirestore})=>{
        const firestore = getFirestore()
        const state= getState()
        const userId = state.firebase.auth.uid
        const userFirstName = state.firebase.profile.firstName
        const userLastName = state.firebase.profile.lastName
        firestore.collection('answers').add({
            answer: answer,
            questionId:questionId,
            userId:userId,
            userFirstName: userFirstName,
            userLastName: userLastName,
            createdAt:new Date()
        }).then(()=>{
            dispatch({type:"CREATE_ANSWER",answer:answer})
        }).catch((err)=>{
            dispatch({type:"CREATE_ANSWER_ERROR"})
        })
    }
}

export const deleteAnswer=(answerID)=>{
    return(dispatch,getState,{getFirebase,getFirestore})=>{
        const firestore= getFirestore()
        firestore.collection("answers").doc(answerID).delete().then(()=>{
            dispatch({type:"ANSWER_DELETED_SUCCESS"})
        }).catch(err=>{
            dispatch({type:"ERROR_DELETING_ANSWER",err})
        })
    }
}

export const UpdateAns = (state,answerId)=>{
    return(dispatch,getState,{getFirebase,getFirestore})=>{
        const firestore = getFirestore()
        firestore.collection('answers').doc(answerId).update({
            ...state
        }).then(()=>{
            dispatch({type:'UPDATED_ANSWER_SUCCESS'})
        }).catch(()=>{
            dispatch({type:'ERROR_UPDATING_ANSWER'})
        }) 
    }
}