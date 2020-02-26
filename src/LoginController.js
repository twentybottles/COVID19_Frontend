import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import LoginForm from './LoginForm';
import MemberRegistration from './MemberRegistration';
import ForgotPassword from './ForgotPassword';

const LoginController = () => {
	return (
	  <BrowserRouter>
	    <Switch>
	        <Route exact={true} path="/" component={LoginForm} />
	        <Route path="/memberRegistration" component={MemberRegistration} />
	        <Route path="/forgotPassword" component={ForgotPassword} />
	        {/* Not Found */}
	        <Route component={() => <Redirect to="/" />} />
	     </Switch>
	  </BrowserRouter>
	);
};

export default LoginController;