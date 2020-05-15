import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'

import Login from "./components/login.component";
import Mypage from "./components/mypage.component";
import SignUp from "./components/signup.component";
import SignUpConfirm from "./components/signupConfirm.component";
import SignUpComplete from "./components/signupComplete.component";
import ForgotPassword from "./components/forgotPassword.component";
import ForgotPasswordComplete from "./components/forgotPasswordComplete.component";

class ViewController extends Component {

  render() {

    return(
      <BrowserRouter>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/"}>COVID-19.com</Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/"}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/signup"}>Sign up</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="auth-wrapper">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path="/mypage" component={Mypage} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signup-confirm" component={SignUpConfirm} />
            <Route path="/signup-complete" component={SignUpComplete} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/forgot-password-complete" component={ForgotPasswordComplete} />
          </Switch>
        </div>
      </div>
      </BrowserRouter>
    );

  }
}

export default ViewController;