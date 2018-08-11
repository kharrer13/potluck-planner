import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import API from '../../Utils/API';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { withStyles } from '@material-ui/core/styles';

import PublicIcon from '@material-ui/icons/Public';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import Moment from 'react-moment';

const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

class Events extends Component {
  state = {
    events: []
  };

  componentDidMount() {
    this.loadEvents();
  }

  loadEvents = () => {
    API.getPotlucks()
      .then(res =>
        this.setState({
          events: res.data
        })
      )
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={8} alignItems="center">
          <Grid item md={12}>
            <Typography variant="headline">Available Potlucks</Typography>
          </Grid>
          <Grid item md={12}>
            {this.state.events.length ? (
              <List>
                {this.state.events.map(potluck => (
                  <ListItem
                    button
                    component={Link}
                    to={`/events/${potluck.id}`}
                    key={potluck.id}
                  >
                    <ListItemIcon>
                      {potluck.privateEvent ? <LockOutlinedIcon /> : <PublicIcon />}
                    </ListItemIcon>
                    <ListItemText
                      primary={potluck.eventName}
                      secondary={
                        potluck.eventDate && (
                          <Moment format="LLL">{potluck.eventDate}</Moment>
                        )
                      }
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
                <Typography variant="subheading">
                  No Results to Display
              </Typography>
              )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

// export default Events;
export default withStyles(styles)(Events);
