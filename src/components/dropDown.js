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

const friendOptions = [
  {
    key: 'Jenny Hess',
    text: 'Jenny Hess',
    value: 'Jenny Hess',
    image: { avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg' },
  },
  {
    key: 'Elliot Fu',
    text: 'Elliot Fu',
    value: 'Elliot Fu',
    image: { avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/elliot.jpg' },
  },
  {
    key: 'Stevie Feliciano',
    text: 'Stevie Feliciano',
    value: 'Stevie Feliciano',
    image: { avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/stevie.jpg' },
  },
  {
    key: 'Christian',
    text: 'Christian',
    value: 'Christian',
    image: { avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/christian.jpg' },
  },
  {
    key: 'Matt',
    text: 'Matt',
    value: 'Matt',
    image: { avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/matt.jpg' },
  },
  {
    key: 'Justen Kitsune',
    text: 'Justen Kitsune',
    value: 'Justen Kitsune',
    image: { avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/justen.jpg' },
  },
]