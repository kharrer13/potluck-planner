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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


import isLabels from '../../Utils/isLabels.json';

import Moment from 'react-moment';

const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

const dietary = [
  'isVegan',
  'isVegetarian',
  'isMilkFree',
  'isEggFree',
  'isPeanutFree',
  'isTreenutFree',
  'isFishFree',
  'isShellfishFree',
  'isSoyFree',
  'isWheatFree',
  'isGlutenFree'
];

class Profile extends Component {
  state = {
    events: [],
    isVegan: false,
    isVegetarian: false,
    isMilkFree: false,
    isEggFree: false,
    isPeanutFree: false,
    isTreenutFree: false,
    isFishFree: false,
    isShellfishFree: false,
    isSoyFree: false,
    isWheatFree: false,
    isGlutenFree: false,
    editing: false,
    redirectToReferrer: false
  };

  componentDidMount() {
    this.loadMyEvents();
    this.loadDietary();
    // this.loadCurrentUser();
  }


  loadMyEvents = () => {
    API.getMyPotlucks().then(res => this.setState({ events: res.data }));
  };

  // TODO find more elegant way to do this
  loadDietary = () => {
    let { isVegan,
      isVegetarian,
      isMilkFree,
      isEggFree,
      isPeanutFree,
      isTreenutFree,
      isFishFree,
      isShellfishFree,
      isSoyFree,
      isWheatFree,
      isGlutenFree } = this.props.currentUser;

    this.setState({
      isVegan,
      isVegetarian,
      isMilkFree,
      isEggFree,
      isPeanutFree,
      isTreenutFree,
      isFishFree,
      isShellfishFree,
      isSoyFree,
      isWheatFree,
      isGlutenFree
    })

  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // change this to a prevstate, props setState so that it can update state inside or something
  handleCheckChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    
      API.updateUser(this.props.currentUser.id, {
      // API.echo({
        isVegan: this.state.isVegan,
        isVegetarian: this.state.isVegetarian,
        isMilkFree: this.state.isMilkFree,
        isEggFree: this.state.isEggFree,
        isPeanutFree: this.state.isPeanutFree,
        isTreenutFree: this.state.isTreenutFree,
        isFishFree: this.state.isFishFree,
        isShellfishFree: this.state.isShellfishFree,
        isSoyFree: this.state.isSoyFree,
        isWheatFree: this.state.isWheatFree,
        isGlutenFree: this.state.isGlutenFree
      })
        .then(res => {
          // console.log(res.data)
          this.setState({editing: false})
          this.props.loadCurrentUser()
          
        })
        .catch(err => console.log(err));
    
  };

  handleLogout = event => {
    event.preventDefault();
    API.logout()
      .then(res => {
        // console.log(res);
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


            <Typography variant="subheading">Events you are hosting</Typography>

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
                <div>
                  <List>
                    {restrictionList.map(
                      thing =>
                        this.props.currentUser[thing] && <Chip key={thing} label={isLabels[thing]} />
                    )}
                  </List>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.editing}
                        onChange={this.handleCheckChange('editing')}
                        value="editing"
                      />
                    }
                    label="Edit"
                  />
                  <Grid item md={12}>
                    {this.state.editing && (
                      <form>


                        {dietary.map(e => (
                          <FormControlLabel
                            key={e}
                            control={
                              <Checkbox
                                checked={this.state[e]}
                                onChange={this.handleCheckChange(e)}
                                value={e}
                              />
                            }
                            label={isLabels[e]}
                          />
                        ))}
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          className={classes.button}
                          // disabled={!this.state.itemName}
                          onClick={this.handleFormSubmit}
                        >
                          Submit
                   </Button>
                      </form>
                    )}</Grid>

                </div>

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
