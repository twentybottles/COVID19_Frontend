import React from 'react'
import { Button, Form, FormGroup, Label } from 'reactstrap';
import { withFormik, ErrorMessage, Field } from 'formik';
import * as yup from 'yup';

const ErrorInnerMessage = ({ name }) => (<ErrorMessage name={name} component={({ children }) => (<span className="errorMsg">{children}</span>)} />);
const Mypage = props => {const {values, touched, errors, handleChange, handleSubmit} = props;
    
    searchCovidSummary();

    return (
        <div className="auth-inner-large">
            <h3>Mypage</h3>
            <Form className="text-left" onSubmit={handleSubmit}>
                <FormGroup className="">
                    <Label for="information">COIVD19 Information</Label>
                    <ErrorInnerMessage className="" name="information" />
                </FormGroup>
                <Button type="submit" className="btn-block" color="primary">Search</Button>
            </Form>
        </div>
    );
};
const MyEnhancedForm = withFormik({
    handleSubmit: (values, { setErrors, props, setSubmitting }) => {

        setSubmitting(false);

    },
})(Mypage);
export default MyEnhancedForm;

function searchCovidSummary() {

        fetch('http://localhost:8080/searchCovidSummary', {
            method: 'GET',
            mode: 'cors',
            // cache: "no-cache",
            credentials: "same-origin",
            // headers: {
            //     "Content-Type": "application/json; charset=utf-8",
            //     'X-XSRF-TOKEN': Cookie.get('XSRF-TOKEN')
            // },
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            // body : JSON.stringify({ 
            //     myUsername: "",
            //     myPassword: ""
            //  }),

        })
        .then(response => response.json())
        .then(function(response) {
            console.log(response.Global);
            console.log(response.Countries[0]);
            console.log(response.Date);
        })
        .catch(error => console.error('Error:サーバーが混み合っています', error));

}