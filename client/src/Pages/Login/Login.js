import React, { Component } from 'react';
import { Link as ClickyThing, Redirect } from 'react-router-dom';

import API from '../../Utils/API';

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

class Login extends Component {
  state = {
    username: '',
    password: '',
    redirectToReferrer: false,
    loginFailed: false
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.username && this.state.password) {
      API.login({
        // API.echo({
        username: this.state.username,
        password: this.state.password
      })
        .then(res => {
          // console.log(res)
          this.props.handleUserChange(res.data);
          if (res.data.redirectTo) {
            console.log('redirectTo', res.data.redirectTo);
            this.setState({ loginFailed: false, redirectToReferrer: true });
          }
        })
        .catch(err => {
          console.error(err);
          this.setState({ loginFailed: true });
        });
    }
  };

  render() {
    const { classes } = this.props;

    const { from } = this.props.location.state || {
      from: { pathname: '/profile' }
    };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      console.log('redirecting to from:', from);
      return <Redirect to={from} />;
    }

    return (
      <div className={classes.root}>
        <Typography variant="headline">Log in</Typography>
        <form className={classes.container} noValidate autoComplete="off">
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
            Log in
          </Button>
          {this.state.loginFailed && 'Login failed'}
        </form>
      </div>
    );
  }
}
// TODO fix select value per https://reactjs.org/docs/forms.html#the-select-tag
// or the hacky way is to just have another text input to input user id or username
// and if username, then add to the backend to handle adding user, or look up in frontend.
// TODO add conditional rendering to user selector

// export default Login;
export default withStyles(styles)(Login);
