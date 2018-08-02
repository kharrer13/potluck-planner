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
import { withStyles } from '@material-ui/core/styles';
import isLabels from '../../Utils/isLabels.json'

const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});


class ItemView extends Component {
  state = {
    item: {
      id: "",
      itemName: "",
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
    }
  };

  componentDidMount() {
    API.getItem(this.props.match.params.item_id)
      .then(res => this.setState({ item: res.data[0] }))
      .catch(err => console.log(err));
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  
  render() {
    const { classes } = this.props;

    const restrictionList = Object.keys(this.state.item).filter(e => e.startsWith("is"));
    
    return (
      <div className={classes.root}>
        <Grid container spacing={8} alignItems="center">
          <Grid item md={12}>
            <Typography variant="headline">{this.state.item.itemName}</Typography>
          </Grid>
          <Grid item md={12}>
              What: 
              <br />
              {restrictionList.length === 0 ?
              <h5>No dietary restriction flags</h5>
              :
                <List>
                  {restrictionList.map(thing => (
                    this.state.item[thing] && (<Chip key={thing} label={isLabels[thing]} />)
                  ))}
                </List>
            }
            {canEat(this.props.currentUser, this.state.item) ? 'can eat' : 'cannot eat' }
            <br />
            </Grid>
        </Grid>
      </div>
    );
  }
}

// export default ItemView;
export default withStyles(styles)(ItemView);
