import React, { Component } from 'react';
import { withFormik } from 'formik';
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

class DropDown extends Component {

    render() {

        return (
            <Dropdown text={this.props.index} >
                <Dropdown.Menu>
                    <Dropdown.Item text='Profile' />
                    <Dropdown.Divider />
                    <Dropdown.Item text='Select Country' />
                    <Dropdown.Divider />
                    <Dropdown.Item text='Download' />
                    <Dropdown.Divider />
                    <Dropdown.Item text='Sign out' />
                </Dropdown.Menu>
            </Dropdown>
        );

    }

}

const MyEnhancedForm = withFormik({
})(DropDown);

export default MyEnhancedForm;