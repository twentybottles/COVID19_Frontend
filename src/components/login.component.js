import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input as ReactstrapInput, FormFeedback } from 'reactstrap';
import { withFormik, ErrorMessage, Field } from 'formik';
import * as yup from 'yup';

const Input = ({ name, ...others }) => (
    <Field name={name} render={({ field }) => <ReactstrapInput {...field} {...others} />}/>);
const ErrorFormFeedback = ({ name }) => (
    <ErrorMessage name={name} component={({ children }) => <FormFeedback>{children}</FormFeedback>}/>);
const ErrorInnerMessage = ({ name }) => (
    <ErrorMessage name={name} component={({ children }) => (
        <span className="text-danger" style={{ fontSize: '1.2rem' }}>{children}</span>)}/>);
const Login = ({handleSubmit, handleReset, isSubmitting, dirty, errors, touched, history}) => (
    <div className="mx-auto">
        <h3>Sign In</h3>
        <Form className="text-left" onSubmit={handleSubmit}>
            <FormGroup className="form-group">
                <Label for="myUsername">Username</Label>
                <Input type="email" className="form-control" id="myUsername" name="myUsername" placeholder="Enter email" />
                <ErrorFormFeedback name="myUsername" />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="myPassword">Password</Label>
                <input type="password" className="form-control" name="myPassword" id="myPassword" placeholder="Enter password" />
                <ErrorFormFeedback name="myPassword" />
            </FormGroup>
            <FormGroup check className="form-group">
                <Input type="checkbox" name="isAccepted" id="myCheck" />
                <Label for="myCheck" check>Remember me</Label>
                <span className="ml-3"><ErrorInnerMessage name="isAccepted" /></span>
            </FormGroup>
            <Button type="submit" className="btn-block" color="primary" disabled={isSubmitting}>Submit</Button>
        </Form>
        <p className="text-right"><Link to="/forgot-password">Forgot password</Link></p>
    </div>
);

const MyEnhancedForm = withFormik({
    mapPropsToValues: () => ({myUsername: '', myPassword: '', isAccepted: false}),
    handleSubmit: (values, { setSubmitting }) => {
        setTimeout(() => {alert(JSON.stringify(values, null, 2));setSubmitting(false);}, 3000);
        console.log('SUBMIT:', values);
    },
    validationSchema: yup.object().shape({
        myUsername: yup.string().min(3, 'A Username must contain more than 3 characters').required('Enter a username'),
        myPassword: yup.string().min(8, 'A Password must contain more than 8 characters').required('Enter a password'),
    }),
})(Login);
export default MyEnhancedForm;