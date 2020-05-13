import React from 'react'
import { } from 'reactstrap';
import { withFormik } from 'formik';

const Aaa = props => {
    return (
        <div className="aaa">
            <p>curl http://localhost:8080/signup -X POST</p>
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
})(Aaa);
export default MyEnhancedForm;