import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'

import Login from "./components/view/loginView";
import Mypage from "./components/view/mypageView";
import SignUp from "./components/view/signupView";
import SignUpConfirm from "./components/view/signupConfirmView";
import SignUpComplete from "./components/view/signupCompleteView";
import ForgotPassword from "./components/view/forgotPasswordView";
import ForgotPasswordComplete from "./components/view/forgotPasswordCompleteView";
import DropDown from './components/util/dropDown';

class ViewController extends Component {

   constructor(props){

    super(props);

    this.state = {
      isLogin: false,
      name: ''
    }

  }

  isLoginMenu(name) {
    this.setState({ 
      name: name,
      isLogin: true });
  }

  render() {

    let navbar;
    if (this.state.isLogin) {
      navbar = (
                <div className="text-right mr-5">
                  <DropDown key="name" index={this.state.name} />
                </div>
              );
    } else {
      navbar = (
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                  <ul className="navbar-nav ml-auto naviFont">
                    <li className="nav-item">
                      <Link className="nav-link" to={"/"}>Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/signup"}>Sign up</Link>
                    </li>
                  </ul>
                </div>
              );
    }

    return(
      <BrowserRouter>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand titleFont" to={"/"}>COVID-19.com</Link>
          </div>
          {navbar}
        </nav>

        <div className="auth-wrapper">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path="/mypage">
              <Mypage loginMenu={(name) => { this.isLoginMenu(name); }} />
            </Route>
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