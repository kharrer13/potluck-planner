import React, { Component } from 'react';
import { Link as ClickyThing, Redirect } from 'react-router-dom';

import validator from 'validator';
import API from '../../Utils/API';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing.unit
  }
});

class Signup extends Component {
  state = {
    username: '',
    password: '',
    email: '',
    fullName: '',
    redirectToReferrer: false,
    redirectTo: false
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    // validate all inputs here
    let isValid = [
      validator.isAlphanumeric(this.state.username),
      validator.isEmail(this.state.email)
      // validator.isAlpha(this.state.fullName)
    ];

    // console.log('isValid', isValid);
    // console.log('isValid.every', isValid.every(x => x));

    if (isValid.every(x => x)) {
      // API.login({
      API.saveUser({
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
        fullName: this.state.fullName
      })
        .then(res => {
          // console.log(res);
          if (res.data.redirectTo) {
            console.log(res.data.redirectTo);
            this.setState({
              redirectToReferrer: true,
              redirectTo: res.data.redirectTo
            });
          }
        })
        .catch(err => console.log(err));
    } else {
      console.log('validation error');
    }
  };

  render() {
    const { classes } = this.props;

    const { from } = this.props.location.state || {
      from: { pathname: this.state.redirectTo }
    };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      console.log('redirecting to from:', from);
      return <Redirect to={from} />;
    }

    return (
      <div className={classes.root}>
        <Grid container spacing={8} alignItems="center">
          <Grid item md={12}>
            <Typography variant="headline">Sign up </Typography>
          </Grid>
          <Grid item md={12}>
            <form className={classes.container} noValidate autoComplete="off">
              <TextField
                id="fullName"
                label="Name"
                value={this.state.fullName}
                onChange={this.handleInputChange}
                className={classes.textField}
                name="fullName"
                placeholder="Name"
                fullWidth
                margin="normal"
                inputProps={{
                  autoComplete: 'off',
                  autoCapitalize: 'words',
                  spellCheck: 'false'
                }}
              />
              <TextField
                id="email"
                label="Email"
                value={this.state.fullemailName}
                onChange={this.handleInputChange}
                className={classes.textField}
                name="email"
                type="email"
                placeholder="Email"
                fullWidth
                margin="normal"
              />
              <TextField
                id="username"
                label="Username"
                value={this.state.username}
                onChange={this.handleInputChange}
                className={classes.textField}
                name="username"
                placeholder="Username"
                fullWidth
                margin="normal"
                inputProps={{
                  autoComplete: 'off',
                  autoCorrect: 'off',
                  autoCapitalize: 'none',
                  spellCheck: 'false'
                }}
              />
              <TextField
                id="password"
                label="Password"
                value={this.state.password}
                onChange={this.handleInputChange}
                name="password"
                placeholder="Password"
                className={classes.textField}
                type="password"
                fullWidth
                // autoComplete="current-password"
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                disabled={!(this.state.username && this.state.password)}
                onClick={this.handleFormSubmit}
              >
                Sign up
              </Button>
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}
// TODO fix select value per https://reactjs.org/docs/forms.html#the-select-tag
// or the hacky way is to just have another text input to input user id or username
// and if username, then add to the backend to handle adding user, or look up in frontend.
// TODO add conditional rendering to user selector

// export default Signup;
export default withStyles(styles)(Signup);
