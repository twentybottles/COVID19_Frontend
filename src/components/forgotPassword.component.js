import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label } from 'reactstrap';
import { withFormik, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';

const ErrorInnerMessage = ({ name }) => (<ErrorMessage name={name} component={({ children }) => (
<span className="errorMsg">{children}</span>)} />);
const ForgotPassword = props => {
  const {
    errors,
    values,
    touched,
    dirty,
    isSubmitting,
    handleSubmit
  } = props;
  return (
    <div className="mx-auto">
        <h3>Forgot Password</h3>
        <Form className="text-left" onSubmit={handleSubmit}>
            <FormGroup className="form-group">
                <Label for="MyEmailAddress">Email</Label>
                <ErrorMessage name="myEmailAddress" />
                <Field type="email" name="myEmailAddress" className="form-control" autoComplete="email" placeholder="Enter Your EmailAddress" valid={dirty && !errors.myEmailAddress} invalid={touched.myEmailAddress && !!errors.myEmailAddress} />
                {(touched.myEmailAddress && errors.myEmailAddress) ? <ErrorInnerMessage name="myEmailAddress" /> : null}                
            </FormGroup>
            <Button type="submit" className="btn-block" color="primary" disabled={!dirty || isSubmitting}>Submit</Button>
        </Form>
      <p className="text-right"><Link to="/">Back</Link></p>
    </div>
  );
};
const MyEnhancedForm = withFormik({
    mapPropsToValues: props => ({myEmailAddress: ''}),
    validationSchema: Yup.object().shape({
        myEmailAddress: Yup.string().min(10, 'Username is too short')
                                    .max(30, 'Username is too long')
                                    .required('Username is required')
    }),
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
        props.history.push({
            pathname: '/forgot-password-complete'
        })
    },
})(ForgotPassword);
export default MyEnhancedForm;