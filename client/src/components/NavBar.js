import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
// import {Tabs, Tab} from '@material-ui/core'

const NavBar = () => {
    return(
        <div>
          <AppBar position="static" color="default">
            <Toolbar>
              <Typography variant="title" color="inherit">
              Potluck Planner
              </Typography>
              <Button>My Events</Button>
              <Button>My Profile</Button>
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