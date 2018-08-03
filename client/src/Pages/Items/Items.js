import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import API from '../../Utils/API';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CheckCircle from '@material-ui/icons/CheckCircle';

import { withStyles } from '@material-ui/core/styles';
import isLabels from '../../Utils/isLabels.json';

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

    const headerKeys = ['itemName', ...Object.keys(isLabels)];
    const headerLabels = ['Name', ...Object.keys(isLabels)];

    return (
      <div className={classes.root}>
        <Grid container spacing={8} alignItems="center">
          <Grid item md={12}>
            <Typography variant="headline">All Items</Typography>
          </Grid>
          <Grid item md={12}>
            {this.state.items.length ? (
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Vegan</TableCell>
                    <TableCell>Vegetarian</TableCell>
                    <TableCell>Milk Free</TableCell>
                    <TableCell>Egg Free</TableCell>
                    <TableCell>Peanut Free</TableCell>
                    <TableCell>Fish Free</TableCell>
                    <TableCell>Shellfish Free</TableCell>
                    <TableCell>Soy Free</TableCell>
                    <TableCell>Wheat Free</TableCell>
                    <TableCell>Gluten Free</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.items.map(n => {
                    return (
                      <TableRow key={n.id}>
                        <TableCell component="th" scope="row">
                          <Link
                            to={`/item/${n.id}`}>
                            {n.itemName}</Link>
                        </TableCell>
                        <TableCell>{n.isVegan && <CheckCircle />}</TableCell>
                        <TableCell>{n.isVegetarian && <CheckCircle />}</TableCell>
                        <TableCell>{n.isMilkFree && <CheckCircle />}</TableCell>
                        <TableCell>{n.isEggFree && <CheckCircle />}</TableCell>
                        <TableCell>{n.isTreenutFree && <CheckCircle />}</TableCell>
                        <TableCell>{n.isFishFree && <CheckCircle />}</TableCell>
                        <TableCell>{n.isShellfishFree && <CheckCircle />}</TableCell>
                        <TableCell>{n.isSoyFree && <CheckCircle />}</TableCell>
                        <TableCell>{n.isWheatFree && <CheckCircle />}</TableCell>
                        <TableCell>{n.isGlutenFree && <CheckCircle />}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              // <List>
              //   {this.state.items.map(item => (
              //     <ListItem
              //       button
              //       component={Link}
              //       to={`/item/${item.id}`}
              //       key={item.id}
              //     >
              //       <ListItemText primary={item.itemName} />
              //     </ListItem>
              //   ))}
              // </List>
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
