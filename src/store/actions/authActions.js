export const signIn = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "LOGIN_ERROR", err });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        firebase.logout()
        dispatch({ type: "SIGNOUT_SUCCESS" });
      });
  };
};

export const signUp = newUser => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(res => {
        return firestore
          .collection("users")
          .doc(res.user.uid)
          .set({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            initials: newUser.firstName[0] + newUser.lastName[0]
          });
      })
      .then(() => {
        dispatch({ type: "SIGNUP_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "SIGNUP_ERROR", err });
      });
  };
};

export const updUser = creds => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirestore();
    const state = getState();
    const id = state.firebase.auth.uid;
    firebase
      .collection("users")
      .doc(id)
      .update({
        ...creds
      })
      .then(() => {
        dispatch({ type: "UPDATED_USER" });
      })
      .catch(err => {
        dispatch({ type: "ERROR_UPDATNG_USER", err: err });
      });
  };
};

export const handleBlocked = message => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch({ type: message });
  };
};

export const UpdateUserPassword = data => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    const cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      data.currentPassword
    );
    user
      .reauthenticateWithCredential(cred)
      .then(() => {
        user.updatePassword(data.newPassword).then(() => {
          dispatch({ type: "PASSWORD_IS_CHANGED" });
        });
      })
      .catch(err => {
        dispatch({ type: "ERROR_CHANGING_PASSWORD" });
      });
  };
};

export const PasswordLessLogIn = email => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .sendSignInLinkToEmail(email, {
        url: "http://localhost:3000/passlesslogin",
        handleCodeInApp: true
      })
      .then(() => {
        window.localStorage.setItem("emailForSignIn", email);
      })
      .then(() => {
        const emailSend = true;
        dispatch({ type: "EMAIL_SEND", emailSend: emailSend });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const ReqProcess = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      const email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        email = window.prompt("please provide your email for confirmation");
      }
      firebase
        .auth()
        .signInWithEmailLink(email, window.location.href)
        .then(() => {
          window.localStorage.removeItem("emailForSignIn");
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };
};
