import React, { Component } from 'react';
import { withFormik } from 'formik';
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import ProfileModal from './profileModal';
import DownloadModal from './downloadModal';

class LoginMenuDropDown extends Component {

    render() {

        return (
            <Dropdown text={this.props.member.firstname + "\t" + this.props.member.lastname} >
                <Dropdown.Menu>
                    <Dropdown.Item className="dropdown">
                        <ProfileModal member={this.props.member} />
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>
                        <DownloadModal countries={this.props.countries} />
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>
                        <span className="text" onClick={() => {this.logout()}}>Sign out</span>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );

    }

    logout() {

        if(window.confirm('Sign out of COVID19.com')) {
            this.props.setLogoutMenu();
            window.location.href = 'http://localhost:3000';
        }

    }

}


const MyEnhancedForm = withFormik({})(LoginMenuDropDown);

export default MyEnhancedForm;