import React from 'react'
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom'
import { Button, Form, FormGroup, FormText, Label, Input as ReactstrapInput, FormFeedback } from 'reactstrap';
import { withFormik, ErrorMessage, Field } from 'formik';
import * as yup from 'yup';

const Input = ({ name, ...others }) => (
    <Field name={name} render={({ field }) => <ReactstrapInput {...field} {...others} />}/>);
const ConfirmSignUp = ({handleSubmit, handleReset, isSubmitting, dirty, errors, touched, history}) => (
    <div className="mx-auto">
        <h3>Sign Up</h3>
        <Form className="text-left" onSubmit={handleSubmit}>
            <FormGroup className="form-group">
                <Label for="First name">Firstname</Label>
                <input type="text" className="form-control" id="Firstname" name="Firstname" placeholder="First name" />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="Last name">Lastname</Label>
                <input type="text" className="form-control" id="Lastname" name="Lastname" placeholder="Last name" />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="myUsername">Username</Label>
                <Input type="email" className="form-control" id="myUsername" name="email" placeholder="Enter email" />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="myPassword">Password</Label>
                <input autoComplete="off" type="password" className="form-control" name="password" id="myPassword" />
            </FormGroup>
            <Button type="submit" className="btn-block" color="primary" disabled={isSubmitting}>Confirm</Button>
        </Form>
    </div>
);

const MyEnhancedForm = withFormik({
    mapPropsToValues: () => ({email: '', password: ''}),
    handleSubmit: (values, { setSubmitting }) => {
        setTimeout(() => {alert(JSON.stringify(values, null, 2));setSubmitting(false);}, 3000);
        console.log('SUBMIT:', values);
    },
})(ConfirmSignUp);
export default MyEnhancedForm;