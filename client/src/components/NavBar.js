import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
// import {Tabs, Tab} from '@material-ui/core'
import { Link } from 'react-router-dom';


const NavBar = (props) => {
  return (
    <div>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="title" color="inherit">
            Potluck Planner
              </Typography>

          {(props.loggedIn) ? (
            <React.Fragment>
              <Link to="/events">
                <Button>Potluck List</Button>
              </Link>
              <Link to="/create_event">
                <Button>Create Event</Button>
              </Link>
              <Link to="/profile">
                <Button>Profile for {props.currentUser.fullName}</Button>
              </Link>
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

export default NavBar;