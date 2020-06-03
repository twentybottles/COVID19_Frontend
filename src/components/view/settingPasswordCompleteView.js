import React, { Component } from 'react';
import { Button, Form } from 'reactstrap';
import { withFormik } from 'formik';

class SettingPasswordCompleteView extends Component {

    render() {

        const {handleSubmit} = this.props;

        return (
            <div className="auth-inner">
                <Form className="text-left" onSubmit={handleSubmit}>
                    <h5 className="text-center mb-5">New password has been registerd</h5>
                    <Button type="submit" className="btn-block" color="primary">Top</Button>
                </Form>
            </div>
        );

    }

}

const MyEnhancedForm = withFormik({
    handleSubmit: props => {
        props.history.push({pathname: '/'})
    },
})(SettingPasswordCompleteView);

export default MyEnhancedForm;