import React, { Component } from 'react';
import { Button, Form } from 'reactstrap';
import { withFormik } from 'formik';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class ForgotPasswordCompleteView extends Component {

    static propTypes = {cookies: instanceOf(Cookies).isRequired};

    constructor(props) {

        super(props);

        if (props.location.state === undefined || props.location.state.emailAddress === undefined) {return;}

        fetch('http://localhost:8080/sendMail/password', {
            method: 'POST',
            mode: 'cors',
            cache: "no-cache",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "X-XSRF-TOKEN": props.cookies.get('XSRF-TOKEN')
            },
            body : props.location.state.emailAddress
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

        const {handleSubmit} = this.props;

        return (
            <div className="auth-inner">
                <Form className="text-left" onSubmit={handleSubmit}>
                    <h5 className="text-center mb-5">Your message has been sent</h5>
                    <Button type="submit" className="btn-block" color="primary">Top</Button>
                </Form>
            </div>
        );

    }

}

const MyEnhancedForm = withFormik({

    handleSubmit: props => {props.history.push({pathname: '/'})},
    
})(ForgotPasswordCompleteView);

export default withCookies(MyEnhancedForm);