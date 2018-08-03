import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../../Utils/API';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

class Home extends Component {
  render() {
    const { classes } = this.props;
    // const { from } = this.props.location.state || { from: { pathname: "/profile" } };
    // const { redirectToReferrer } = this.state;

    // if (redirectToReferrer) {
    // 	console.log('redirecting to from:', from)
    // 	return <Redirect to={from} />;
    // }

    return (
      <div className={classes.root}>
        <Typography variant="headline">This is the home landing page</Typography>
        <Typography component="p">Body copy paragraph 1.</Typography>
        <Typography component="p">Body copy paragraph 2.</Typography>
        <Button component={Link} variant="contained" to="/login" color="primary">
          Log in
        </Button>
        <Button component={Link} variant="contained" to="/signup" color="primary">
          Sign up
        </Button>
      </div>
    );
  }
}

// export default Home;
export default withStyles(styles)(Home);
