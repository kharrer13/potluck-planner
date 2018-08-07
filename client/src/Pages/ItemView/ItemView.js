import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import API from '../../Utils/API';
import canEat from '../../Utils/canEat';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { withStyles } from '@material-ui/core/styles';
import isLabels from '../../Utils/isLabels.json';

const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  button: {
    margin: theme.spacing.unit
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

class ItemView extends Component {
  state = {
    id: '',
    itemName: '',
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
    editing: false
  };

  componentDidMount() {
    API.getItem(this.props.match.params.item_id)
      .then(res => this.setState({ ...res.data[0] }))
      .catch(err => console.log(err));
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
    if (this.state.itemName) {
      API.updateItem(this.state.id, {
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
          
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    const { classes } = this.props;

    // const restrictionList = Object.keys(this.state.item).filter(e => e.startsWith("is"));
    const restrictionList = Object.keys(isLabels);

    return (
      <div className={classes.root}>
        <Grid container spacing={8} alignItems="center">
          <Grid item md={12}>
            <Typography variant="headline">{this.state.itemName}</Typography>
          </Grid>
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
                {/* <TextField
                  value={this.state.itemName}
                  onChange={this.handleInputChange}
                  className={classes.textField}
                  id="itemName"
                  name="itemName"
                  label="Item Name"
                  placeholder="Item name (required)"
                  fullWidth
                  margin="normal"
                /> */}

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
                  Submit Item
                </Button>
              </form>
            )}

            {!this.state.editing && (
              <List>
                {' '}
                {restrictionList.map(
                  thing => this.state[thing] && <Chip key={thing} label={isLabels[thing]} />
                )}{' '}
              </List>
            )}

            {/* {!this.state.editing && (restrictionList.length === 0 ? (<h5>No dietary restriction flags</h5>) : (<List> {restrictionList.map(thing => ( this.state.item[thing] && (<Chip key={thing} label={isLabels[thing]} />) ))} </List> <Typography> {canEat(this.props.currentUser, this.state.item) ? 'can eat' : 'cannot eat'}            </Typography>)} */}

            <br />
          </Grid>
        </Grid>
      </div>
    );
  }
}

// export default ItemView;
export default withStyles(styles)(ItemView);
