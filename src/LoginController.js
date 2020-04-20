import React from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'

import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import ForgotPassword from "./components/forgotPassword.component";

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
                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/forgot-password" component={ForgotPassword} />            
          </Switch>
        </div>
      </div>
    </div>
	  </BrowserRouter>
	);
};

export default LoginController;