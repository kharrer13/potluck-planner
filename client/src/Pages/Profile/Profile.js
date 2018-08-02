import React, { Component } from "react";
import Jumbotron from '../../components/Jumbotron'
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import { Link as ClickyThing, Redirect } from "react-router-dom";
import API from '../../Utils/API'
import Moment from 'react-moment';

class Profile extends Component {
	state = {
		userData: [],
		events: [],
		redirectToReferrer: false
	};

	componentDidMount() {
		this.loadEvents();
		this.loadUsers();
		// this.loadCurrentUser();
	};

	loadUsers = () => {
		API.getUsers()
			.then(res => this.setState({ userData: res.data }));
	};

	loadEvents = () => {
		API.getMyPotlucks()
			.then(res => this.setState({ events: res.data }));
	};

    handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
  };
  
	handleLogout = event => {
		event.preventDefault();
		API.logout()
			.then(res => {
				console.log(res)
				this.props.handleUserChange(res.data)
				if (res.data.redirectTo) {
					console.log(res.data.redirectTo)
					this.setState({ redirectToReferrer: true })
				}
			})
			.catch(err => console.log(err));
	}

  
  render(props) {
		const { from } = this.props.location.state || { from: { pathname: "/login" } };
		const { redirectToReferrer } = this.state;
		
    if (redirectToReferrer) {
			console.log('redirecting to from:', from)
      return <Redirect to={from} />;
    }
		
		const restrictionList = Object.keys(this.props.currentUser).filter(e => e.startsWith("is"));
		// const restrictionList = ["isVegan", "isVegetarian", "isMilkFree", "isEggFree", "isPeanutFree", "isTreenutFree", "isFishFree", "isShellfishFree", "isSoyFree", "isWheatFree", "isGlutenFree"]
		// console.log(restrictionList);
		


		return (
			<div>
			<Container fluid>
				<Row>
					<Col size="md-12 sm-12">
						<Jumbotron>
							<h1>My profile</h1>
						</Jumbotron>
						<h3>
						{this.props.currentUser.id ? (
							<span>
							{this.props.currentUser.fullName}
							<FormBtn 
								color="secondary"
								onClick={this.handleLogout}
								>Logout</FormBtn>
							</span>
						)
						: ( <ClickyThing to="/login">Log in</ClickyThing> )}
						</h3>
						<h4>Events you are hosting</h4>
						{this.state.events.length ? (
							<List>
								{this.state.events.map(potluck => (
									<ListItem key={potluck.id}>
										<ClickyThing to={`/events/${potluck.id}`}>
											{potluck.id} {potluck.eventName} {potluck.eventDate && (<span> on <Moment format="LLL">{potluck.eventDate}</Moment> </span>)}
										</ClickyThing>
									</ListItem>
								))}
							</List>
						) : (
								<h3>No Results to Display</h3>
							)}
							
							{restrictionList.length === 0 ?
								<h5>No dietary restriction flags</h5>
								// : 'has some'
								: 
									<List>
										{restrictionList.map(thing => (
                    this.props.currentUser[thing] && (<ListItem key={thing}>{thing} </ListItem>)
									))}
									</List>
							}
					</Col>
				</Row>
			</Container>
			</div>
		);
	}
}
// TODO: fix key in ListItem


export default Profile;