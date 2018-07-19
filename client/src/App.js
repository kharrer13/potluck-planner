import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Events from "./Pages/Events/Events";
// import EventView from "./pages/EventView";
// import Profile from "./pages/Profile";
// import ClaimItem from "./pages/ClaimItem";
// import CreateEvent from "./pages/CreateEvent";

class App extends Component {
  render() {
    return (
      <Router>
		    <div>
			    <Switch>
				    <Route exact path="/" component={Events} />
				    <Route exact path="/events" component={Events} />
				    <Route exact path="/events/:event_id" component={EventView} />
				    {/* <Route exact path="/events/:item_id" component={ClaimItem} /> */}
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/create_event" component={CreateEvent} />
			    </Switch>
		    </div>
	    </Router>
    );
  }
}

export default App;
