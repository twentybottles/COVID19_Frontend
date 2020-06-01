import React, { Component } from 'react';
import { withFormik } from 'formik';
import { css } from "@emotion/core";
import searchIdFromUrl from '../util/function/searchIdFromUrl';
import ClipLoader from "react-spinners/ClipLoader";
import ChartModal from '../util/chartModal';
import '../../flag-icon-css-master/css/flag-icon.css';

class MypageView extends Component {

   constructor(props) {

	    super(props);
	    this.state = {
	    	isInit: false,
			date: '',
			newConfirmed: '',
			totalConfirmed: '',
			newDeaths: '',
			totalDeaths: '',
			newRecovered: '',
			totalRecovered: '',
			countries:[]
	    }

	    fetch('http://localhost:8080/covid/search/summary', {
			method: 'GET',
			mode: 'cors',
			cache: "force-cache",
			headers: {
			"Content-Type": "application/json; charset=utf-8"
			},
		})
		.then(response => response.json())
		.then(json => this.setState({
			isInit: true,
			date: json.Date,
			newConfirmed: json.Global.NewConfirmed,
			totalConfirmed: json.Global.TotalConfirmed,
			newDeaths: json.Global.NewDeaths,
			totalDeaths: json.Global.TotalDeaths,
			newRecovered: json.Global.NewRecovered,
			totalRecovered: json.Global.TotalRecovered,
			countries: json.Countries
			})
		)
		.catch(error => console.error('Error:サーバーが混み合っています', error));

	}

	componentDidUpdate() {

		 if (this.state.isInit) {

			fetch('http://localhost:8080/login/search/name?id=' + searchIdFromUrl(), {
		        method: 'GET',
		        mode: 'cors',
		        cache: "no-cache",
		        headers: {
		            "Content-Type": "application/json; charset=utf-8"
		        },
		    })
		    .then(response => response.json())
		    .then((json) => {
				this.props.setLoginMenu(json, this.state.countries);
		  	})
		    .catch(error => console.error('Error:サーバーが混み合っています', error));
		    this.setState({isInit:false});

		 }

	}

    render() {

    	if (this.state.countries.length < 1) {

    		return (
	            <div className="auth-inner-large">
					<ClipLoader className="auth-inner-large" css={override} size={100} />
				</div>
    		);

    	}

        return (
            <div className="auth-inner-large">
	        	<h1 className="text-center">COVID-19　Summary</h1>
	        	<p className="text-right">Updated Date：{this.state.date}</p>
				<table className="table table-condensed table-striped table-responsive wrap-table">
					<thead>
						<tr>
						    <th colSpan="2" className="text-center">Country</th>
						    <th>NewConfirmed</th>
						    <th>TotalConfirmed</th>
						    <th>NewDeaths</th>
						    <th>TotalDeaths</th>
						    <th>NewRecovered</th>
						    <th>TotalRecovered</th>
						</tr>
					</thead>
					<tbody className="text-right">
						<tr className="active text-danger">
						    <td colSpan="2">Total</td>
						    <td>{this.state.newConfirmed}</td>
						    <td>{this.state.totalConfirmed}</td>
						    <td>{this.state.newDeaths}</td>
						    <td>{this.state.totalDeaths}</td>
						    <td>{this.state.newRecovered}</td>
						    <td>{this.state.totalRecovered}</td>
						</tr>
						{this.state.countries.map((country) => {
							return (
							  	<tr key={country.CountryCode}>
					                <td>
					                    <ChartModal 
					                        countryName={country.Country} 
					                        countryCode={country.CountryCode}
					                        countrySlug={country.Slug}
					                        className="modal-lg"
					                    />
					                </td>
					                <td>{country.Country}</td>
					                <td>{country.NewConfirmed}</td>
					                <td>{country.TotalConfirmed}</td>
					                <td>{country.NewDeaths}</td>
					                <td>{country.TotalDeaths}</td>
					                <td>{country.NewRecovered}</td>
					                <td>{country.TotalRecovered}</td>
					            </tr>
					        );
	 					})}
					</tbody>
				</table>
			</div>
        );
        
    }

}
const override = css`display: block; margin: 250px auto; border-color: #1C8EF9;`;

const MyEnhancedForm = withFormik({})(MypageView);

export default MyEnhancedForm;