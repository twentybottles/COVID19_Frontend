import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label } from 'reactstrap';
import { withFormik, ErrorMessage, Field } from 'formik';
//import PasswordStrengthMeter from '../PasswordStrengthMeter.js';
import * as Yup from 'yup';

const ErrorInnerMessage = ({ name }) => (<ErrorMessage name={name} component={({ children }) => (
<span className="errorMsg">{children}</span>)} />);
const Login = props => {
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
        <h3>Sign In</h3>
        <Form className="text-left" onSubmit={handleSubmit}>
            <FormGroup className="form-group">
                <Label for="myUsername">Username</Label>
                <Field type="email" name="myUsername" className="form-control" autoComplete="email" placeholder="Enter email" />
                {(touched.myUsername && errors.myUsername) ? <ErrorInnerMessage name="myUsername" /> : null}                
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="myPassword">Password</Label>
                <Field type="password" name="myPassword" className="form-control" placeholder="Enter password" />
                <ErrorInnerMessage name="myPassword" />
            </FormGroup>
            <FormGroup className="form-group">
                <Field type="checkbox" name="isRememberMe" checked={values.isRememberMe} />
                <Label for="autoLogin" className="ml-2">Remember me</Label>
            </FormGroup>
            <Button type="submit" className="btn-block" color="primary">Submit</Button>
        </Form>
        <p className="text-right"><Link to="/forgot-password">Forgot password</Link></p>
    </div>
  );
};
const MyEnhancedForm = withFormik({
    mapPropsToValues: props => ({myUsername: localStorage.getItem('MY_USERNAME'), 
                                 myPassword: localStorage.getItem('MY_PASSWORD'), 
                                 isRememberMe: localStorage.getItem('IsRememberMe')}),
    validationSchema: Yup.object().shape({
        myUsername: Yup.string().min(10, 'Username is too short')
                                .max(30, 'Username is too long')
                                .required('Username is required'),
        myPassword: Yup.string().min(8, 'myPassword is too short')
                                .max(10, 'myPassword is too long')
                                .required('myPassword is required')
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        if(values.isRememberMe) {
            localStorage.setItem('MY_USERNAME', values.myUsername);
            localStorage.setItem('MY_PASSWORD', values.myPassword);
            localStorage.setItem('IsRememberMe', true);
        } else {
            localStorage.setItem('MY_USERNAME', '');
            localStorage.setItem('MY_PASSWORD', '');
            localStorage.setItem('IsRememberMe', false);
        }
        setSubmitting(false);
        // fetch('http://example.com',{
        //     method: "POST",
        //     body: JSON.stringify(userData),
        //     headers: {
        //       'Accept': 'application/json',
        //       'Content-Type': 'application/json'
        //     },
        // }).then(response => {
        //     response.json().then(data =>{
        //       console.log("Successful" + data);
        //     })
        // });
        props.history.push({
            pathname: '/mypage',
            state: { myUsername: values.myUsername, myPassword: values.myPassword}
        })
    },
})(Login);
export default MyEnhancedForm;