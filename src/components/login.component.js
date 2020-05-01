import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label } from 'reactstrap';
import { withFormik, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';

const Login = props => {
  const {
    values,
    handleSubmit,
  } = props;
  return (
    <div className="mx-auto">
        <h3>Sign In</h3>
        <Form className="text-left" onSubmit={handleSubmit}>
            <FormGroup className="form-group">
                <Label for="myUsername">Username</Label>
                <Field type="email" name="myUsername" className="form-control" autoComplete="email" placeholder="Enter email" />
                <ErrorMessage name="myUsername" />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="myPassword">Password</Label>
                <Field type="password" name="myPassword" className="form-control" placeholder="Enter password" />
                <ErrorMessage name="myPassword" />
            </FormGroup>
            <FormGroup className="form-group">
                <Field type="checkbox" name="isAutoLogin" checked={values.isAutoLogin} />
                <Label for="autoLogin" className="ml-2">Remember me</Label>
            </FormGroup>
            <Button type="submit" className="btn-block" color="primary">Submit</Button>
        </Form>
        <p className="text-right"><Link to="/forgot-password">Forgot password</Link></p>
    </div>
  );
};
const MyEnhancedForm = withFormik({
    mapPropsToValues: props => ({myUsername: '', myPassword: '', isAutoLogin: false}),
    validationSchema: Yup.object().shape({
        myUsername: Yup.string().min(10, 'Username is too short')
                                .max(30, 'Username is too long')
                                .required('Username is required'),
        myPassword: Yup.string().min(8, 'myPassword is too short')
                                .max(10, 'myPassword is too long')
                                .required('myPassword is required')
    }),
    handleSubmit: (values, { props }) => {
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