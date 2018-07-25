import React, { Component } from "react";
import Jumbotron from '../../components/Jumbotron'
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import { Link as ClickyThing, Redirect } from "react-router-dom";
import API from '../../Utils/API'
import Navbar from '../../components/NavBar'

class Profile extends Component {
    state = {
			userData: [],
			currentUser: {},
			redirectToReferrer: false
    };

    componentDidMount() {
		this.loadEvents();
		this.loadCurrentUser();
    };
    
    loadEvents = () => {
		API.getUsers()
		.then(res => 
			this.setState({userData: res.data})
		)

	};

	// probably need to move this up to App
	loadCurrentUser = () => {
			API.whoami()
			.then(res => this.setState({ currentUser: res.data }))

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
	
	handleLogout = event => {
		event.preventDefault();
		API.logout()
			.then(res => {
				console.log(res)
				if (res.data.redirectTo) {
					console.log(res.data.redirectTo)
					this.setState({ redirectToReferrer: true })
				}
			})
			.catch(err => console.log(err));
	}

  
  render() {
		const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
			console.log('redirecting to from:', from)
      return <Redirect to={from} />;
    }


		return (
			<div>
			<Container fluid>
				<Row>
					<Col size="md-12 sm-12">
						<Jumbotron>
							<h1>My profile</h1>
						</Jumbotron>
						<h4>
						{this.state.currentUser.id ? (
							<span>
							{this.state.currentUser.firstName + ' ' + this.state.currentUser.lastName}
							<FormBtn 
								color="secondary"
								onClick={this.handleLogout}
								>Logout</FormBtn>
							</span>
						)
						: ( <ClickyThing to="/login">Log in</ClickyThing> )}
						</h4>

					</Col>
				</Row>
			</Container>
			</div>
		);
	}
}
// TODO: fix key in ListItem


export default Profile;