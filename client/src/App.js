import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Events from "./Pages/Events";
import Items from "./Pages/Items";
import EventView from "./Pages/EventView";
import ItemView from "./Pages/ItemView";
import Profile from "./Pages/Profile";
// import ClaimItem from "./Pages/ClaimItem";
import CreateEvent from "./Pages/CreateEvent";
import CreateItem from "./Pages/CreateItem";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import NavBar from './components/NavBar';
import { Container } from './components/Grid';
import { withStyles } from '@material-ui/core/styles';
import withRoot from './withRoot';
import API from './Utils/API'

const styles = theme => ({
  root: {
    // textAlign: 'center'
    // paddingTop: theme.spacing.unit * 20,
  },
});

class App extends Component {
	state = {
		currentUser: {
      isVegan: false,
      isVegetarian: false,
      isMilkFree: false,
      isEggFree: false,
      isPeanutFree: false,
      isTreenutFree: false,
      isFishFree: false,
      isShellfishFree: false,
      isSoyFree: false,
      isWheatFree: false,
      isGlutenFree: false
		},
		loggedIn: false
	}
	componentDidMount() {

		this.loadCurrentUser();
	};
	loadCurrentUser = () => {
		API.whoami()
			.then(res => {
				this.setState({ currentUser: res.data });
				(res.data.id) ? this.setState({ loggedIn: true }) : this.setState({ loggedIn: false })
			})

	};

	handleUserChange = (theUser) => {
		// console.log('app.handleUserChange called with ' + JSON.stringify(theUser, '', 2))
		const { loggedIn, redirectTo, ...tempUser } = theUser;
		this.setState({
			currentUser: tempUser,
			loggedIn
		})
		// console.log('app.setState called with ' + JSON.stringify({ loggedIn, ...tempUser }, '', 2))
	}

	render() {

		const { classes } = this.props;
		const { open } = this.state;
		return (
			<div className={classes.root}>
				<Router>
					<div>
						<NavBar
							currentUser={this.state.currentUser}
							loggedIn={this.state.loggedIn}
							handleUserChange={this.handleUserChange}
						/>
						<br />
						<br />
						<Container fluid>

							<div>
								<Switch>
									<Route exact path="/" component={Events} />
									<Route exact path="/events" component={Events} />
									<Route exact path="/events/:event_id"
										render={(props) =>
											<EventView
												{...props}
												currentUser={this.state.currentUser}
											/>}
									/>
									<Route exact path="/items" component={Items} />
									<Route exact path="/item/:item_id"
										render={(props) =>
											<ItemView
												{...props}
												currentUser={this.state.currentUser}
											/>}
									/>
									{/* <Route exact path="/events/:item_id" component={ClaimItem} /> */}
									<Route exact path="/profile"
										render={(props) =>
											<Profile
												{...props}
												currentUser={this.state.currentUser}
												handleUserChange={this.handleUserChange}
											/>}
									/>
									<Route exact path="/login"
										render={(props) =>
											<Login
												{...props}
												currentUser={this.state.currentUser}
												handleUserChange={this.handleUserChange}
											/>}
									/>
									<Route exact path="/signup" component={Signup} />
									<Route exact path="/create_event"
										render={(props) =>
											<CreateEvent
												{...props}
												currentUser={this.state.currentUser}
											/>}
									/>
									<Route exact path="/create_item"
										render={(props) =>
											<CreateItem
												{...props}
												currentUser={this.state.currentUser}
											/>}
									/>
								</Switch>
							</div>

						</Container>
					</div>
				</Router>
			</div>
		);
	}
}

// export default App;
export default withRoot(withStyles(styles)(App));