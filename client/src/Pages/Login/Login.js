import React, { Component } from "react";
import Jumbotron from '../../components/Jumbotron'
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn, Select } from "../../components/Form";
import { Link as ClickyThing, Redirect } from "react-router-dom";
import API from '../../Utils/API'

class Login extends Component {
	state = {
		events: [],
		userData: [],
		username: "",
		password: "",
		redirectToReferrer: false,
		loginFailed: false
	};

	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};

	handleFormSubmit = event => {
		event.preventDefault();
		if (this.state.username && this.state.password) {
			API.login({
				// API.echo({
				username: this.state.username,
				password: this.state.password
			})
				.then(res => {
				
					// console.log(res)
					this.props.handleUserChange(res.data)
					if (res.data.redirectTo) {
						console.log('redirectTo', res.data.redirectTo)
						this.setState({ loginFailed: false, redirectToReferrer: true })
					}
				})
				.catch(err => {
					console.error(err)
					this.setState({ loginFailed: true })
				});
		}
	};

	render() {
		const { from } = this.props.location.state || { from: { pathname: "/profile" } };
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
						<h1>Log in</h1>
					</Jumbotron>
					<form>
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
							Log in
							</FormBtn>
						{this.state.loginFailed && 'Login failed'}
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

export default Login;