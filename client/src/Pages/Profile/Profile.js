import React, { Component } from "react";
import Jumbotron from '../../components/Jumbotron'
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import { Link as ClickyThing, Redirect } from "react-router-dom";
import API from '../../Utils/API'

class Profile extends Component {
	state = {
		userData: [],
		redirectToReferrer: false
	};

	componentDidMount() {
		this.loadEvents();
		// this.loadCurrentUser();
	};

	loadEvents = () => {
		API.getUsers()
			.then(res => this.setState({ userData: res.data }))
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


		return (
			<div>
			<Container fluid>
				<Row>
					<Col size="md-12 sm-12">
						<Jumbotron>
							<h1>My profile</h1>
						</Jumbotron>
						<h4>
						{this.props.currentUser.id ? (
							<span>
							{this.props.currentUser.firstName + ' ' + this.props.currentUser.lastName}
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