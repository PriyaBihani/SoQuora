import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import CreateQuestion from "./components/Questions/CreateQuestion";
import QuesAns from "./components/Questions/QuestionAnswer";
import CreatAns from "./components/Answers/CreateAns";
import MyAns from "./components/Answers/MyAns";
import MyQues from "./components/user/MyQues";
import AdminDashboard from "./components/admin/Dashboard";
import UpdateQuestion from "./components/user/updateQuestion";
import updateAnswer from "./components/user/updateAnswer";
import userProfile from "./components/user/userProfile";
import UpdateUser from "./components/user/updateUser";
import ListUser from "./components/admin/ListUsers";
import updatePassword from "./components/user/updatePassword";
import PasswordLessSignIn from "./components/Auth/PasswordLess";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <Route path="/askques" component={CreateQuestion} />
            <Route path="/myquestions" component={MyQues} />
            <Route path="/myanswers" component={MyAns} /> \
            <Route path="/quesans/:id" component={QuesAns} />
            <Route path="/answer/:id" component={CreatAns} />
            <Route path="/admin" component={AdminDashboard} />
            <Route path="/updateQues/:id" component={UpdateQuestion} />
            <Route path="/updateAns/:id" component={updateAnswer} />
            <Route path="/userProfile" component={userProfile} />
            <Route path="/updateUser" component={UpdateUser} />
            <Route path="/userList" component={ListUser} />
            <Route path="/updatePassword" component={updatePassword} />
            <Route path="/passlesslogin" component={PasswordLessSignIn} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
