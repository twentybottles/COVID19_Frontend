import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label } from 'reactstrap';
import { withFormik, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class LoginView extends Component {

    static propTypes = {cookies: instanceOf(Cookies).isRequired};

    constructor(props) {

        super(props);

        fetch('http://localhost:8080/preLogin', {
            method: 'POST',
            mode: 'cors',
            cache: "no-cache",
            credentials: "include",
            headers: {"Content-Type": "application/json; charset=utf-8"}
        })
        .then(response => response.json())
        .then(function(result) {
            if (!result) {
                throw new Error('Network response was not ok.');
            }
        })
        .catch(error => console.error('Error:', error));


    }

    render() {

        const {errors, touched, dirty, isSubmitting, handleSubmit} = this.props;

        return (
            <div className="auth-inner">
                <h1>Sign In</h1>
                <Form className="text-left" onSubmit={handleSubmit}>
                    <FormGroup className="form-group">
                        <Label for="myUsername">Username</Label>
                        <Field type="email" name="myUsername" className="form-control" autoComplete="email" placeholder="Enter email" />
                        {(touched.myUsername && errors.myUsername) ? <ErrorInnerMessage name="myUsername" /> : null}
                    </FormGroup>
                    <FormGroup className="form-group mb-3">
                        <Label for="myPassword">Password</Label>
                        <Field type="password" name="myPassword" className="form-control" placeholder="Enter password" />
                        <ErrorInnerMessage name="myPassword" />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <ErrorInnerMessage className="" name="authentication" />
                    </FormGroup>
                    <Button type="submit" className="btn-block" color="primary" disabled={!dirty || isSubmitting}>Submit</Button>
                </Form>
                <p className="text-right"><Link to="/forgot-password">Forgot password</Link></p>
            </div>
        );

    }

}

const ErrorInnerMessage = ({ name }) => (<ErrorMessage name={name} component={({ children }) => (<span className="errorMsg">{children}</span>)} />);

const MyEnhancedForm = withFormik({

    mapPropsToValues: props => ({myUsername: '', myPassword: '', authentication: ''}),

    validationSchema: Yup.object().shape({
        myUsername: Yup.string().min(10, 'Username is too short')
                                .max(30, 'Username is too long')
                                .required('Username is required'),
        myPassword: Yup.string().min(8, 'myPassword is too short')
                                .required('myPassword is required')
    }),

    handleSubmit: (values, { setErrors, props, setSubmitting }) => {

        setSubmitting(false);

        fetch('http://localhost:8080/authentication', {
            method: 'POST',
            mode: 'cors',
            cache: "no-cache",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "X-XSRF-TOKEN": props.cookies.get('XSRF-TOKEN')
            },
            body : JSON.stringify({ username: values.myUsername, password: values.myPassword}),
        })
        .then(response => response.ok? props.history.push({pathname: '/mypage'}) : setErrors({ authentication : 'Either Username or Password is invalid' }))
        .catch(error => console.error('Error:', error));

    },
    
})(LoginView);

export default withCookies(MyEnhancedForm);