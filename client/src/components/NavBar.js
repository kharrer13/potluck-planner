import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
// import {Tabs, Tab} from '@material-ui/core'
import { Link, Redirect } from 'react-router-dom';
import API from '../Utils/API'


// const NavBar = (props) => {
class NavBar extends Component {
  state = {
    redirectToReferrer: false
  }

  render(props) {

    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      this.setState({ redirectToReferrer: false })
      
      return <Redirect to="/login" />;
    }
    
    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Potluck Planner
              </Typography>

            {(this.props.loggedIn) ? (
              <React.Fragment>
                <Link to="/events">
                  <Button>Potluck List</Button>
                </Link>
                <Link to="/create_event">
                  <Button>Create Event</Button>
                </Link>
                <Link to="/items">
                  <Button>Item List</Button>
                </Link>
                <Link to="/create_item">
                  <Button>Create Item</Button>
                </Link>
                <Link to="/profile">
                  <Button>Profile for {this.props.currentUser.fullName}</Button>
                </Link>
                <Button onClick={event => {
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
                }}>Log Out</Button>

              </React.Fragment>
            ) : (
                <React.Fragment>
                  <Link to="/login">
                    <Button>Log in</Button>
                  </Link>
                  <Link to="/signup">
                    <Button>Sign up</Button>
                  </Link>
                </React.Fragment>
              )}


            {/* {JSON.stringify(props.currentUser)} */}
          </Toolbar>
        </AppBar>
        {/* <AppBar position="static">
            <Toolbar>
                <Typography variant="title" color="inherit">
                Potluck Planner
                </Typography>
                <Button color="contrast" >My Events</Button>
                <Button color="contrast" >My Profile</Button>
            </Toolbar>
        </AppBar> */}
      </div>
    )
  }
}

export default NavBar;