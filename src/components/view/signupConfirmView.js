import React, { Component } from 'react';
import { Button, Form, FormGroup, Label } from 'reactstrap';
import { withFormik } from 'formik';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class SignUpConfirmView extends Component {

    static propTypes = {cookies: instanceOf(Cookies).isRequired};

    render() {

        const {values, handleSubmit} = this.props;

        return (
            <div className="auth-inner">
                <h1>SignUp Confirm</h1>
                <Form className="text-left" onSubmit={handleSubmit}>
                    <FormGroup className="form-group">
                        <Label for="firstname">First Name</Label>
                        <p className="text-left">{values.location.state.firstname}</p>
                    </FormGroup>
                    <FormGroup className="form-group">
                        <Label for="lastname">Last Name</Label>
                        <p className="text-left">{values.location.state.lastname}</p>
                    </FormGroup>
                    <FormGroup className="form-group">
                        <Label for="myUsername">Username</Label>
                        <p className="text-left">{values.location.state.emailAddress}</p>
                    </FormGroup>
                    <FormGroup className="form-group">
                        <Label for="password">Password</Label>
                        <p className="text-left">{values.location.state.password.replace(/./g, '*')}</p>
                    </FormGroup>
                    <Button className="btn-block" color="secondary" onClick={() => this.props.history.goBack()}>Back</Button>
                    <Button type="submit" className="btn-block" color="primary">Submit</Button>
                </Form>
            </div>
        );

    }

}

const MyEnhancedForm = withFormik({

    handleSubmit: (values, { props }) => {    
        
        fetch('/api/signup/register', {
            method: 'POST',
            mode: 'cors',
            cache: "no-cache",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "X-XSRF-TOKEN": props.cookies.get('XSRF-TOKEN')
            },
            body : JSON.stringify({ 
                username: values.location.state.emailAddress,
                firstname: values.location.state.firstname,
                lastname: values.location.state.lastname,
                password: values.location.state.password
             }),

        })
        .then(response => response.json())
        .then(function(result) {
            if (result) {
                props.history.push({ pathname: '/signup-complete' });
            }
        })
        .catch(error => console.error('Error:', error));

    },
    
})(SignUpConfirmView);

export default withCookies(MyEnhancedForm);