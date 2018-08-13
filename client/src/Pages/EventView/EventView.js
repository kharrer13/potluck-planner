import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import API from '../../Utils/API';
import canEat from '../../Utils/canEat';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { withStyles } from '@material-ui/core/styles';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

import ErrorOutline from '@material-ui/icons/ErrorOutline';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';

import Moment from 'react-moment';

const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

class EventView extends Component {
  state = {
    event: {
      Items: [],
      Attendee: [],
      Invitee: [],
      Owner: {}
    },
    items: [],
    users: [],
    potluckName: '',
    potluckDate: '',
    potluckLocation: '',
    itemName: '',
    currentItem: '',
    currentInvitee: []
  };

  componentDidMount() {
    API.getPotluck(this.props.match.params.event_id)
      .then(res => this.setState({ event: res.data[0] }))
      .catch(err => console.log(err));

    API.getItems(this.props.match.params.event_id)
      .then(res => this.setState({ items: res.data }))
      .catch(err => console.log(err));

    API.getUsersShort()
      .then(res => this.setState({ users: res.data }))
      .catch(err => console.log(err));
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleItemFormSubmit = event => {
    event.preventDefault();
    API.saveItemToPotluck({
      PotluckId: this.props.match.params.event_id,
      ItemId: this.state.currentItem,
      bringing: true
    })
      .then(res => {
        this.setState({ currentItem: '' });
        this.loadItems();
      })
      .catch(err => console.log(err));
  };

  handleInviteFormSubmit = event => {
    event.preventDefault();
    // API.echo({
    API.invite({
      PotluckId: this.props.match.params.event_id,
      UserId: this.state.currentInvitee,
      invited: true
    })
      .then(res => {
        this.setState({ currentInvitee: [] });
        this.loadItems();
      })
      .catch(err => console.log(err));
  };

  loadItems = () => {
    API.getPotluck(this.props.match.params.event_id)
      .then(res => this.setState({ event: res.data[0] }))
      .catch(err => console.log(err));
  };

  attendingSubmit = event => {
    event.preventDefault();
    // API.echo({
    API.attendPotluck({
      PotluckId: this.props.match.params.event_id,
      // UserId: this.props.currentUser.id,
      attending: true
    })
      .then(res => this.loadItems())
      .catch(err => console.log(err));
  };

  notAttendingSubmit = event => {
    event.preventDefault();
    API.attendPotluck({
      PotluckId: this.props.match.params.event_id,
      // UserId: this.props.currentUser.id,
      attending: false
    })
      .then(res => this.loadItems())
      .catch(err => console.log(err));
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={8} alignItems="center">
          <Grid item md={12}>
            <Typography variant="headline">Potluck Details</Typography>
          </Grid>
          <Grid item md={12}>
            <div>
              What: {this.state.event.eventName}
              <br />
              When:{' '}
              {this.state.event.eventDate ? (
                <Moment format="LLL">{this.state.event.eventDate}</Moment>
              ) : (
                '[No date given]'
              )}
              <br />
              Where: {this.state.event.eventLocation}
              <br />
              Hosted by: {this.state.event.Owner ? this.state.event.Owner.fullName : 'nobody'}
              <br />
              Event privacy: {this.state.event.privateEvent ? 'Private' : 'Public'}
            </div>
            <br />

            <h4>Attending</h4>
            {this.state.event.Attendee.length === 0 ? (
              <h5>Nobody going yet</h5>
            ) : (
              <List>
                {this.state.event.Attendee.map(user => (
                  <ListItem key={user.id}>
                    <ListItemText
                      primary={user.fullName}
                      secondary={user.id === this.props.currentUser.id && ' me'}
                    />
                  </ListItem>
                ))}
              </List>
            )}

            <h4>Invited</h4>
            {this.state.event.Invitee.length === 0 ? (
              <h5>Nobody invited yet</h5>
            ) : (
              <List>
                {this.state.event.Invitee.map(user => (
                  <ListItem key={user.id}>
                    <ListItemText
                      primary={user.fullName}
                      secondary={user.id === this.props.currentUser.id && ' me'}
                    />
                  </ListItem>
                ))}
              </List>
            )}

            <h4>Items</h4>
            {this.state.event.Items.length === 0 ? (
              <h5>No items yet</h5>
            ) : (
              <List>
                {this.state.event.Items.map(item => (
                  <ListItem key={item.id}>
                    {this.props.loggedIn && (
                      <ListItemIcon>
                        {canEat(this.props.currentUser, item) ? (
                          <CheckCircleOutline />
                        ) : (
                          <ErrorOutline />
                        )}
                      </ListItemIcon>
                    )}
                    <ListItemText primary={item.itemName} />
                  </ListItem>
                ))}
              </List>
            )}
          </Grid>
          <Grid item md={12}>
            <Typography variant="headline">Bring an Item</Typography>
            <form>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="currentItem">Item</InputLabel>
                <Select
                  value={this.state.currentItem}
                  onChange={this.handleInputChange}
                  inputProps={{
                    name: 'currentItem',
                    id: 'currentItem'
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {this.state.items
                    .filter(item => (!this.state.event.Items.find(e => e.id === item.id)))
                    .map(item => (
                      <MenuItem value={item.id} key={item.id}>
                        {item.itemName}
                      </MenuItem>
                    ))}
                </Select>
                <Button disabled={!this.state.currentItem} onClick={this.handleItemFormSubmit}>
                  Submit Item
                </Button>
              </FormControl>
            </form>
            <br />
            <br />
            <Typography variant="headline">Attendance</Typography>
            <Button onClick={this.notAttendingSubmit}>Not Attending</Button>
            <Button onClick={this.attendingSubmit}>Attending</Button>
            <Typography variant="headline">Bring an Item</Typography>
            <br />
            <br />
            <Typography variant="headline">Invite someone</Typography>
            <form>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="currentInvitee">Person</InputLabel>
                <Select
                  multiple
                  value={this.state.currentInvitee}
                  onChange={this.handleInputChange}
                  inputProps={{
                    name: 'currentInvitee',
                    id: 'currentInvitee'
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {this.state.users
                    .filter(user => (!this.state.event.Invitee.find(e => e.id === user.id)))
                    .map(user => (
                      <MenuItem value={user.id} key={user.id}>
                        {user.fullName}
                      </MenuItem>
                    ))}
                </Select>
                <Button disabled={!this.state.currentInvitee} onClick={this.handleInviteFormSubmit}>
                  Invite
                </Button>
              </FormControl>
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}

// export default EventView;
export default withStyles(styles)(EventView);
