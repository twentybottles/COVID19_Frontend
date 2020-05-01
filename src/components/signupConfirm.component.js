import React from 'react'
import { Button, Form, FormGroup, Label } from 'reactstrap';
import { withFormik } from 'formik';

const SignUpConfirm = props => {
  const {
    values,
    handleSubmit,
  } = props;
  return (
    <div className="mx-auto">
        <h3>Sign Confirm</h3>
        <Form className="text-left" onSubmit={handleSubmit}>
            <FormGroup className="form-group">
                <Label for="firstname">First Name</Label>
                <p>{values.location.state.firstname}</p>
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="lastname">Last Name</Label>
                <p>{values.location.state.lastname}</p>
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="myUsername">Username</Label>
                <p>{values.location.state.emailAddress}</p>
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="password">Password</Label>
                <p>{values.location.state.password}</p>
            </FormGroup>
            <Button className="btn-block" color="secondary" onClick={() => props.history.goBack()}>Back</Button>
            <Button type="submit" className="btn-block" color="primary">Submit</Button>
        </Form>
    </div>
  );
};
const MyEnhancedForm = withFormik({
    handleSubmit: props => {
        props.history.push({
            pathname: '/signup-complete'
        })
    },
})(SignUpConfirm);
export default MyEnhancedForm;