import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, FormGroup, Label } from 'reactstrap';
import { withFormik, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';

const SignUp = props => {
  const {
    handleSubmit,
  } = props;
  return (
    <div className="mx-auto">
        <h3>Sign Up</h3>
        <Form className="text-left" onSubmit={handleSubmit}>
            <FormGroup className="form-group">
                <Label for="First name">Firstname</Label>
                <Field type="text" name="firstname" className="form-control" autoComplete="firstname" placeholder="Enter firstname" />
                <ErrorMessage name="firstname" />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="Last name">Lastname</Label>
                <Field type="text" name="lastname" className="form-control" autoComplete="lastname" placeholder="Enter lastname" />
                <ErrorMessage name="lastname" />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="emailAddress">EmailAddress</Label>
                <Field type="email" name="emailAddress" className="form-control" autoComplete="emailAddress" placeholder="Enter emailAddress" />
                <ErrorMessage name="emailAddress" />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="password">Password</Label>
                <Field type="text" name="password" className="form-control" autoComplete="password" placeholder="Enter password" />
                <ErrorMessage name="password" />
            </FormGroup>
            <Button type="submit" className="btn-block" color="primary" >Confirm</Button>
        </Form>
        <p className="text-right">Already registered <Link to="/">sign in?</Link></p>
    </div>
    );
};
const MyEnhancedForm = withFormik({
    mapPropsToValues: props => ({firstname: '', lastname: '', emailAddress: '', password: ''}),
    validationSchema: Yup.object().shape({
        firstname: Yup.string().min(1, 'firstname is too short')
                                .max(10, 'firstname is too long')
                                .required('firstname is required'),
        lastname: Yup.string().min(1, 'lastname is too short')
                                .max(10, 'lastname is too long')
                                .required('lastname is required'),
        emailAddress: Yup.string().min(10, 'emailAddress is too short')
                                .max(30, 'emailAddress is too long')
                                .required('emailAddress is required'),                                
        password: Yup.string().min(8, 'password is too short')
                                .max(10, 'password is too long')
                                .required('password is required')
    }),
    handleSubmit: (values, { props }) => {
        props.history.push({
            pathname: '/signup-confirm',
            state: { firstname: values.firstname, lastname: values.lastname, emailAddress: values.emailAddress, password: values.password}
        })
    },
})(SignUp);
export default MyEnhancedForm;