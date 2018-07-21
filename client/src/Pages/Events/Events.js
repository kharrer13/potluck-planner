import React, { Component } from "react";
import Jumbotron from '../../components/Jumbotron'
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import { Link as ClickyThing } from "react-router-dom";
import API from '../../Utils/API'
import Navbar from '../../components/NavBar'
import Moment from 'react-moment';

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
		API.getPotlucks()
		.then(res => 
			this.setState({events: res.data, potluckName: "", potluckDate: '', potluckLocation: ''})
		)
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
				<Row>
					<Col size="md-12 sm-12">
						<Jumbotron>
							<h1>Available Potlucks</h1>
						</Jumbotron>
							{this.state.events.length ? (
								<List>
								{this.state.events.map(potluck => (
									<ListItem key={potluck.id}> 
									<ClickyThing to={`/events/${potluck.id}`}>
										{potluck.id} {potluck.eventName} on {potluck.eventDate && <Moment format="LLL">{potluck.eventDate}</Moment> }
									</ClickyThing> 
									</ListItem>
								))}
								</List>
						) : (
							<h3>No Results to Display</h3>
						)}
					</Col>
				</Row>
			</div>
		);
	}
}
// TODO: fix key in ListItem


export default Events;