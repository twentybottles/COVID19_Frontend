import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input as ReactstrapInput, FormFeedback } from 'reactstrap';
import { withFormik, ErrorMessage, Field } from 'formik';
import * as yup from 'yup';

const Input = ({ name, ...others }) => (
    <Field name={name} render={({ field }) => <ReactstrapInput {...field} {...others} />}/>);
const ErrorFormFeedback = ({ name }) => (
    <ErrorMessage name={name} component={({ children }) => <FormFeedback>{children}</FormFeedback>}/>);
const SignUp = ({handleSubmit, handleReset, isSubmitting, dirty, errors, touched, history}) => (
    <div className="mx-auto">
        <h3>Sign Up</h3>
        <Form className="text-left" onSubmit={handleSubmit}>
            <FormGroup className="form-group">
                <Label for="First name">Firstname</Label>
                <input type="text" className="form-control" id="Firstname" name="Firstname" placeholder="First name" />
                <ErrorFormFeedback name="Firstname" />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="Last name">Lastname</Label>
                <input type="text" className="form-control" id="Lastname" name="Lastname" placeholder="Last name" />
                <ErrorFormFeedback name="Lastname" />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="myUsername">Username</Label>
                <Input type="email" className="form-control" id="emailAddress" name="emailAddress" placeholder="Enter email" valid={dirty && !errors.emailAddress} invalid={touched.emailAddress && !!errors.emailAddress}/>
                <ErrorFormFeedback name="email" />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="password">Password</Label>
                <input autoComplete="off" type="password" className="form-control" name="password" id="password" placeholder="Enter password"/>
                <ErrorFormFeedback name="password" />
            </FormGroup>
            <Button type="submit" className="btn-block" color="primary" disabled={isSubmitting}>Confirm</Button>
        </Form>
        <p className="text-right">Already registered <Link to="/">sign in?</Link></p>
    </div>
);

const MyEnhancedForm = withFormik({
    mapPropsToValues: () => ({Firstname: '', Lastname: '', emailAddress: '', password: ''}),
    handleSubmit: (values, { setSubmitting }) => {
        setTimeout(() => {alert(JSON.stringify(values, null, 2));setSubmitting(false);}, 3000);
        console.log('SUBMIT:', values);
    },
    validationSchema: yup.object().shape({
        emailAddress: yup.string().min(3, 'A email must contain more than 3 characters').required('Enter a username'),
        password: yup.string().min(8, 'A password must contain more than 8 characters').required('Enter a password'),
    }),
})(SignUp);
export default MyEnhancedForm;