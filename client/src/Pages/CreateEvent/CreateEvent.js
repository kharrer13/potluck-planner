import React, { Component } from "react";
import Jumbotron from '../../components/Jumbotron'
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import { Link as ClickyThing } from "react-router-dom";
import API from '../../Utils/API'
import Navbar from '../../components/NavBar'

class CreateEvent extends Component {

    state = {
        events: [],
				userData: [],
				currentUser: "",
        potluckName: "",
        potluckDate: "",
        potluckLocation: ""
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        
		this.setState({
			[name]: value
		});
		};
		
		// handleSelectChange(event) {
		// 	this.setState({currentUser: event.target.value});
		// }

		componentDidMount() {
			this.loadEvents();
			};
	
    loadEvents = () => {
			API.getUsers()
			.then(res => 
				this.setState({userData: res.data})
			)
			};
	
    handleFormSubmit = event => {
		event.preventDefault();
		if (this.state.potluckName && this.state.potluckDate && this.state.potluckLocation) {
			API.savePotluck({
			// API.echo({
				OwnerId: +this.state.currentUser,
				eventName: this.state.potluckName,
				eventDate: this.state.potluckDate,
				eventLocation: this.state.potluckLocation
			})
				.then(res => this.loadEvents())
				.catch(err => console.log(err));
		}
    };

    render() {
		return (
			<div>
			<Navbar />
			<br/>
			<br/>
			<Container fluid>
					<Col size="md-6">
						<Jumbotron>
							<h1>Create a Potluck</h1>
						</Jumbotron>
						<form>
							<div className="form-group">
								<label for="currentUser">Pick current user</label>
								<select
								className="form-control"
								name="currentUser"
								id="currentUser"
								onChange={this.handleInputChange}
								>
									{this.state.userData.map(user =>
										<option value={user.id}>{user.firstName} {user.lastName}</option>
									)}
								</select>
							</div>
							{/* <Select
								value={this.state.currentUser}
								onChange={this.handleInputChange}
								selectLabel="Pick current user"
								selectName="currentUser"
								selectData={this.state.userData}
							/> */}
							<Input
								value={this.state.potluckName}
								onChange={this.handleInputChange}
								name="potluckName"
								placeholder="Event name (required)"
							/>
							<Input
								value={this.state.potluckDate}
								onChange={this.handleInputChange}
								name="potluckDate"
								placeholder="Date (required)"
							/>
							<Input
								value={this.state.potluckLocation}
								onChange={this.handleInputChange}
								name="potluckLocation"
								placeholder="Location (required)"
							/>
							<FormBtn
								disabled={!(this.state.potluckName && this.state.potluckDate && this.state.potluckLocation)}
								onClick={this.handleFormSubmit}
							>
								Submit Potluck
							</FormBtn>
						</form>
					</Col>
			</Container>
			</div>
		);
	}

}
// TODO fix select value per https://reactjs.org/docs/forms.html#the-select-tag
// or the hacky way is to just have another text input to input user id or username
// and if username, then add to the backend to handle adding user, or look up in frontend.

export default CreateEvent;