const intiState = {
  authError: null,
  emailSend: false
};

const authReducer = (state = intiState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      console.log("login success");
      return {
        ...state,
        authError: null
      };
    case "LOGIN_ERROR":
      console.log("login error",action.err);
      return {
        ...state,
        authError: "Login Failed"
      };
    case "SIGNUP_SUCCESS":
      console.log("signup success");
      return {
        ...state,
        authError: null
      };
    case "SIGNUP_ERROR":
      console.log("signup error");
      return {
        ...state,
        authError: action.err.message
      };
    case "SIGNOUT_SUCCESS":
      console.log("signout success");
      return {
        ...state,
        authError: null
      };
    case "UPDATED_USER":
      console.log("user updated");
      return {
        ...state,
        authError: null
      };
    case "ERROR_UPDATNG_USER":
      console.log("error updating user", action.err);
      return {
        ...state,
        authError: action.err.message
      };
    case "BLOCKED":
      console.log("blocked by admin");
      return {
        ...state,
        authError: "YOU ARE BLOCKED BY ADMIN"
      };
    case "PASSWORD_IS_CHANGED":
      console.log("password is changed");
      return {
        ...state,
        authError: "PASSWORD CHANGED"
      };
    case "ERROR_CHANGING_PASSWORD":
      console.log("error changing the password");
      return {
        ...state,
        authError: "ERROR CHANGING THE PASSWORD"
      };
    case "EMAIL_SEND":
      console.log("Email Changed");
      return {
        ...state,
        emailSend: true
      };
    default:
      return state;
  }
};
export default authReducer;
