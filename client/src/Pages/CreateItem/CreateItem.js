import React, { Component } from "react";
import Jumbotron from '../../components/Jumbotron'
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn, Select } from "../../components/Form";
import { Link as ClickyThing } from "react-router-dom";
import API from '../../Utils/API'

class CreateItem extends Component {

	state = {
		events: [],
		userData: [],
		itemName: ""
	};

	handleInputChange = event => {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	};

	componentDidMount() {
		this.loadEvents();
	};

	loadEvents = () => {
		API.getUsers()
			.then(res =>
				this.setState({ userData: res.data })
			)
	};

	handleFormSubmit = event => {
		event.preventDefault();
		if (this.state.itemName) {
			API.saveItem({
				// API.echo({
				itemName: this.state.itemName,

			})
				.then(res => this.props.history.push('/events'))
				.catch(err => console.log(err));
		}
	};

	render() {
		return (
			<div>
				<Col size='md-3'>
					<div>
					</div>
				</Col>
				<Col size="md-6">
					<Jumbotron>
						<h1>Create an Item</h1>
					</Jumbotron>
					<form>
						<Input
							value={this.state.itemName}
							onChange={this.handleInputChange}
							name="itemName"
							placeholder="Item name (required)"
						/>
						<FormBtn
							disabled={!(this.state.itemName)}
							onClick={this.handleFormSubmit}
						>
							Submit Item
							</FormBtn>
					</form>
					<h4>Acting as {this.props.currentUser.username}</h4>

				</Col>
			</div>
		);
	}

}
// TODO fix select value per https://reactjs.org/docs/forms.html#the-select-tag
// or the hacky way is to just have another text input to input user id or username
// and if username, then add to the backend to handle adding user, or look up in frontend.
// TODO add conditional rendering to user selector

export default CreateItem;