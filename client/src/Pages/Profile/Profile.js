import React, { Component } from "react";
import Jumbotron from '../../components/Jumbotron'
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import { Link as ClickyThing } from "react-router-dom";
import API from '../../Utils/API'
import Navbar from '../../components/NavBar'

class Profile extends Component {
    state = {
        userData: [],
    };

    componentDidMount() {
		this.loadEvents();
    };
    
    loadEvents = () => {
		API.getUsers()
		.then(res => 
			this.setState({userData: res.data})
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
			<Navbar />
			<br/>
			<br/>
			<Container fluid>
				<Row>
					<Col size="md-12 sm-12">
						<Jumbotron>
							<h1>My profile</h1>
						</Jumbotron>
              Profile goes here: {JSON.stringify(this.state.userData)}
					</Col>
				</Row>
			</Container>
			</div>
		);
	}
}
// TODO: fix key in ListItem


export default Profile;