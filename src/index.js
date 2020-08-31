import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import './index.css';
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./store/reducers/rootReducer";
import { Provider, useSelector } from "react-redux";
import thunk from "redux-thunk";
import {
  reduxFirestore,
  createFirestoreInstance,
  getFirestore
} from "redux-firestore";

import { ReactReduxFirebaseProvider, getFirebase, isLoaded } from "react-redux-firebase";

import firebase, { fbConfig } from "./config/fbConfig";

// createStore is function which is used to create a redux store. The process is something like this-- 
//if u wanna RETRIEVE th data from the store --  we are retrieving the data in the parent component in the dashboard and then pass it as props to project List and summary. WE will bind the function with an higher order component and that will allow us to mapStateToProps and pass the state of the root reducer. then we can access the state

const store = createStore(
  rootReducer,

  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),

    reduxFirestore(firebase, fbConfig)
  )
);
// router guarding is possible bcoz of this config
const rrfConfig ={
  userProfile: "users",// we are telling firebase to which collection to look for.
  useFirestoreForProfile:true
}

const rrfProps = {
  firebase,
  config: Object.assign({},fbConfig,rrfConfig),
  dispatch: store.dispatch,
  createFirestoreInstance
};

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <div>Loading Screen...</div>;
      return children
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
    <AuthIsLoaded>
      <App />
      </AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();