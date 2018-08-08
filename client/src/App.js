import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Events from './Pages/Events';
import Items from './Pages/Items';
import EventView from './Pages/EventView';
import ItemView from './Pages/ItemView';
import Profile from './Pages/Profile';
// import ClaimItem from "./Pages/ClaimItem";
import CreateEvent from './Pages/CreateEvent';
import CreateItem from './Pages/CreateItem';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import NotFound from './Pages/NotFound';
import NavBar from './components/NavBar';
import BottomBar from './components/BottomBar';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import withRoot from './withRoot';
import API from './Utils/API';

const styles = theme => ({
  root: {
		// paddingTop: theme.spacing.unit * 20,
	},
	mainsheet: {
	...theme.mixins.gutters(),
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2,
		// textAlign: 'center'
	}
});

class App extends Component {
	state = {
		currentUser: {
			id: null,
			username: null,
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

		return (
			<Paper className={classes.root}>
				<Router>
					<div>
						<NavBar
							currentUser={this.state.currentUser}
							loggedIn={this.state.loggedIn}
							handleUserChange={this.handleUserChange}
						/>
						<br />
						<br />
						<Paper className={classes.mainsheet}>

							<div>
								<Switch>
									<Route exact path="/" component={Home} />
									<Route exact path="/events" component={Events} />
									<Route exact path="/events/:event_id"
										render={(props) =>
											<EventView
												{...props}
												currentUser={this.state.currentUser}
												loggedIn={this.state.loggedIn}
											/>}
									/>
									<Route exact path="/items" component={Items} />
									<Route exact path="/items/:item_id"
										render={(props) =>
											<ItemView
												{...props}
												currentUser={this.state.currentUser}
												loggedIn={this.state.loggedIn}
											/>}
									/>
									{/* <Route exact path="/events/:item_id" component={ClaimItem} /> */}
									<Route exact path="/profile"
										render={(props) =>
											<Profile
												{...props}
												currentUser={this.state.currentUser}
												loggedIn={this.state.loggedIn}
												handleUserChange={this.handleUserChange}
												loadCurrentUser={this.loadCurrentUser}
											/>}
									/>
									<Route exact path="/login"
										render={(props) =>
											<Login
												{...props}
												currentUser={this.state.currentUser}
												loggedIn={this.state.loggedIn}
												handleUserChange={this.handleUserChange}
											/>}
									/>
									<Route exact path="/signup" component={Signup} />
									<Route exact path="/create_event"
										render={(props) =>
											<CreateEvent
												{...props}
												currentUser={this.state.currentUser}
												loggedIn={this.state.loggedIn}
											/>}
									/>
									<Route exact path="/create_item"
										render={(props) =>
											<CreateItem
												{...props}
												currentUser={this.state.currentUser}
												loggedIn={this.state.loggedIn}
											/>}
									/>
									<Route component={NotFound} />
								</Switch>
							</div>

						</Paper>
						{/* {this.state.loggedIn && <BottomBar /> } */}
					</div>
				</Router>
			</Paper>
		);
	}
}

// export default App;
export default withRoot(withStyles(styles)(App));