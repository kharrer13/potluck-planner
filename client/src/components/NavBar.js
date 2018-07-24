import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
// import {Tabs, Tab} from '@material-ui/core'
import { Link } from 'react-router-dom';


const NavBar = () => {
    return(
        <div>
          <AppBar position="static" color="default">
            <Toolbar>
              <Typography variant="title" color="inherit">
              Potluck Planner
              </Typography>
              <Link to="/">
                <Button>My Events</Button>
              </Link>
              <Link to="/create_event">
                <Button>Create Event</Button>
              </Link>
              <Link to="/profile">
                <Button>My Profile</Button>
              </Link>
              <Link to="/login">
                <Button>Log in</Button>
              </Link>
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
// My profile is actually all users right now

export default NavBar;