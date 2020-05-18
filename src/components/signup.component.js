import React, { Component } from 'react';
import { Button, Form, FormGroup, Label } from 'reactstrap';
import { withFormik, ErrorMessage, Field } from 'formik';
import PasswordStrengthMeter from '../PasswordStrengthMeter';
import * as Yup from 'yup';

class SignUp extends Component {

    render() {

        const {errors, values, touched, dirty, isSubmitting, handleSubmit} = this.props;

        return (
            <div className="auth-inner">
                <h1>Sign Up</h1>
                <Form className="text-left" onSubmit={handleSubmit}>
                    <FormGroup className="form-group">
                        <Label for="First name">Firstname</Label>
                        <Field type="text" name="firstname" className="form-control" autoComplete="firstname" placeholder="Enter firstname" />
                        {(touched.firstname && errors.firstname) ? <ErrorInnerMessage name="firstname" /> : null}
                    </FormGroup>
                    <FormGroup className="form-group">
                        <Label for="Last name">Lastname</Label>
                        <Field type="text" name="lastname" className="form-control" autoComplete="lastname" placeholder="Enter lastname" />
                        {(touched.lastname && errors.lastname) ? <ErrorInnerMessage name="lastname" /> : null}
                    </FormGroup>
                    <FormGroup className="form-group">
                        <Label for="emailAddress">EmailAddress</Label>
                        <Field type="email" name="emailAddress" className="form-control" autoComplete="emailAddress" placeholder="Enter emailAddress" />
                        {(touched.emailAddress && errors.emailAddress) ? <ErrorInnerMessage name="emailAddress" /> : null}
                    </FormGroup>
                    <FormGroup className="form-group">
                        <Label for="password">Password</Label>
                        <Field type="password" name="password" className="form-control" autoComplete="password" placeholder="Enter password" />
                        <ErrorInnerMessage name="password" />
                        <PasswordStrengthMeter password={values.password} />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <Label for="confirmPassword">Confirm Password</Label>
                        <Field type="password" name="confirmPassword" className="form-control" autoComplete="confirmPassword" placeholder="Enter confirmPassword" />
                        <ErrorInnerMessage name="confirmPassword" />
                    </FormGroup>
                    <Button type="submit" className="btn-block" color="primary" disabled={!dirty || isSubmitting}>Confirm</Button>
                </Form>
            </div>
        );

    }

}

const ErrorInnerMessage = ({ name }) => (<ErrorMessage name={name} component={({ children }) => (<span className="errorMsg">{children}</span>)} />);

const MyEnhancedForm = withFormik({
    mapPropsToValues: props => ({firstname: '', lastname: '', emailAddress: '', password: '', confirmPassword: ''}),
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
                                .required('password is required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
    }),
    handleSubmit: (values, { setErrors, setSubmitting, props }) => {
        
        setSubmitting(false);
        
        fetch('http://localhost:8080/signupSearch', {
            method: 'POST',
            mode: 'cors',
            // cache: "no-cache",
            // credentials: "same-origin",
            // headers: {
            //     "Content-Type": "application/json; charset=utf-8",
            //     'X-XSRF-TOKEN': Cookie.get('XSRF-TOKEN')
            // },
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body : values.emailAddress
        })
        .then(response => response.json())
        .then(function(result) {
            if (result) {
                return setErrors({ emailAddress : 'Email Address is already registered' });
            }
            props.history.push({
                pathname: '/signup-confirm',
                state: { firstname: values.firstname, lastname: values.lastname, emailAddress: values.emailAddress, password: values.password}
            })
        })
        .catch(error => console.error('Error:', error));
        
    },
})(SignUp);

export default MyEnhancedForm;