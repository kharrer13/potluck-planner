import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import API from '../../Utils/API';

import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';

import Moment from 'react-moment';
import { ListItemText } from '../../../node_modules/@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
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
    API.getPotlucks().then(res =>
      this.setState({
        events: res.data
      })
    );
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
        <Typography variant="headline">Available Potlucks</Typography>

        {this.state.events.length ? (
          <List>
            {this.state.events.map(potluck => (
              <ListItem button component={Link} to={`/events/${potluck.id}`} key={potluck.id}>
                <ListItemText
                  primary={potluck.eventName}
                  secondary={
                    potluck.eventDate && (
                      <span>
                        {' '}
                        <Moment format="LLL">{potluck.eventDate}</Moment>{' '}
                      </span>
                    )
                  }
                />

                {/* <ClickyThing to={`/events/${potluck.id}`}> */}
              </ListItem>
            ))}
          </List>
        ) : (
          <h3>No Results to Display</h3>
        )}
      </div>
    );
  }
}

// export default Events;
export default withStyles(styles)(Events);
