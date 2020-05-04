import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, FormGroup, Label } from 'reactstrap';
import { withFormik, ErrorMessage, Field } from 'formik';
import PasswordStrengthMeter from '../PasswordStrengthMeter';
import * as Yup from 'yup';

const ErrorInnerMessage = ({ name }) => (<ErrorMessage name={name} component={({ children }) => (
<span className="errorMsg">{children}</span>)} />);
const SignUp = props => {
  const {
    errors,
    values,
    touched,
    dirty,
    isSubmitting,
    handleSubmit
  } = props;
  return (
    <div className="mx-auto">
        <h3>Sign Up</h3>
        <Form className="text-left" onSubmit={handleSubmit}>
            <FormGroup className="form-group">
                <Label for="First name">Firstname</Label>
                <Field type="text" name="firstname" className="form-control" autoComplete="firstname" placeholder="Enter firstname" />
                {(touched.firstname && errors.firstname) ? <ErrorInnerMessage name="firstname" /> : null}
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="Last name">Lastname</Label>
                <Field type="text" name="lastname" className="form-control" autoComplete="lastname" placeholder="Enter lastname" valid={dirty && !errors.lastname} invalid={touched.lastname && !!errors.lastname} />
                {(touched.lastname && errors.lastname) ? <ErrorInnerMessage name="lastname" /> : null}
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="emailAddress">EmailAddress</Label>
                <Field type="email" name="emailAddress" className="form-control" autoComplete="emailAddress" placeholder="Enter emailAddress" valid={dirty && !errors.emailAddress} invalid={touched.emailAddress && !!errors.emailAddress} />
                {(touched.emailAddress && errors.emailAddress) ? <ErrorInnerMessage name="emailAddress" /> : null}
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="password">Password</Label>
                <Field type="password" name="password" className="form-control" autoComplete="password" placeholder="Enter password" valid={dirty && !errors.password} invalid={touched.password && !!errors.password} />
                <ErrorInnerMessage name="password" />
                <PasswordStrengthMeter password={values.password} />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="confirmPassword">Confirm Password</Label>
                <Field type="password" name="confirmPassword" className="form-control" autoComplete="confirmPassword" placeholder="Enter confirmPassword" valid={dirty && !errors.confirmPassword} invalid={touched.confirmPassword && !!errors.confirmPassword} />
                <ErrorInnerMessage name="confirmPassword" />
            </FormGroup>
            <Button type="submit" className="btn-block" color="primary" disabled={!dirty || isSubmitting}>Confirm</Button>
        </Form>
        <p className="text-right">Already registered <Link to="/">sign in?</Link></p>
    </div>
    );
};
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
    handleSubmit: (values, { props }) => {
        props.history.push({
            pathname: '/signup-confirm',
            state: { firstname: values.firstname, lastname: values.lastname, emailAddress: values.emailAddress, password: values.password}
        })
    },
})(SignUp);
export default MyEnhancedForm;