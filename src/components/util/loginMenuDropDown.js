import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { withFormik } from 'formik';
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import ProfileModal from './profileModal';
import DownloadModal from './downloadModal';

class LoginMenuDropDown extends Component {

    render() {

        return (
            <Dropdown text={this.props.name} >
                <Dropdown.Menu>
                    <Dropdown.Item className="dropdown">
                        <ProfileModal />
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>
                        <DownloadModal />
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>
                        <Link to="/" style={{color:'black'}}>
                            <span className="text" onClick={() => {this.props.setLogoutMenu()}}>Sign out</span>
                        </Link>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );

    }

    getIdFromUrl() {

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

}

const MyEnhancedForm = withFormik({
})(LoginMenuDropDown);

export default MyEnhancedForm;