import React, { useState } from 'react';
import { withFormik } from 'formik';
import { Form, Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';

const DownloadModal = (props) => {
  const {
    handleSubmit,
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => {

   setModal(!modal);
    
  }

  return (
    <div>
      <Form className="text-left" onSubmit={handleSubmit}>

      <span onClick={toggle} className="">Download</span>
      <Modal isOpen={modal} toggle={toggle} className="modal-lg">
        <ModalHeader toggle={toggle}>表示しているデータを一括ダウンロードしますか？：</ModalHeader>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Yes</Button>
          <Button color="secondary" onClick={toggle}>Close</Button>
        </ModalFooter>
      </Modal>
      </Form>
    </div>
  );
}


const MyEnhancedForm = withFormik({
    handleSubmit: (values, { setErrors, props, setSubmitting }) => {

        // setSubmitting(false);

        // fetch('http://localhost:8080/loginAuthentication', {
        //     method: 'POST',
        //     mode: 'cors',
        //     // cache: "no-cache",
        //     // credentials: "same-origin",
        //     // headers: {
        //     //     "Content-Type": "application/json; charset=utf-8",
        //     //     'X-XSRF-TOKEN': Cookie.get('XSRF-TOKEN')
        //     // },
        //     headers: {
        //         "Content-Type": "application/json; charset=utf-8"
        //     },
        //     body : JSON.stringify({ 
        //         myUsername: values.myUsername,
        //         myPassword: values.myPassword
        //      }),

        // })
        // .then(response => response.json())
        // .then(function(response) {
        //     if (response.length > 0) {
        //         props.history.push('/mypage?id='+response[0].id);
        //     }
        //     return setErrors({ authentication : 'Either Username or Password is invalid' });
        // })
        // .catch(error => console.error('Error:', error));
        alert("aaa");


    },
})(DownloadModal);

export default MyEnhancedForm;