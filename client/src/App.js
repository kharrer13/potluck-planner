import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Events from "./Pages/Events";
import EventView from "./Pages/EventView/EventView";
import Profile from "./Pages/Profile";
// import ClaimItem from "./Pages/ClaimItem";
import CreateEvent from "./Pages/CreateEvent";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import NavBar from './components/NavBar';
import { Container } from './components/Grid';
import API from './Utils/API'

class App extends Component {
	state = {
		currentUser: {}
	}
	componentDidMount() {
		
		this.loadCurrentUser();
    };
	loadCurrentUser = () => {
		API.whoami()
			.then(res => this.setState({ currentUser: res.data }))

	};

	handleUserChange = (theUser) => {
		console.log('app.handleUserChange called with ' + theUser)
		this.setState({
			currentUser: theUser
		})
	}

  render() {
    return (
			<div>
				<Router>
					<div>
				<NavBar />
				<br/>
				<br/>
				<Container fluid>

						<div>
							<Switch>
								<Route exact path="/" component={Events} />
								<Route exact path="/events" component={Events} />
								<Route exact path="/events/:event_id" component={EventView} />
								{/* <Route exact path="/events/:item_id" component={ClaimItem} /> */}
								{/* <Route exact path="/profile" component={Profile} /> */}
								<Route exact path="/profile" render={(props) => <Profile {...props} currentUser={this.state.currentUser} />} />
								
								{/* <Route exact path="/login">
									<Login {...rest} handleUserChange={this.handleUserChange} tonyStark="built this in a cave"/>
								</Route> */}
								<Route exact path="/login" render={(props) => <Login {...props} currentUser={this.state.currentUser} handleUserChange={this.handleUserChange} tonyStark="built this in a cave" />} />


								<Route exact path="/signup" component={Signup} />
								<Route exact path="/create_event" component={CreateEvent} />
							</Switch>
						</div>

				</Container>
				</div>
				</Router>
				{JSON.stringify(this.state.currentUser)}
			</div>
    );
  }
}
// render={(props) => <Dashboard {...props} isAuthed={true} />}
export default App;
