import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import EventIcon from '@material-ui/icons/Event';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const styles = {
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    width: '100%'
  }
};

class BottomBar extends Component {
  state = {
    value: 0,

  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}
        elevation={4}
      >
        <BottomNavigationAction label="Events" icon={<EventIcon />} />
        <BottomNavigationAction label="Items" icon={<LocalDiningIcon />} />
        <BottomNavigationAction label="Profile" icon={<AccountCircleIcon />} />
      </BottomNavigation>
    );
  }
}

export default withStyles(styles)(BottomBar);
