import React, { Component } from "react";
import Jumbotron from '../../components/Jumbotron'
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn, Select } from "../../components/Form";
import { Link as ClickyThing } from "react-router-dom";
import API from '../../Utils/API'
import { Divider } from "../../../node_modules/@material-ui/core";
import Moment from 'react-moment';


class EventView extends Component {

    state = {
        event: {
            Items: [],
            Owner: {}
        },
        items: [],
        potluckName: "",
        potluckDate: "",
        potluckLocation: "",
        itemName: '',
        currentItem: ''
    }

    componentDidMount() {
		API.getPotluck(this.props.match.params.event_id)
			.then(res => this.setState({ event: res.data[0] }))
            .catch(err => console.log(err));
            
        API.getItems(this.props.match.params.event_id)
            .then(res => this.setState({ items: res.data }))
            .catch(err => console.log(err));
	}

    handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
    };

    handleFormSubmit = event => {
		event.preventDefault();
			API.saveItemToPotluck({
                PotluckId: this.props.match.params.event_id,
                ItemId: this.state.currentItem
			})
				.then(res => this.loadItems())
				.catch(err => console.log(err));
		
    };

    loadItems = () => {
		API.getPotluck(this.props.match.params.event_id)
			.then(res => this.setState({ event: res.data[0] }))
            .catch(err => console.log(err));
    }

    render () {
        return(
            <div>
                <Row>
                    <Col size="md-6 sm-6">
                        <Jumbotron>
                            <h1>Potluck Details</h1>
                        </Jumbotron>
                        <div>
                            What: {this.state.event.eventName} 
                            <br/>
                            When: {this.state.event.eventDate ? 
                            <Moment format="LLL">{this.state.event.eventDate}</Moment> : 
                            '[No date given]'}
                            <br/>
                            Where: {this.state.event.eventLocation}
                            <br/>
                            Hosted by: {this.state.event.Owner ?  this.state.event.Owner.fullName : 'nobody' }
                            <br/>
                            Event privacy: {this.state.event.privateEvent ? 'Private' : 'Public'}
                        </div>
                        <br/>
                        <List>
                            {this.state.event.Items.map(item => (
								<ListItem key={item.id}> 
									{item.itemName}
								</ListItem>
                                ))} 
                        </List>
                    </Col>
                    <Col size='md-6 sm-6'>
                        <Jumbotron>
                            <h1>Bring an Item</h1>
                        </Jumbotron>
                        <form>
                            <Select
							    value={this.state.currentItem}
							    onChange={this.handleInputChange}
							    selectLabel="Select Item to Bring"
							    selectName="currentItem"
                                selectData={this.state.items}
                                selectKey='itemName'
							/>
                            <FormBtn
								disabled={!(this.state.currentItem)}
								onClick={this.handleFormSubmit}
							>
								Submit Item
							</FormBtn>
                        </form>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default EventView;