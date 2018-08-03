import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import API from '../../Utils/API';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

import isLabels from '../../Utils/isLabels.json';

import Moment from 'react-moment';

const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

class Profile extends Component {
  state = {
    userData: [],
    events: [],
    redirectToReferrer: false
  };

  componentDidMount() {
    this.loadEvents();
    this.loadUsers();
    // this.loadCurrentUser();
  }

  loadUsers = () => {
    API.getUsers().then(res => this.setState({ userData: res.data }));
  };

  loadEvents = () => {
    API.getMyPotlucks().then(res => this.setState({ events: res.data }));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleLogout = event => {
    event.preventDefault();
    API.logout()
      .then(res => {
        console.log(res);
        this.props.handleUserChange(res.data);
        if (res.data.redirectTo) {
          console.log(res.data.redirectTo);
          this.setState({ redirectToReferrer: true });
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    const { classes } = this.props;

    const { from } = this.props.location.state || { from: { pathname: '/login' } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      console.log('redirecting to from:', from);
      return <Redirect to={from} />;
    }

    const restrictionList = Object.keys(this.props.currentUser).filter(e => e.startsWith('is'));
    // const restrictionList = ["isVegan", "isVegetarian", "isMilkFree", "isEggFree", "isPeanutFree", "isTreenutFree", "isFishFree", "isShellfishFree", "isSoyFree", "isWheatFree", "isGlutenFree"]
    // console.log(restrictionList);

    return (
      <div className={classes.root}>
        <Grid container spacing={8} alignItems="center">
          <Grid item md={12}>
            <Typography variant="headline">My Profile</Typography>
          </Grid>
          <Grid item md={12}>
            {this.props.currentUser.id ? (
              <div>
                <Typography variant="title">Welcome, {this.props.currentUser.fullName}</Typography>
                <Button variant="outlined" color="secondary" onClick={this.handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login">Log in</Link>
            )}
            <Typography variant="subheadline">Events you are hosting</Typography>

            {this.state.events.length ? (
              <List>
                {this.state.events.map(potluck => (
                  <ListItem button component={Link} to={`/events/${potluck.id}`} key={potluck.id}>
                    <ListItemText
                      primary={potluck.eventName}
                      secondary={
                        potluck.eventDate && <Moment format="LLL">{potluck.eventDate}</Moment>
                      }
                    />

                    {/* <ClickyThing to={`/events/${potluck.id}`}> */}
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="subheading">No Results to Display</Typography>
            )}

            {restrictionList.length === 0 ? (
              <h5>No dietary restriction flags</h5>
            ) : (
              // : 'has some'
              <List>
                {restrictionList.map(
                  thing =>
                    this.props.currentUser[thing] && <Chip key={thing} label={isLabels[thing]} />
                )}
              </List>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}
// TODO: fix key in ListItem

// export default Profile;
export default withStyles(styles)(Profile);
