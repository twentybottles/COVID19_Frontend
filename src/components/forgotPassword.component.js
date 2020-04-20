import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input as ReactstrapInput, FormFeedback } from 'reactstrap';
import { withFormik, ErrorMessage, Field } from 'formik';
import * as yup from 'yup';

const Input = ({ name, ...others }) => (
    <Field name={name} render={({ field }) => <ReactstrapInput {...field} {...others} />}/>);
const ErrorFormFeedback = ({ name }) => (
    <ErrorMessage name={name} component={({ children }) => <FormFeedback>{children}</FormFeedback>}/>);
const ForgotPassword = ({handleSubmit, handleReset, isSubmitting, dirty, errors, touched, history}) => (
    <div className="mx-auto">
        <h3>Forgot Password</h3>
        <Form className="text-left" onSubmit={handleSubmit}>
            <FormGroup className="form-group">
                <Label for="MyEmailAddress">Email</Label>
                <Input type="MyEmailAddress" className="form-control" id="MyEmailAddress" name="MyEmailAddress" placeholder="Enter email"/>
                <ErrorFormFeedback name="email" />
            </FormGroup>
            <Button type="submit" className="btn-block" color="primary" disabled={isSubmitting}>Submit</Button>
        </Form>
      <p className="text-right"><Link to="/">Back</Link></p>
    </div>
);

const MyEnhancedForm = withFormik({
    mapPropsToValues: () => ({MyEmailAddress: ''}),
    handleSubmit: (values, { setSubmitting }) => {
        setTimeout(() => {alert(JSON.stringify(values, null, 2));setSubmitting(false);}, 3000);
        console.log('SUBMIT:', values);
    },
    validationSchema: yup.object().shape({
        MyEmailAddress: yup.string().min(3, 'A email must contain more than 3 characters').required('Enter a username'),
    }),
})(ForgotPassword);
export default MyEnhancedForm;