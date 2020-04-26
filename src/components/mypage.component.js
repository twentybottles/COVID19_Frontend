import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input as ReactstrapInput, FormFeedback } from 'reactstrap';
import { withFormik, ErrorMessage, Field } from 'formik';
import * as yup from 'yup';

const Mypage = props => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
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
            <FormGroup check className="form-group">
                <Label for="myCheck" check>Remember me</Label>
            </FormGroup>
            <Button type="submit" className="btn-block" color="primary">Submit</Button>
        </Form>
        <p className="text-right"><Link to="/mypage">Forgot password</Link></p>
    </div>
  );
};
const MyEnhancedForm = withFormik({

    validate: values => {
        const errors = {};
        if (!values.myUsername) {
            return errors.myUsername = 'Required';            
        }
    },

    handleSubmit: (values, { props, resetForm, setSubmitting }) => {

        setSubmitting(false);
        resetForm();
        props.history.push('/forgot-password')
        // setTimeout(() => {
        //   alert(JSON.stringify(values, null, 2));
        //   setSubmitting(false);
        // }, 1000);
    },
    
})(Mypage);
export default MyEnhancedForm;