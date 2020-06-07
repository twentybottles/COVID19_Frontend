import React, { useState } from 'react';
import { withFormik, ErrorMessage, Field } from 'formik';
import { Form, Button, FormGroup, Label, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import * as Yup from 'yup';
import PasswordStrengthMeter from '../util/passwordStrengthMeter';
import { withCookies } from 'react-cookie';

const ProfileModal = (props) => {

  const {errors, values, dirty, touched, isSubmitting, handleSubmit} = props;

  const ErrorInnerMessage = ({ name }) => (<ErrorMessage name={name} component={({ children }) => (<span className="errorMsg">{children}</span>)} />);

  const [modal, setModal] = useState(false);

  const toggle = () => {setModal(!modal);}

  return (
    <div>
      <Form className="text-left" onSubmit={handleSubmit}>
        <span onClick={toggle} className="dropdownMenu">Profile</span>
        <Modal isOpen={modal} toggle={toggle} className="modal-lg">
          <ModalHeader toggle={toggle}>Please update your infomation</ModalHeader>
          <ModalBody>
                <div className="auth-inner">
                  <Form className="text-left" onSubmit={handleSubmit}>
                      <FormGroup className="form-group">
                          <Label for="First name">Firstname</Label>
                          <Field type="text" name="firstname" className="form-control" />
                          {(touched && errors.firstname) ? <ErrorInnerMessage name="firstname" /> : null}
                      </FormGroup>
                      <FormGroup className="form-group">
                          <Label for="Last name">Lastname</Label>
                          <Field type="text" name="lastname" className="form-control" />
                          {(touched && errors.lastname) ? <ErrorInnerMessage name="lastname" /> : null}
                      </FormGroup>
                      <FormGroup className="form-group">
                          <Label for="emailAddress">EmailAddress</Label>
                          <Field type="email" name="emailAddress" className="form-control" />
                          {(touched && errors.emailAddress) ? <ErrorInnerMessage name="emailAddress" /> : null}
                      </FormGroup>
                      <FormGroup className="form-group">
                          <Label for="newPassword">NewPassword</Label>
                          <Field id="newPassword" type="password" name="newPassword" className="form-control" placeholder="Enter newPassword" />
                          <ErrorInnerMessage name="newPassword" />
                          <PasswordStrengthMeter password={values.newPassword} />
                          {(touched && errors.newPassword) ? <ErrorInnerMessage name="password" /> : null}
                      </FormGroup>
                      <FormGroup className="form-group">
                          <Label for="confirmPassword">Confirm Password</Label>
                          <Field type="password" name="confirmPassword" className="form-control" placeholder="Enter confirmPassword" />
                          <ErrorInnerMessage name="confirmPassword" />
                      </FormGroup>
                      <Button type="submit" className="btn-block" color="primary" disabled={!dirty || isSubmitting}>Submit</Button>
                  </Form>
                </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggle}>Close</Button>
          </ModalFooter>
        </Modal>
      </Form>
    </div>
  );

}

const MyEnhancedForm = withFormik({

  mapPropsToValues: props => ({
    firstname: props.member.firstname, 
    lastname: props.member.lastname, 
    emailAddress: props.member.username,  
    newPassword: '', 
    confirmPassword: ''
  }),
  
  validationSchema: Yup.object().shape({
      firstname: Yup.string().min(1, 'firstname is too short')
                             .max(20, 'firstname is too long'),
      lastname: Yup.string().min(1, 'lastname is too short')
                            .max(20, 'lastname is too long'),
      emailAddress: Yup.string().min(10, 'emailAddress is too short')
                                .max(30, 'emailAddress is too long'),
      newPassword: Yup.string().min(8, 'newPassword is too short'),
      confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'NewPassword must match')
  }),

  handleSubmit: (values, { setErrors, props, setSubmitting }) => {

      setSubmitting(false);

      fetch('http://localhost:8080/signup/update', {
          method: 'POST',
          mode: 'cors',
          cache: "no-cache",
          credentials: 'include',
          headers: {
              "Content-Type": "application/json; charset=utf-8",
              "X-XSRF-TOKEN": props.cookies.get('XSRF-TOKEN')
          },
          body : JSON.stringify({
              id : props.member.id,
              firstname: values.firstname,
              lastname: values.lastname,
              username: values.emailAddress,
              password: values.newPassword === "" ? props.member.password: values.newPassword
           }),

      })
      .then(response => response.json())
      .then(function(result) {
          if (result) {
              alert("Your Profile was updated.Please signin again!!");
              window.location.reload();
          } else {
            setErrors({ emailAddress : 'Email Address is already registered' });
          }
      })
      .catch(error => console.error('Error:', error));

  },
  
})(ProfileModal);

export default withCookies(MyEnhancedForm);