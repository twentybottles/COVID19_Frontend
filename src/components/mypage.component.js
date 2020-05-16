import React, { Component } from 'react';
import {} from 'reactstrap';
import { withFormik } from 'formik';
import SummaryList from './summaryList.js';
import DropDown from './dropDown.js';

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

        // const {errors, values, touched, dirty, isSubmitting, handleSubmit} = this.props;
        const {handleSubmit} = this.props;

        return (
            <div className="auth-inner-large">
            	<div className="text-right">
            		<DropDown key="name" index={this.state.name} />
				</div>
	        	<h1 className="text-center">COVID19　Summary</h1>
				<div className="table-responsive wrap-table">
				　　<table className="table table-condensed table-striped">
						<thead>
							<tr>
							    <th>Country</th>
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
							    <td>{this.state.country}</td>
							    <td>{this.state.newConfirmed}</td>
							    <td>{this.state.totalConfirmed}</td>
							    <td>{this.state.newDeaths}</td>
							    <td>{this.state.totalDeaths}</td>
							    <td>{this.state.newRecovered}</td>
							    <td>{this.state.totalRecovered}</td>
							</tr>

							{this.state.countries.map((country, index) => {
      							return <SummaryList key={index} index={country} />;
   	 						})}							

						</tbody>
				　　</table>
				</div>
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
				this.setState({
					name: json.firstname + "\t" + json.lastname
				});
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
					country: "Today's Summary",
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

const MyEnhancedForm = withFormik({
    enableReinitialize: true,
    handleSubmit: (values, { setErrors, props, setSubmitting }) => {

        setSubmitting(false);

    },
})(Mypage);

export default MyEnhancedForm;