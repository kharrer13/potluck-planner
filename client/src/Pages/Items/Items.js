import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import API from '../../Utils/API';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

class Items extends Component {
  state = {
    items: []
  };

  componentDidMount() {
    this.loadItems();
  }

  loadItems = () => {
    API.getItems().then(res => this.setState({ items: res.data }));
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
            <Typography variant="headline">All Items</Typography>
          </Grid>
          <Grid item md={12}>
            {this.state.items.length ? (
              <List>
                {this.state.items.map(item => (
                  <ListItem
                    button
                    component={Link}
                    to={`/item/${item.id}`}
                    key={item.id}
                  >
                    <ListItemText primary={item.itemName} />
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
// TODO: fix key in ListItem

// export default Items;
export default withStyles(styles)(Items);
