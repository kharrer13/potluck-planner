import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import API from '../../Utils/API';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import isLabels from '../../Utils/isLabels.json'

const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
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

class CreateItem extends Component {
  state = {
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
    isGlutenFree: false
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };
  handleCheckChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  // componentDidMount() {
  //   this.loadEvents();
  // }

  // loadEvents = () => {
  //   API.getUsers().then(res => this.setState({ userData: res.data }));
  // };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.itemName) {
      API.saveItem({
        // API.echo({
        itemName: this.state.itemName,
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
        .then(res => this.props.history.push('/items/' + res.data.id))
        .catch(err => console.log(err));
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={8} alignItems="center">
          <Grid item md={12}>
            <Typography variant="headline">Create an Item</Typography>
          </Grid>
          <Grid item md={12}>
            <form>
              <TextField
                value={this.state.itemName}
                onChange={this.handleInputChange}
                className={classes.textField}
                id="itemName"
                name="itemName"
                label="Item Name"
                placeholder="Item name (required)"
                fullWidth
                margin="normal"
              />

              {dietary.map(e => (
                <FormControlLabel
                  key={e}
                  control={
                    <Checkbox
                      checked={this.state.e}
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
                disabled={!this.state.itemName}
                onClick={this.handleFormSubmit}
              >
                Submit Item
              </Button>
            </form>
            <h4>Acting as {this.props.currentUser.username}</h4>
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

// export default CreateItem;
export default withStyles(styles)(CreateItem);
