import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Events from "./Pages/Events";
import EventView from "./Pages/EventView/EventView";
import Profile from "./Pages/Profile";
// import ClaimItem from "./Pages/ClaimItem";
import CreateEvent from "./Pages/CreateEvent";
import Login from "./Pages/Login";
import NavBar from './components/NavBar';
import { Container } from './components/Grid';

class App extends Component {
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
								<Route exact path="/profile" component={Profile} />
								<Route exact path="/login" component={Login} />
								<Route exact path="/create_event" component={CreateEvent} />
							</Switch>
						</div>

				</Container>
				</div>
				</Router>
			</div>
    );
  }
}

export default App;
