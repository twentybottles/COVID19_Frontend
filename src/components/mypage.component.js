import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, DropdownMenu, MenuItem } from 'reactstrap';
import { withFormik, ErrorMessage, Field } from 'formik';
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';


class Mypage extends Component {

   constructor(props){

	   super(props);

	   this.state = {
		   date: '',
		   firstName: '',
		   lastName: '',
		   newConfirmed: '',
		   totalConfirmed: '',
		   newDeaths: '',
		   totalDeaths: '',
		   newRecovered: '',
		   totalRecovered: '',
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
				<Dropdown text={this.state.name}>
					<Dropdown.Menu>
						<Dropdown.Item text='Profile' />
						<Dropdown.Divider />
						<Dropdown.Item text='Select Country' />
						<Dropdown.Divider />
						<Dropdown.Item text='Download' />
						<Dropdown.Divider />
						<Dropdown.Item text='Inquiry' />
						<Dropdown.Divider />
						<Dropdown.Item text='Sign out' />
					</Dropdown.Menu>
				</Dropdown>
				<div class="table-responsive">
				　　<table class="table table-condensed text-right">
						<thead>
							<tr>
							    <th>Date</th>
							    <th>newConfirmed</th>
							    <th>totalConfirmed</th>
							    <th>newDeaths</th>
							    <th>totalDeaths</th>
							    <th>newRecovered</th>
							    <th>totalRecovered</th>
							</tr>
						</thead>
						<tbody class="text-right">
							<tr class="active">
							    <td>{this.state.date}</td>
							    <td>{this.state.newConfirmed}</td>
							    <td>{this.state.totalConfirmed}</td>
							    <td>{this.state.newDeaths}</td>
							    <td>{this.state.totalDeaths}</td>
							    <td>{this.state.newRecovered}</td>
							    <td>{this.state.totalRecovered}</td>
							</tr>
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

const ErrorInnerMessage = ({ name }) => (<ErrorMessage name={name} component={({ children }) => (<span className="errorMsg">{children}</span>)} />);

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

const MyEnhancedForm = withFormik({
    enableReinitialize: true,
    handleSubmit: (values, { setErrors, props, setSubmitting }) => {

        setSubmitting(false);

    },
})(Mypage);

export default MyEnhancedForm;