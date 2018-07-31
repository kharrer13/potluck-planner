import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
// import {Tabs, Tab} from '@material-ui/core'
import { Link, Redirect } from 'react-router-dom';
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
                <Link to="/events">
                  <Button color="default">Potluck List</Button>
                </Link>
                <Link to="/create_event">
                  <Button color="default">Create Event</Button>
                </Link>
                <Link to="/create_item">
                  <Button color="default">Create Item</Button>
                </Link>
                <Link to="/profile">
                  <Button color="default">Profile for {this.props.currentUser.fullName}</Button>
                </Link>
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
                  <Link to="/login">
                    <Button color="default">Log in</Button>
                  </Link>
                  <Link to="/signup">
                    <Button color="default">Sign up</Button>
                  </Link>
                </React.Fragment>
              )}

          </Toolbar>
        </AppBar>

      </div>
    )
  }
}

export default withStyles(styles)(NavBar);