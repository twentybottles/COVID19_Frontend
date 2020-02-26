import React from 'react'
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input as ReactstrapInput, FormFeedback } from 'reactstrap';
import { withFormik, ErrorMessage, Field } from 'formik';
import * as yup from 'yup';

import Title from './Title';
import MemberRegistration from './MemberRegistration';
import ForgotPassword from './ForgotPassword';

const Input = ({ name, ...others }) => (
	<Field name={name} render={({ field }) => <ReactstrapInput {...field} {...others} />}/>);
const ErrorFormFeedback = ({ name }) => (
	<ErrorMessage name={name} component={({ children }) => <FormFeedback>{children}</FormFeedback>}/>);
const ErrorInnerMessage = ({ name }) => (
	<ErrorMessage name={name} component={({ children }) => (
		<span className="text-danger" style={{ fontSize: '1.2rem' }}>{children}</span>)}/>);
const LoginForm = ({handleSubmit, handleReset, isSubmitting, dirty, errors, touched, history}) => (
  	<div className="mx-auto col-8">
		<h2>Login Form</h2>
		<Form className="text-left" onSubmit={handleSubmit}>
			<FormGroup className="mb-2">
				<Label for="myUsername">Username</Label>
				<Input type="text" name="username" id="myUsername" placeholder="Enter username" valid={dirty && !errors.username} invalid={touched.username && !!errors.username}/>
				<ErrorFormFeedback name="username" />
			</FormGroup>
			<FormGroup className="mb-2">
				<Label for="myPassword">Password</Label>
				<Input type="password" name="password" id="myPassword" placeholder="Enter password" valid={dirty && !errors.password} invalid={touched.password && !!errors.password}/>
				<ErrorFormFeedback name="password" />
			</FormGroup>
			<Button type="submit" outline color="primary" disabled={isSubmitting}>Submit</Button>
		</Form>
      <p><Link to="/ForgotPassword">ForgotPassword</Link></p>
      <p><Link to="/MemberRegistration">MemberRegistration</Link></p>
	</div>
);

const MyEnhancedForm = withFormik({
	mapPropsToValues: () => ({username: '', password: '', isAccepted: false}),
	handleSubmit: (values, { setSubmitting }) => {
		setTimeout(() => {alert(JSON.stringify(values, null, 2));setSubmitting(false);}, 3000);
		console.log('SUBMIT:', values);
	},
	validationSchema: yup.object().shape({
		username: yup.string().min(3, 'A username must contain more than 3 characters').required('Enter a username'),
		password: yup.string().min(8, 'A username must contain more than 8 characters').required('Enter a password'),
	}),
})(LoginForm);
export default MyEnhancedForm;