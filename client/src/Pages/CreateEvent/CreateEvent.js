import React, { Component } from "react";
import Jumbotron from '../../components/Jumbotron'
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn, Select } from "../../components/Form";
import { Link as ClickyThing } from "react-router-dom";
import API from '../../Utils/API'
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class CreateEvent extends Component {

	state = {
		events: [],
		userData: [],
		potluckName: "",
		potluckDate: "",
		potluckLocation: "",
		startDate: '',
		privateEvent: false
	};

	handleInputChange = event => {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	};

	componentDidMount() {
		this.loadEvents();
	};

	loadEvents = () => {
		API.getUsers()
			.then(res =>
				this.setState({ userData: res.data })
			)
	};
	handleChange = (date) => {
		this.setState({
			potluckDate: date
		});
	}
	handleFormSubmit = event => {
		event.preventDefault();
		if (this.state.potluckName && this.state.potluckDate && this.state.potluckLocation) {
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
		return (
			<div>
				<Row>
					<Col size='md-3'>
						<div>
						</div>
					</Col>
					<Col size="md-6">
						<Jumbotron>
							<h1>Create a Potluck</h1>
						</Jumbotron>
						<form>
							<Input
								value={this.state.potluckName}
								onChange={this.handleInputChange}
								name="potluckName"
								placeholder="Event name (required)"
							/>
							<div className="form-group">
								<DatePicker
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
								/>
							</div>

							<Input
								value={this.state.potluckLocation}
								onChange={this.handleInputChange}
								name="potluckLocation"
								placeholder="Location (required)"
							/>

							<label htmlFor="privateEvent">
								Mark event private?
						<input
									id="privateEvent"
									name="privateEvent"
									type="checkbox"
									checked={this.state.privateEvent}
									onChange={this.handleInputChange}
								/>
							</label>
							<FormBtn
								disabled={!(this.state.potluckName && this.state.potluckDate && this.state.potluckLocation)}
								onClick={this.handleFormSubmit}
							>
								Submit Potluck
							</FormBtn>
						</form>
						<h4>Acting as {this.props.currentUser.username}</h4>

					</Col>
				</Row>
			</div>
		);
	}

}
// TODO fix select value per https://reactjs.org/docs/forms.html#the-select-tag
// or the hacky way is to just have another text input to input user id or username
// and if username, then add to the backend to handle adding user, or look up in frontend.
// TODO add conditional rendering to user selector

export default CreateEvent;