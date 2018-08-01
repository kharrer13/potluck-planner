import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import API from '../../Utils/API';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { withStyles } from '@material-ui/core/styles';

import Moment from 'react-moment';

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

class CreateEvent extends Component {
  state = {
    events: [],
    userData: [],
    potluckName: '',
    potluckDate: '',
    potluckLocation: '',
    startDate: '',
    privateEvent: false
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    // if (name==='potluckDate') {
    // 	console.log(target, value, name)
    // }
    this.setState({
      [name]: value
    });
  };
  handleCheckChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  componentDidMount() {
    this.loadEvents();
  }

  loadEvents = () => {
    API.getUsers().then(res => this.setState({ userData: res.data }));
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (
      this.state.potluckName &&
      this.state.potluckDate &&
      this.state.potluckLocation
    ) {
      API.savePotluck({
        // API.echo({
        eventName: this.state.potluckName,
        eventDate: this.state.potluckDate,
        eventLocation: this.state.potluckLocation,
        privateEvent: this.state.privateEvent
      })
        .then(res => this.loadEvents())
        .catch(err => console.log(err));

      this.props.history.push('/events');
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={8} alignItems="center">
          <Grid item md={12}>
            <Typography variant="headline">Create a Potluck</Typography>
          </Grid>
          <Grid item md={12}>
            <form
              className={classes.container}
              noValidate
              autoComplete="off"
              onSubmit={this.handleFormSubmit}
            >
              <TextField
                value={this.state.potluckName}
                onChange={this.handleInputChange}
                className={classes.textField}
                id="potluckName"
                name="potluckName"
                label="Potluck Name"
                placeholder="Event name (required)"
                fullWidth
                margin="normal"
              />
              {/*  fix this later */}
              <TextField
                id="potluckDate"
                name="potluckDate"
                label="Potluck Date"
                type="datetime-local"
                value={this.state.potluckDate}
                onChange={this.handleInputChange}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
              />

              {/* <DatePicker
									className="form-control"
									selected={this.state.potluckDate}
									onChange={this.handleChange}
									name="potluckDate"
									isClearable={true}
									showTimeSelect
									timeFormat="HH:mm"
									timeIntervals={15}
									dateFormat="LLL"
									timeCaption="time"
									todayButton={"Today"}
									minDate={moment()}
								/> */}
              {/* </div> */}

              <TextField
                value={this.state.potluckLocation}
                onChange={this.handleInputChange}
                className={classes.textField}
                id="potluckLocation"
                name="potluckLocation"
                label="Potluck Location"
                placeholder="Location (required)"
                fullWidth
                margin="normal"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.privateEvent}
                    onChange={this.handleCheckChange('privateEvent')}
                    value="privateEvent"
                  />
                }
                label="Mark event private?"
              />

              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.button}
                disabled={
                  !(
                    this.state.potluckName &&
                    this.state.potluckDate &&
                    this.state.potluckLocation
                  )
                }
                onClick={this.handleFormSubmit}
              >
                Submit Potluck
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

// export default CreateEvent;
export default withStyles(styles)(CreateEvent);
