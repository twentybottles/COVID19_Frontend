import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Modal } from 'reactstrap';
import { withFormik } from 'formik';
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import ModalDownload from './modalDownload';
import ModalSelectCountry from './modalSelectCountry';

class DropDownLoginMenu extends Component {

    constructor(props){

        super(props);

    }

    profile() {

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
                        <Link to={'/profile?id='+ this.getIdFromUrl()} style={{color:'black'}}>
                            <span className="text">Profile</span>
                        </Link>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>
                        <ModalSelectCountry />
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>
                        <ModalDownload />
                    </Dropdown.Item>
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
})(DropDownLoginMenu);

export default MyEnhancedForm;