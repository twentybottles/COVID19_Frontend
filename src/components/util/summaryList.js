import React, { Component } from 'react';
import { withFormik } from 'formik';
import '../../flag-icon-css-master/css/flag-icon.css';
import ChartModal from './chartModal';


class SummaryList extends Component {

    render() {    

        return (
            <tr>
                <td>
                    <ChartModal 
                        countryName={this.props.country.Country} 
                        countryCode={this.props.country.CountryCode}
                        countrySlug={this.props.country.CountrySlug}
                        className="modal-xl"
                    />
                </td>
                <td>{this.props.country.Country}</td>
                <td>{this.props.country.NewConfirmed}</td>
                <td>{this.props.country.TotalConfirmed}</td>
                <td>{this.props.country.NewDeaths}</td>
                <td>{this.props.country.TotalDeaths}</td>
                <td>{this.props.country.NewRecovered}</td>
                <td>{this.props.country.TotalRecovered}</td>
            </tr>
        );

    }

}

const MyEnhancedForm = withFormik({
})(SummaryList);

export default MyEnhancedForm;