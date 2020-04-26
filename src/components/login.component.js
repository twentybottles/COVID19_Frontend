import React from 'react'
import { Link } from 'react-router-dom';
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
const Login = props => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;
  return (
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
            <Button type="submit" className="btn-block" color="primary">Submit</Button>
        </Form>
        <p className="text-right"><Link to="/forgot-password">Forgot password</Link></p>
    </div>
  );
};
const MyEnhancedForm = withFormik({
    mapPropsToValues: props => ({myUsername: '', myPassword: '', isAccepted: false}),

    validate: values => {
        const errors = {};
        if (!values.myUsername) {
            return errors.myUsername = 'Required';            
        }
    },

    handleSubmit: (values, { props, resetForm, setSubmitting }) => {

        setSubmitting(false);
        resetForm();
        props.history.push({
            pathname: '/mypage',
            search: '?query=abc',
            state: { myUsername: values.myUsername }
        })

        // setTimeout(() => {
        //   alert(JSON.stringify(values, null, 2));
        //   setSubmitting(false);
        // }, 1000);
    },
    
})(Login);
export default MyEnhancedForm;