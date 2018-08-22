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
        <Typography variant="headline">Welcome to Potluck Planner</Typography>
        <Typography component="p">Potluck Planner helps you keep track of your potluck party attendees and items. You can keep track
        of invitations, RSVPs, and dietary restrictions. </Typography>
        <br />
        <Button component={Link} variant="contained" to="/login" color="primary">
          Log in
        </Button>
        <Button component={Link} variant="contained" to="/signup" color="primary">
          Sign up
        </Button>
        <br />
        <br />
        <Typography component="p">Built for the GW Coding Boot Camp by <a href="https://github.com/kharrer13">Kyle Harrer</a> and <a href="https://github.com/cslin82">Chris Lin</a>. Uses Sequelize on MySQL, Express, React, Passport, and Node.js.</Typography>
      </div>
    );
  }
}

// export default Home;
export default withStyles(styles)(Home);
