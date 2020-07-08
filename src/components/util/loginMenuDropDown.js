import React, { Component } from 'react';
import { withFormik } from 'formik';
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import ProfileModal from './profileModal';
import DownloadModal from './downloadModal';
import { withCookies } from 'react-cookie';

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
                        <span className="text" onClick={() => {this.logout(this.props)}}>Sign out</span>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );

    }

    logout(props) {

        if(window.confirm('Sign out of COVID19.com')) {

            fetch('/api/logout', {
                method: 'POST',
                mode: 'cors',
                cache: "no-cache",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "X-XSRF-TOKEN": props.cookies.get('XSRF-TOKEN')
                },
            })
            .then(response => response.json())
            .then(function(result) {
                if (!result) {
                    throw new Error('Network response was not ok.');
                }
            })
            .catch(error => console.error('Error:', error));
            
            this.props.setLogoutMenu();
<<<<<<< HEAD
            window.location.href = "http://www.covid19worldwide.tk";
=======
            window.location.href = 'http://localhost:3000';
>>>>>>> master
        }

    }

}


const MyEnhancedForm = withFormik({})(LoginMenuDropDown);

export default withCookies(MyEnhancedForm);