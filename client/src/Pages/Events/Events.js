import React, { Component } from "react";
import Jumbotron from '../../components/Jumbotron'
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import { Link as ClickyThing } from "react-router-dom";
import API from '../../Utils/API'

class Events extends Component {
    state = {
        events: [],
        potluckName: "",
        potluckDate: "",
        potluckLocation: ""
    };

    componentDidMount() {
		this.loadEvents();
    };
    
    loadEvents = () => {

    };

    handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
  };
  
  handleFormSubmit = event => {
		event.preventDefault();
		if (this.state.potluckName && this.state.potluckDate && this.state.potluckLocation) {
			API.saveEvent({
				potluckName: this.state.potluckName,
				potluckDate: this.state.potluckDate,
				potluckLocation: this.state.potluckLocation
			})
				.then(res => this.loadEvents())
				.catch(err => console.log(err));
		}
  };
  
  render() {
		return (
			<Container fluid>
				<Row>
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
					<Col size="md-6 sm-12">
						<Jumbotron>
							<h1>Available Potlucks</h1>
						</Jumbotron>
							{this.state.events.length ? (
							<List>
								{this.state.events.map(event => (
									<ListItem key={event._id}>
										<ClickyThing to={`/events/${event._id}`}>
											<strong>
												{event.potluckName}
											</strong>
										</ClickyThing>
									</ListItem>
								))}
							</List>
						) : (
							<h3>No Results to Display</h3>
						)}
					</Col>
				</Row>
			</Container>
		);
	}
}

export default Events;