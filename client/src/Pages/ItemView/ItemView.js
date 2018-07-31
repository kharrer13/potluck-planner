import React, { Component } from "react";
import Jumbotron from '../../components/Jumbotron'
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn, Select } from "../../components/Form";
import { Link as ClickyThing } from "react-router-dom";
import API from '../../Utils/API'
import { Divider } from "../../../node_modules/@material-ui/core";
import Moment from 'react-moment';


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
    const restrictionList = Object.keys(this.state.item).filter(e => e.startsWith("is"));
    
    return (
      <div>
        <Row>
          <Col size="md-6 sm-6">
            <Jumbotron>
              <h1>Item Details</h1>
            </Jumbotron>
            <div>
              What: {this.state.item.itemName}
              <br />
              {restrictionList.length === 0 ?
              <h5>No dietary restriction flags</h5>
              :
                <List>
                  {restrictionList.map(thing => (
                    this.state.item[thing] && (<ListItem key={thing}>{thing} </ListItem>)
                  ))}
                </List>
            }
            </div>
            <br />

            
          </Col>

        </Row>
      </div>
    );
  }
}

export default ItemView;