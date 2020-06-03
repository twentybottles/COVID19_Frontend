import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label } from 'reactstrap';
import { withFormik, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';

class ForgotPasswordView extends Component {
    
    render() {

        const {errors, touched, dirty, isSubmitting, handleSubmit} = this.props;
    
        return (
            <div className="auth-inner">
                <h1>Forgot Password</h1>
                <Form className="text-left" onSubmit={handleSubmit}>
                    <FormGroup className="form-group">
                        <Label for="emailAddress">EmailAddress</Label>
                        <Field type="email" name="emailAddress" className="form-control" autoComplete="emailAddress" placeholder="Enter emailAddress" />
                        {(touched.emailAddress && errors.emailAddress) ? <ErrorInnerMessage name="emailAddress" /> : null}
                    </FormGroup>
                    <Button type="submit" className="btn-block" color="primary" disabled={!dirty || isSubmitting}>Submit</Button>
                </Form>
                <p className="text-right"><Link to="/">Back</Link></p>
            </div>
        );

    }
};

const ErrorInnerMessage = ({ name }) => (<ErrorMessage name={name} component={({ children }) => (<span className="errorMsg">{children}</span>)} />);

const MyEnhancedForm = withFormik({
    mapPropsToValues: props => ({myEmailAddress: ''}),
    validationSchema: Yup.object().shape({
        emailAddress: Yup.string().min(10, 'emailAddress is too short')
                                  .max(30, 'emailAddress is too long')
                                  .required('emailAddress is required')
    }),
    handleSubmit: (values, { setErrors, setSubmitting, props }) => {
        
        setSubmitting(false);
        
        fetch('http://localhost:8080/sendMail/password', {
            method: 'POST',
            mode: 'cors',
            // cache: "no-cache",
            // credentials: "include",
            // headers: {
            //     "Content-Type": "application/json; charset=utf-8",
            //     'X-XSRF-TOKEN': Cookie.get('XSRF-TOKEN')
            // },
            headers: {"Content-Type": "application/json; charset=utf-8"},
            body : values.emailAddress
        })
        .then(response => response.json())
        .then(function(result) {
            if (result) {
                props.history.push({pathname:'/signup-complete'})
            }
            setErrors({ emailAddress : 'Email Address is not registered' });
        })
        .catch(error => console.error('Error:', error));
        
    },
})(ForgotPasswordView);

export default MyEnhancedForm;