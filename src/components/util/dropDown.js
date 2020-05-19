import React, { Component } from 'react';
import { withFormik } from 'formik';
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import { Link } from 'react-router-dom'

class DropDown extends Component {

    constructor(props){

        super(props);

    }

    profile() {

    }

    download() {

    }

    selectCountry() {

    }

    signout() {

        this.props.setLogoutMenu();

    }

    render() {

        return (
            <Dropdown text={this.props.name} >
                <Dropdown.Menu>
                    <Dropdown.Item>
                        <Link to="/" style={{color:'black'}}>
                            <span className="text">Profile</span>
                        </Link>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item text='Select Country' onClick={() => {this.selectCountry()}} />
                    <Dropdown.Divider />
                    <Dropdown.Item text='Download' onClick={() => {this.download()}} />
                    <Dropdown.Divider />
                    <Dropdown.Item>
                        <Link to="/" style={{color:'black'}}>
                            <span className="text" onClick={() => {this.signout()}}>Sign out</span>
                        </Link>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );

    }

}

const MyEnhancedForm = withFormik({
})(DropDown);

export default MyEnhancedForm;