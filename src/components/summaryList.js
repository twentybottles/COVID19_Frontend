import React, { Component } from 'react';
import { withFormik } from 'formik';
import '../flag-icon-css-master/css/flag-icon.css';


class SummaryList extends Component {

    render() {

        return (
            <tr>
                <td className="w20"><span className={"flag-icon-"+this.props.index.CountryCode.toLowerCase()+ " flagIcon"}>　</span></td>
                <td>{this.props.index.Country}</td>
                <td>{this.props.index.NewConfirmed}</td>
                <td>{this.props.index.TotalConfirmed}</td>
                <td>{this.props.index.NewDeaths}</td>
                <td>{this.props.index.TotalDeaths}</td>
                <td>{this.props.index.NewRecovered}</td>
                <td>{this.props.index.TotalRecovered}</td>
            </tr>

        );

        // var countryCode = this.props.index.CountryCode.toLowerCase();
        // var flagIcon = "flag-icon-" + countryCode;
        // var element = document.getElementById("flagIcon");
        // element.classList.add(flagIcon);
        // console.log(element.classList);

    }

}

const MyEnhancedForm = withFormik({
})(SummaryList);

export default MyEnhancedForm;