import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label } from 'reactstrap';
import { withFormik, ErrorMessage, Field } from 'formik';
import PasswordStrengthMeter from '../util/passwordStrengthMeter';
import * as Yup from 'yup';

class SettingPasswordView extends Component {
    
    render() {

        const {values, errors, touched, dirty, isSubmitting, handleSubmit} = this.props;
    
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

        let urlParamStr = window.location.search;
        let params = {}

        if (urlParamStr) {

            urlParamStr = urlParamStr.substring(1)
            urlParamStr.split('&').forEach( param => {
              const temp = param.split('=')
              params = {
                  ...params,
                  [temp[0]]: temp[1]
              }
            })
        }

        var token = params.token;
        
        setSubmitting(false);
        
        fetch('http://localhost:8080/password/register', {
            method: 'POST',
            mode: 'cors',
            // cache: "no-cache",
            // credentials: "include",
            // headers: {
            //     "Content-Type": "application/json; charset=utf-8",
            //     'X-XSRF-TOKEN': Cookie.get('XSRF-TOKEN')
            // },
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body : values.password, token
        })
        .then(response => response.json())
        .then(function(result) {
            props.history.push({pathname: '/setting-password-complete'})
        })
        .catch(error => console.error('Error:', error));
        
    },
})(SettingPasswordView);

export default MyEnhancedForm;