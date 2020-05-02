import React from 'react'
import { Button, Form, FormGroup, Label } from 'reactstrap';
import { withFormik, Field } from 'formik';
import * as yup from 'yup';

const Mypage = props => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit
  } = props;
  return (
    <div className="mx-auto">
        <h3>Mypage</h3>
        <Form className="text-left" onSubmit={handleSubmit}>
            <FormGroup className="form-group">
                <Label for="myUsername">menu</Label>
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="myPassword">{props.location.state.myUsername}</Label>
            </FormGroup>
            <Button type="submit" className="btn-block" color="primary">Search</Button>
        </Form>
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