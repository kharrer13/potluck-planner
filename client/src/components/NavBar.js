import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
// import {Tabs, Tab} from '@material-ui/core'
import { Link, NavLink, Redirect } from 'react-router-dom';
import API from '../Utils/API'
import { withStyles } from '@material-ui/core/styles';


const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

// const NavBar = (props) => {
class NavBar extends Component {
  state = {
    redirectToReferrer: false
  }

  render() {

    const { redirectToReferrer } = this.state;
    const { classes } = this.props;
    const { open } = this.state;
    if (redirectToReferrer) {
      this.setState({ redirectToReferrer: false })
      
      return <Redirect to="/login" />;
    }
    
    return (
      <div className={classes.root}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Potluck Planner
              </Typography>

            {(this.props.loggedIn) ? (
              <React.Fragment>
                  <Button component={NavLink} to="/events" color="default">Potluck List</Button>
                  <Button component={NavLink} to="/create_event" color="default">Create Event</Button>
                  <Button component={NavLink} to="/create_item" color="default">Create Item</Button>
                  <Button component={NavLink} to="/profile"color="default">Profile for {this.props.currentUser.fullName}</Button>
                  <Button color="default" onClick={event => {
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
                  <Button component={NavLink} to="/login" color="default">Log in</Button>
                  <Button component={NavLink} to="/signup" color="default">Sign up</Button>
                </React.Fragment>
              )}

          </Toolbar>
        </AppBar>

      </div>
    )
  }
}

export default withStyles(styles)(NavBar);