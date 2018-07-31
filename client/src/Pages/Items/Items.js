import React, { Component } from "react";
import Jumbotron from '../../components/Jumbotron'
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import { Link as ClickyThing } from "react-router-dom";
import API from '../../Utils/API'
import Moment from 'react-moment';

class Items extends Component {
	state = {
		items: [],

	};

	componentDidMount() {
		this.loadItems();
	};

	loadItems = () => {
		API.getItems()
			.then(res =>
				this.setState({ items: res.data })
			)
	};

	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};



	render() {
		return (
			<div>
				<Row>
					<Col size="md-12 sm-12">
						<Jumbotron>
							<h1>All Items</h1>
						</Jumbotron>
						{this.state.items.length ? (
							<List>
								{this.state.items.map(item => (
									<ListItem key={item.id}>
										<ClickyThing to={`/item/${item.id}`}>
											{item.id} {item.itemName}
										</ClickyThing>
									</ListItem>
								))}
							</List>
						) : (
								<h3>No Results to Display</h3>
							)}
					</Col>
				</Row>
			</div>
		);
	}
}
// TODO: fix key in ListItem


export default Items;