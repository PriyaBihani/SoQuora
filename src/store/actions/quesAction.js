export const CreateQues = (question)=>{
    return(dispatch,getState,{getFirebase, getFirestore})=>{
        const firestore = getFirestore()
        const state = getState()
        const userId= state.firebase.auth.uid
        const userFirstName = state.firebase.profile.firstName
        const userLastName = state.firebase.profile.lastName
        firestore.collection('questions').add({
            ...question,
            userFirstName: userFirstName,
            userLastName: userLastName,
            userId: userId,
            createdAt: new Date()
        }).then(()=>{
            dispatch({ type:"CREATE_QUESTION", question:question})
        }).catch(err=>{
            dispatch({type:'CREATE_QUESTION_ERROR'})
        })
    }
}

export const deleteQuestion = (id)=>{
    return(dispatch,getState,{getFirebase,getFirestore})=>{
        const firestore= getFirestore()
        const firebase= getFirebase()
        firestore.collection('questions')
        .doc(id)
        .delete()
        .then( async ()=>{
            const snapshot = await firebase.firestore()
                                    .collection('answers').get()

            snapshot.docs.map(doc=>{
                console.log(doc)
                let answer = doc.data()
                if(answer.questionId===id){
                    firestore.collection('answers').doc(doc.id).delete()
                }
            })
        }).then(()=>{
            dispatch({type:"DELETED_QUESTION_SUCCESS"})
        }).catch(err=>{
            dispatch({type:'ERROR_DELETING_QUESTION',err})
        })
    }
}
export const UpdateQues=(state,questionId)=>{
    return(dispatch,getState,{getFirebase,getFirestore})=>{
        const firestore = getFirestore()
        firestore.collection('questions').doc(questionId).update({
            ...state
        }).then(()=>{
            dispatch({type:'UPDATED_QUESTION_SUCCESS'})
        }).catch(()=>{
            dispatch({type:'ERROR_UPDATING_QUESTION'})
        })
    }
}