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
        potluckName: "",
        potluckDate: "",
        potluckLocation: ""
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        console.log(name, value)
		this.setState({
			[name]: value
		});
    };

    handleFormSubmit = event => {
		event.preventDefault();
		if (this.state.potluckName && this.state.potluckDate && this.state.potluckLocation) {
			API.savePotluck({
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
							<Input
								value={this.state.potluckName}
								onChange={this.handleInputChange}
								name="potluckName"
								placeholder="Name (required)"
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

export default CreateEvent;