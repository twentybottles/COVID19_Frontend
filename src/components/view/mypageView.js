import React, { Component } from 'react';
import { withFormik } from 'formik';
import SummaryList from '../util/summaryList';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

class Mypage extends Component {

   constructor(props){

	    super(props);

	    this.state = {
			date: '',
			name: '',
			country: '',
			newConfirmed: '',
			totalConfirmed: '',
			newDeaths: '',
			totalDeaths: '',
			newRecovered: '',
			totalRecovered: '',
			countries:[]
	    }

	}

    componentDidMount() {

    	this.searchMemberInfomation(this.getIdFromUrl());

        this.searchCovidSummary();

    }

    render() {

    	if (this.state.countries.length === 0) {

    		return (
	            <div className="auth-inner-large">
					<ClipLoader className="auth-inner-large" css={override} size={100} />
				</div>
    		);

    	}

        return (
            <div className="auth-inner-large">
	        	<h1 className="text-center">COVID-19　Summary</h1>
	        	<p className="text-right">{this.state.date}</p>
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
						    <td colSpan="2">{this.state.country}</td>
						    <td>{this.state.newConfirmed}</td>
						    <td>{this.state.totalConfirmed}</td>
						    <td>{this.state.newDeaths}</td>
						    <td>{this.state.totalDeaths}</td>
						    <td>{this.state.newRecovered}</td>
						    <td>{this.state.totalRecovered}</td>
						</tr>
						{this.state.countries.map((country, index) => {
  							return <SummaryList key={country.CountryCode} country={country} />;
	 					})}
					</tbody>
				</table>
			</div>
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

    searchMemberInfomation(id) {

	    fetch('http://localhost:8080/loginSearchName?id=' + id, {
	            method: 'GET',
	            mode: 'cors',
	            cache: "no-cache",
	            headers: {
	                "Content-Type": "application/json; charset=utf-8"
	            },
	        })
	        .then(response => response.json())
	        .then((json) => {
				this.props.setLoginMenu(json.firstname + "\t" + json.lastname);
	      	})
	        .catch(error => console.error('Error:サーバーが混み合っています', error));

	}

    searchCovidSummary() {

	    fetch('http://localhost:8080/covidSearchSummary', {
	            method: 'GET',
	            mode: 'cors',
	            cache: "force-cache",
	            headers: {
	                "Content-Type": "application/json; charset=utf-8"
	            },
	        })
	        .then(response => response.json())
	        .then((json) => {
				this.setState({
					country: "Total",
					newConfirmed: json.Global.NewConfirmed,
				    totalConfirmed: json.Global.TotalConfirmed,
				    newDeaths: json.Global.NewDeaths,
				    totalDeaths: json.Global.TotalDeaths,
				    newRecovered: json.Global.NewRecovered,
				    totalRecovered: json.Global.TotalRecovered,
					date: json.Date,
					countries: json.Countries
				});
	      	})
	        .catch(error => console.error('Error:サーバーが混み合っています', error));

	}
}

const override = css`
  display: block;
  margin: 250px auto;
  border-color: #1C8EF9;
`;

const MyEnhancedForm = withFormik({
    enableReinitialize: true,
    handleSubmit: (values, { setErrors, props, setSubmitting }) => {

        setSubmitting(false);

    },
})(Mypage);

export default MyEnhancedForm;