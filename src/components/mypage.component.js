import React, { Component } from 'react';
import { Button, Form, FormGroup, Label } from 'reactstrap';
import { withFormik, ErrorMessage, Field } from 'formik';
import * as yup from 'yup';

class Mypage extends Component {

    // constructor(props) {
    //     super(props);
    // }

    render() {

        const {errors, values, touched, dirty, isSubmitting, handleSubmit} = this.props;

        return (
            <div className="auth-inner-large">
                <h3>Mypage</h3>
                    <FormGroup className="form-group">
                        <Label for="newConfirmed">NewConfirmed</Label>
                        <p className="text-left">{}</p>
                    </FormGroup>
                <Form className="text-left" onSubmit={handleSubmit}>
                    <FormGroup className="">
                        <Label for="information">COIVD19 Information</Label>
                        <ErrorInnerMessage className="" name="information" />
                    </FormGroup>
                    <Button type="submit" className="btn-block" color="primary">Search</Button>
                </Form>
            </div>
        );

    }

}

const ErrorInnerMessage = ({ name }) => (<ErrorMessage name={name} component={({ children }) => (<span className="errorMsg">{children}</span>)} />);

const MyEnhancedForm = withFormik({
    // enableReinitialize: true,
    mapPropsToValues: () => ({firstname: "aaa"}),
    handleSubmit: (values, { setErrors, props, setSubmitting }) => {

        setSubmitting(false);

    },
})(Mypage);
export default MyEnhancedForm;

function searchCovidSummary() {

    fetch('http://localhost:8080/searchCovidSummary', {
        method: 'GET',
        mode: 'cors',
        cache: "force-cache",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
    })
    .then(response => response.json())
    .catch(error => console.error('Error:サーバーが混み合っています', error));

}