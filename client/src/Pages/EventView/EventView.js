import React, { Component } from "react";
import Jumbotron from '../../components/Jumbotron'
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import { Link as ClickyThing } from "react-router-dom";
import API from '../../Utils/API'
import { Divider } from "../../../node_modules/@material-ui/core";
import Moment from 'react-moment';


class EventView extends Component {

    state = {
        potluckName: "",
        potluckDate: "",
        potluckLocation: "",
        itemId: '',
        itemName: '',
    }

    handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
    };

    handleFormSubmit = event => {
		event.preventDefault();
		if (this.state.itemName) {
			API.saveItem({
				itemName: this.state.itemName,
				eventDate: this.state.potluckDate,
			})
				.then(res => this.loadEvents())
				.catch(err => console.log(err));
		}
    };

    render () {
        return(
            <div>
                <Row>
                    <Col size="md-6 sm-6">
                        <Jumbotron>
                            <h1>Potluck Details</h1>
                        </Jumbotron>
                        <List>
                            
                        </List>
                    </Col>
                    <Col size='md-6 sm-6'>
                        <Jumbotron>
                            <h1>Bring an Item</h1>
                        </Jumbotron>
                        <List>
                        </List>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default EventView;