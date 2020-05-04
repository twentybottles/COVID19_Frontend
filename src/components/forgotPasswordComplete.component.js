import React from 'react'
import { Button, Form } from 'reactstrap';
import { withFormik } from 'formik';

const ForgotPasswordComplete = props => {const {handleSubmit} = props;
  return (
    <div className="mx-auto">
        <Form className="text-left" onSubmit={handleSubmit}>
            <h5 className="text-center mb-5">Your message has been sent</h5>
            <Button type="submit" className="btn-block" color="primary">Top</Button>
        </Form>
    </div>
  );
};
const MyEnhancedForm = withFormik({
    handleSubmit: props => {
        props.history.push({pathname: '/'})
    },
})(ForgotPasswordComplete);
export default MyEnhancedForm;