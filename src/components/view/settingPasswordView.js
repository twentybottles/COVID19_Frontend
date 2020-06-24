import React, { Component } from 'react';
import { } from 'react-router-dom';
import { Button, Form, FormGroup, Label } from 'reactstrap';
import { withFormik, ErrorMessage, Field } from 'formik';
import PasswordStrengthMeter from '../util/passwordStrengthMeter';
import * as Yup from 'yup';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class SettingPasswordView extends Component {

    static propTypes = {cookies: instanceOf(Cookies).isRequired};
    
    render() {

        const {values, dirty, isSubmitting, handleSubmit} = this.props;
    
        return (
            <div className="auth-inner">
                <h1>Setting Password</h1>
                <Form className="text-left" onSubmit={handleSubmit}>
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

    mapPropsToValues: props => ({password: '', confirmPassword: ''}),

    validationSchema: Yup.object().shape({                               
        password: Yup.string().min(8, 'password is too short')
                                .required('password is required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
    }),

    handleSubmit: (values, { setErrors, setSubmitting, props }) => {
        
        setSubmitting(false);
        
        fetch('http://3.20.220.91:8080/password/register', {
            method: 'POST',
            mode: 'cors',
            cache: "no-cache",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "X-XSRF-TOKEN": props.cookies.get('XSRF-TOKEN')
            },
            body: JSON.stringify({password: values.password, resetToken: props.qs.token})
        })
        .then(response => response.json())
        .then(function(result) {
            window.location.href = '/setting-password-complete';
        })
        .catch(error => console.error('Error:', error));
        
    },
    
})(SettingPasswordView);

export default withCookies(MyEnhancedForm);