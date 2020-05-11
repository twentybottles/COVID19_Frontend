import React from 'react'
import { Button, Form, FormGroup, Label } from 'reactstrap';
import { withFormik, Field } from 'formik';
import * as yup from 'yup';

const Mypage = props => {const {values, touched, errors, handleChange, handleSubmit} = props;
    return (
        <div className="aaa">
            <p>curl http://localhost:8080/signup -X POST</p>
        </div>

    );
};
const MyEnhancedForm = withFormik({
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
    },
})(Mypage);
export default MyEnhancedForm;