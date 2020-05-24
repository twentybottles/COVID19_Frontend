import React, { useState } from 'react';
import { withFormik, ErrorMessage, Field } from 'formik';
import { Form, Button, FormGroup, Label, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import * as Yup from 'yup';
import PasswordStrengthMeter from '../util/passwordStrengthMeter';

const ProfileModal = (props) => {

  const {errors, values, dirty, touched, isSubmitting, handleSubmit} = props;

  const ErrorInnerMessage = ({ name }) => (<ErrorMessage name={name} component={({ children }) => (<span className="errorMsg">{children}</span>)} />);

  const [item, setItem] = useState(props.member);

  const [modal, setModal] = useState(false);

  const toggle = () => {setModal(!modal);}

  const handleInputChange = (e) => {

  	setItem({[e.target.name]: e.target.value});
    props.values[e.target.name] = e.target.value;

  }

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
                          <Field type="text" name="firstname" className="form-control" defaultValue={item.firstname} onChange={(e) => {handleInputChange(e)}} />
                          {(touched && errors.firstname) ? <ErrorInnerMessage name="firstname" /> : null}
                      </FormGroup>
                      <FormGroup className="form-group">
                          <Label for="Last name">Lastname</Label>
                          <Field type="text" name="lastname" className="form-control" defaultValue={item.lastname} onChange={(e) => {handleInputChange(e)}} />
                          {(touched && errors.lastname) ? <ErrorInnerMessage name="lastname" /> : null}
                      </FormGroup>
                      <FormGroup className="form-group">
                          <Label for="myUsername">EmailAddress</Label>
                          <Field type="email" name="myUsername" className="form-control" defaultValue={item.myUsername} onChange={(e) => {handleInputChange(e)}} />
                          {(touched && errors.myUsername) ? <ErrorInnerMessage name="myUsername" /> : null}
                      </FormGroup>
                      <FormGroup className="form-group">
                          <Label for="password">Password</Label>
                          <Field type="text" name="password" className="form-control" disabled={true} />
                          {(touched && errors.password) ? <ErrorInnerMessage name="password" /> : null}
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
  mapPropsToValues: props => ({password:props.member.myPassword, newPassword: '', confirmPassword: ''}),
  validationSchema: Yup.object().shape({
      firstname: Yup.string().min(1, 'firstname is too short')
                             .max(10, 'firstname is too long'),
      lastname: Yup.string().min(1, 'lastname is too short')
                            .max(10, 'lastname is too long'),
      myUsername: Yup.string().min(10, 'emailAddress is too short')
                                .max(30, 'emailAddress is too long'),
      password: Yup.string().min(8, 'password is too short'),                                
      newPassword: Yup.string().min(8, 'newPassword is too short')
                               .test('not unique','NewPassword is already used', function(value) {
                                return this.parent.password !== value;
                              }),
      confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'NewPassword must match')
  }),

  handleSubmit: (values, { setErrors, props, setSubmitting }) => {

      setSubmitting(false);

      fetch('http://localhost:8080/signupRegister', {
          method: 'POST',
          mode: 'cors',
          // cache: "no-cache",
          // credentials: "same-origin",
          // headers: {
          //     "Content-Type": "application/json; charset=utf-8",
          //     'X-XSRF-TOKEN': Cookie.get('XSRF-TOKEN')
          // },
          headers: {
              "Content-Type": "application/json; charset=utf-8"
          },
          body : JSON.stringify({
              id : props.member.id,
              firstname: values.firstname === undefined ? props.member.firstname: values.firstname,
              lastname: values.lastname === undefined ? props.member.lastname: values.lastname,
              emailAddress: values.emailAddress === undefined ? props.member.myUsername: values.emailAddress ,
              password: values.newPassword === "" ? props.member.myPassword: values.newPassword 
           }),

      })
      .then(response => response.json())
      .then(function(result) {
          if (result) {
              alert("Your Profile was updated");
              window.location.reload();
          }
      })
      .catch(error => console.error('Error:', error));

  },
})(ProfileModal);

export default MyEnhancedForm;