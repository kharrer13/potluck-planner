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
								name="Potluck Name"
								placeholder="Name (required)"
							/>
							<Input
								value={this.state.potluckDate}
								onChange={this.handleInputChange}
								name="Potluck Date"
								placeholder="Date (required)"
							/>
							<TextArea
								value={this.state.potluckLocation}
								onChange={this.handleInputChange}
								name="Potluck Location"
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