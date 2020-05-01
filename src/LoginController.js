import React from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'

import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import ForgotPassword from "./components/forgotPassword.component";
import Mypage from "./components/mypage.component";
import SignUpConfirm from "./components/signupConfirm.component";
import SignUpComplete from "./components/signupComplete.component";

const LoginController = () => {
	return (
	  <BrowserRouter>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/"}>Portfolio.com</Link>
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
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path="/mypage" component={Mypage} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signup-confirm" component={SignUpConfirm} />
            <Route path="/signup-complete" component={SignUpComplete} />
            <Route path="/forgot-password" component={ForgotPassword} />
          </Switch>
        </div>
      </div>
    </div>
	  </BrowserRouter>
	);
};

export default LoginController;