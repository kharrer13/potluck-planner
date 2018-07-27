import React, { Component } from "react";
import Jumbotron from '../../components/Jumbotron'
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn, Select } from "../../components/Form";
import { Link as ClickyThing, Redirect } from "react-router-dom";
import validator from 'validator';
import API from '../../Utils/API'

class Signup extends Component {

	state = {
		userData: [],
		username: "",
		password: "",
		email: "",
		fullName: "",
		redirectToReferrer: false,
		redirectTo: false
	};

/* 	validateFormInput = () => {
		let newUserData = {
			username: this.state.username,
			password: this.state.password,
			email: this.state.email,
			fullName: this.state.fullName,
		}

	}
 */
	handleInputChange = event => {
		const { name, value } = event.target;

		this.setState({
			[name]: value
		});
		// this.validateFormInput();
	};

	// componentDidMount() {
	// 	this.loadEvents();
	// };

	// loadEvents = () => {
	// 	API.getUsers()
	// 		.then(res =>
	// 			this.setState({ userData: res.data })
	// 		)
	// };



	handleFormSubmit = event => {
		event.preventDefault();

		// validate all inputs here
		let isValid = [
			validator.isAlphanumeric(this.state.username),
			validator.isEmail(this.state.email)
			// validator.isAlpha(this.state.fullName)

		]

		console.log('isValid', isValid)
		console.log('isValid.every', isValid.every(x=>x))
		

		if (isValid.every(x=>x)) {
			// API.login({
			API.saveUser({
				username: this.state.username,
				password: this.state.password,
				email: this.state.email,
				fullName: this.state.fullName
			})
				.then(res => {
					console.log(res)
					if (res.data.redirectTo) {
						console.log(res.data.redirectTo)
						this.setState({ redirectToReferrer: true,
						redirectTo: res.data.redirectTo })
					}
				})
				.catch(err => console.log(err));
		} else {
			console.log('validation error')
		}
	};

	render() {
		const { from } = this.props.location.state || { from: { pathname: this.state.redirectTo } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
			console.log('redirecting to from:', from)
      return <Redirect to={from} />;
    }

		return (
			<div>
                    <Col size='md-3'>
                    <div>
                    </div>
                    </Col>
					<Col size="md-6">
						<Jumbotron>
							<h1>Sign up</h1>
						</Jumbotron>
						<form>
						<Input
								value={this.state.fullName}
								onChange={this.handleInputChange}
								name="fullName"
								placeholder="Name"
							/>
							<Input
								value={this.state.email}
								onChange={this.handleInputChange}
								name="email"
								placeholder="email"
							/>
							<Input
								value={this.state.username}
								onChange={this.handleInputChange}
								name="username"
								placeholder="Username"
							/>
							<Input
                type="password"
								value={this.state.password}
								onChange={this.handleInputChange}
								name="password"
								placeholder="Password"
							/>
							<FormBtn
								disabled={!(this.state.username && this.state.password)}
								onClick={this.handleFormSubmit}
							>
								Sign up
							</FormBtn>
						</form>
					</Col>
			</div>
		);
	}

}
// TODO fix select value per https://reactjs.org/docs/forms.html#the-select-tag
// or the hacky way is to just have another text input to input user id or username
// and if username, then add to the backend to handle adding user, or look up in frontend.
// TODO add conditional rendering to user selector

export default Signup;