import React, { useState, useEffect } from 'react';
import { withFormik, ErrorMessage, Field } from 'formik';
import PasswordStrengthMeter from '../util/passwordStrengthMeter';
import * as Yup from 'yup';
import { Form, Button, FormGroup, Label, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

const ProfileModal = (props) => {

  const {errors, values, touched, isSubmitting, handleSubmit} = props;

  const ErrorInnerMessage = ({ name }) => (<ErrorMessage name={name} component={({ children }) => (<span className="errorMsg">{children}</span>)} />);

  const toggle = () => {setModal(!modal);}

  const [modal, setModal] = useState(false);

  const [item, setItem] = useState({
    id: '',
    firstname: '',
    lastname: '',
    emailAddress: '',
    password: '',
    init: false
  });

  function handleInputChange(e) {

    const target = e.target;
    const targetName = target.name;
    setItem({[targetName]: e.target.value});
    props.values[targetName] = target.value;
    props.values.edited = true;

  }

  useEffect(() => {

  	if (item.init) {
      props.values.oldItem = item;
      props.values.id = item.id;
      props.values.password = item.password;
      return;
    }

    fetch('http://localhost:8080/loginSearchName?id=' + getIdFromUrl(), {
      method: 'GET',
      mode: 'cors',
      cache: "no-cache",
      headers: {
          "Content-Type": "application/json; charset=utf-8"
      }
    })
    .then(response => response.json())
    .then((json) => {
        setItem({
          id: json.id,
    			firstname: json.firstname,
    			lastname: json.lastname,
    			emailAddress: json.myUsername,
    			password: json.myPassword,
          init: true
        });
    })
    .catch(error => console.error('Error:サーバーが混み合っています', error));

  });

  return (
    <div>
      <Form className="text-left" onSubmit={handleSubmit}>

      <span onClick={toggle} className="">Profile</span>
      <Modal isOpen={modal} toggle={toggle} className="modal-lg">
        <ModalHeader toggle={toggle}>Please update your infomation</ModalHeader>
        <ModalBody>
              <div className="auth-inner">
                <Form className="text-left" onSubmit={handleSubmit}>
                    <FormGroup className="form-group">
                        <Label for="First name">Firstname</Label>
                        <Field type="text" name="firstname" className="form-control" defaultValue={item.firstname} onChange={(e) => { handleInputChange(e) }} />
                        {(touched && errors.firstname) ? <ErrorInnerMessage name="firstname" /> : null}
                    </FormGroup>
                    <FormGroup className="form-group">
                        <Label for="Last name">Lastname</Label>
                        <Field type="text" name="lastname" className="form-control" defaultValue={item.lastname} onChange={(e) => { handleInputChange(e) }} />
                        {(touched && errors.lastname) ? <ErrorInnerMessage name="lastname" /> : null}
                    </FormGroup>
                    <FormGroup className="form-group">
                        <Label for="emailAddress">EmailAddress</Label>
                        <Field type="email" name="emailAddress" className="form-control" defaultValue={item.emailAddress} onChange={(e) => { handleInputChange(e) }} />
                        {(touched && errors.emailAddress) ? <ErrorInnerMessage name="emailAddress" /> : null}
                    </FormGroup>
                    <FormGroup className="form-group">
                        <Label for="password">Password</Label>
                        <Field type="text" name="password" className="form-control" disabled={true} />
                        {(touched && errors.password) ? <ErrorInnerMessage name="password" /> : null}
                    </FormGroup>
                    <FormGroup className="form-group">
                        <Label for="newPassword">NewPassword</Label>
                        <Field id="newPassword" type="password" name="newPassword" className="form-control" placeholder="Enter newPassword" onChange={(e) => { handleInputChange(e) }}  />
                        <ErrorInnerMessage name="newPassword" />
                        <PasswordStrengthMeter password={values.newPassword} />
                        {(touched && errors.newPassword) ? <ErrorInnerMessage name="password" /> : null}
                    </FormGroup>
                    <FormGroup className="form-group">
                        <Label for="confirmPassword">Confirm Password</Label>
                        <Field type="password" name="confirmPassword" className="form-control" placeholder="Enter confirmPassword" onChange={(e) => { handleInputChange(e) }}  />
                        <ErrorInnerMessage name="confirmPassword" />
                    </FormGroup>
                    <Button type="submit" className="btn-block" color="primary" disabled={!props.values.edited || isSubmitting}>Submit</Button>
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

const getIdFromUrl = () => {

  let urlParamStr = window.location.search;
  let params = {}

  if (urlParamStr) {

    urlParamStr = urlParamStr.substring(1)
    urlParamStr.split('&').forEach( param => {
      const temp = param.split('=')
      params = {
        ...params,
        [temp[0]]: temp[1]
      }
    })
  }

  return params.id;

}

const MyEnhancedForm = withFormik({
  mapPropsToValues: props => ({edited: false, newPassword: '', confirmPassword: ''}),
    validationSchema: Yup.object().shape({
        firstname: Yup.string().min(1, 'firstname is too short')
                               .max(10, 'firstname is too long'),
        lastname: Yup.string().min(1, 'lastname is too short')
                              .max(10, 'lastname is too long'),
        emailAddress: Yup.string().min(10, 'emailAddress is too short')
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
                id : values.id,
                firstname: values.firstname === undefined ? values.oldItem.firstname : values.firstname,
                lastname: values.lastname === undefined ? values.oldItem.lastname : values.lastname,
                emailAddress: values.emailAddress === undefined ? values.oldItem.emailAddress : values.emailAddress,
                password: values.newPassword === "" ? values.password : values.newPassword
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