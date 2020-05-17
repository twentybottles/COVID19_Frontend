import React, { Component } from 'react';
import { withFormik } from 'formik';
import '../flag-icon-css-master/css/flag-icon.css';
import ModalWindow from './modalWindow.js';


class SummaryList extends Component {

    render() {    

        return (

            <tr>
                <td><ModalWindow countryCode={this.props.index.CountryCode}/></td>
                <td>{this.props.index.Country}</td>
                <td>{this.props.index.NewConfirmed}</td>
                <td>{this.props.index.TotalConfirmed}</td>
                <td>{this.props.index.NewDeaths}</td>
                <td>{this.props.index.TotalDeaths}</td>
                <td>{this.props.index.NewRecovered}</td>
                <td>{this.props.index.TotalRecovered}</td>
            </tr>

        );

    }

}

const MyEnhancedForm = withFormik({
})(SummaryList);

export default MyEnhancedForm;