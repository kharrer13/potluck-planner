import axios from 'axios';

export default {
  // Gets all items
  getUsers: function() {
    return axios.get('/api/users');
  },
  // Gets the user with the given id
  getUser: function(id) {
    return axios.get('/api/users/?user_id=' + id);
  },
  // Saves a user to the database
  saveUser: function(userData) {
    return axios.post('/api/users', userData);
  },
  // Updates a user in the database
  updateUser: function(id, userData) {
    return axios.put('/api/users/?user_id=' + id, userData);
  },

  // Gets all potluck
  getPotlucks: function() {
    return axios.get('/api/potluck');
  },
  // Gets the potluck with the given id
  getPotluck: function(id) {
    return axios.get('/api/potluck/?potluck_id=' + id);
  },
  // Updates the potluck with the given id
  updatePotluck: function(id, potluckData) {
    return axios.put('/api/potluck/?potluck_id=' + id, potluckData);
  },
  getUsersPotluck: function(id) {
    return axios.get('/api/potluck/?OwnerId=' + id);
  },
  getMyPotlucks: function() {
    return axios.get('/api/mypotlucks');
  },

  // Saves a potluck to the database
  savePotluck: function(potluckData) {
    return axios.post('/api/potluck', potluckData);
  },

  // Gets all items
  getItems: function() {
    return axios.get('/api/items');
  },
  // Gets the item with the given id
  getItem: function(id) {
    return axios.get('/api/items/?item_id=' + id);
  },
  // Saves a item to the database
  saveItem: function(itemData) {
    return axios.post('/api/items', itemData);
  },
  // Updates an item in the database
  updateItem: function(id, itemData) {
    return axios.get('/api/items/?item_id=' + id, itemData);
  },

  echo: function(whateverdata) {
    console.log(whateverdata);
    return axios.post('/api/echo', whateverdata);
  },
  login: function(loginData) {
    // console.log(loginData)
    return axios.post('/login', loginData);
  },
  logout: function() {
    return axios.get('/logout');
  },
  whoami: function() {
    return axios.get('/api/whoami');
  },
  //Save item to potluck
  saveItemToPotluck: function(itemData) {
    return axios.post('/api/potluck-item', itemData);
  },
  //Set status to attending
  attendPotluck: function(potluckData) {
    return axios.post('/api/attend', potluckData);
  }
};
