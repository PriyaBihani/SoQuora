const functions = require('firebase-functions');
const admin = require('firebase-admin')
admin.initializeApp()

exports.addAdminRole = functions.https.onCall((data, context)=>{
    if(context.auth.token.admin !== true){
        return { error: 'only admins can add other admin, sucker'}
    }
    //get user and add custom claims (admin)
    console.log("request recieved")
    console.log(data)
    return admin.auth().getUserByEmail(data.email).then(user=>{
        return admin.auth().setCustomUserClaims(user.uid,{
            admin:true
        })
    }).then(()=>{
        console.log("it is working")
        return{
          message: "it is working"
        }
    }).catch(err=>{
        return err
    })
})

exports.userList = functions.https.onCall((data,context)=>{
    console.log("req recieved to retreive user")
    return admin.auth().listUsers(10).then(listUserResult=>{
        console.log("its time to work")
        return {users:listUserResult.users}
    }).catch(err=>{
        console.log(err)
    })
})

exports.blockUser = functions.https.onCall((data,context)=>{
    console.log("req recieved to disable user")
    return admin.auth().updateUser(data,{
        disabled:true
    }).then((userRecord)=>{
        console.log(userRecord)
        return {userRecord}
    }).catch(err=>{
        console.log(err)
    })
})

exports.unblockUser = functions.https.onCall((data,context)=>{
    console.log("req recieved to enable user")
    return admin.auth().updateUser(data,{
        disabled:false
    }).then((userRecord)=>{
        console.log(userRecord)
        return {userRecord}
    }).catch(err=>{
        console.log(err)
    })
})

exports.checkBlocked = functions.https.onCall((data,context)=>{
    console.log("req recieved to check the blocked user")
    return admin.auth().getUserByEmail(data.email).then(user=>{
        if(user.disabled===true){
            return {
                message: "BLOCKED"
            }
        }
    }).catch(err=>{
        console.log(err)
    })
})

exports.deleteUser = functions.https.onCall((data,context)=>{
    console.log("request recieved for deleting the user")
    return admin.auth().deleteUser(data).then(()=>{
        return{
            deleted:true
        }
    }).catch(err=>{
        console.log(err)
    })
})