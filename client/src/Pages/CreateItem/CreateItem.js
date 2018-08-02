import React, { Component } from "react";
import Jumbotron from '../../components/Jumbotron'
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn, Select } from "../../components/Form";
import { Link as ClickyThing } from "react-router-dom";
import API from '../../Utils/API'

const dietary = ["isVegan",
	"isVegetarian",
	"isMilkFree",
	"isEggFree",
	"isPeanutFree",
	"isTreenutFree",
	"isFishFree",
	"isShellfishFree",
	"isSoyFree",
	"isWheatFree",
	"isGlutenFree"]


class CreateItem extends Component {

	state = {
		events: [],
		userData: [],
		itemName: "",
		isVegan: false,
		isVegetarian: false,
		isMilkFree: false,
		isEggFree: false,
		isPeanutFree: false,
		isTreenutFree: false,
		isFishFree: false,
		isShellfishFree: false,
		isSoyFree: false,
		isWheatFree: false,
		isGlutenFree: false

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
				isVegan: this.state.isVegan,
				isVegetarian: this.state.isVegetarian,
				isMilkFree: this.state.isMilkFree,
				isEggFree: this.state.isEggFree,
				isPeanutFree: this.state.isPeanutFree,
				isTreenutFree: this.state.isTreenutFree,
				isFishFree: this.state.isFishFree,
				isShellfishFree: this.state.isShellfishFree,
				isSoyFree: this.state.isSoyFree,
				isWheatFree: this.state.isWheatFree,
				isGlutenFree: this.state.isGlutenFree,

			})
				.then(res => this.props.history.push('/events'))
				.catch(err => console.log(err));
		}
	};

	render() {
		return (
			<div>
				<Row>
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
							{dietary.map(e => (<label htmlFor={e} key={e}>
								{e}
						<input
									id={e}
									name={e}
									type="checkbox"
									checked={this.state.e}
									onChange={this.handleInputChange}
								/>
							</label> )
							)}
							
							<FormBtn
								disabled={!(this.state.itemName)}
								onClick={this.handleFormSubmit}
							>
								Submit Item
							</FormBtn>
						</form>
						<h4>Acting as {this.props.currentUser.username}</h4>

					</Col>
				</Row>
			</div>
		);
	}

}
// TODO fix select value per https://reactjs.org/docs/forms.html#the-select-tag
// or the hacky way is to just have another text input to input user id or username
// and if username, then add to the backend to handle adding user, or look up in frontend.
// TODO add conditional rendering to user selector

export default CreateItem;