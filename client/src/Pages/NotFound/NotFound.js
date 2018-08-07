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

class NotFound extends Component {
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
        <Typography variant="headline">Not found</Typography>
  
        <Button component={Link} variant="contained" to="/" color="primary">
          Home
        </Button>
      </div>
    );
  }
}

// export default NotFound;
export default withStyles(styles)(NotFound);
