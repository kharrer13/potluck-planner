import axios from "axios";

export default {
  // Gets all items
  getUsers: function() {
    return axios.get("/api/users");
  },
  // Gets the user with the given id
  getUser: function(id) {
    return axios.get("/api/users/?user_id=" + id);
  },
  // Saves a book to the database
  saveUser: function(userData) {
    return axios.post("/api/users", userData);
  },

  // Gets all potluck
  getPotlucks: function() {
    return axios.get("/api/potluck");
  },
  // Gets the potluck with the given id
  getPotluck: function(id) {
    return axios.get("/api/potluck/?potluck_id=" + id);
  },
  // Saves a potluck to the database
  savePotluck: function(potluckData) {
    return axios.post("/api/potluck", potluckData);
  },

  // Gets all items
  getItems: function() {
    return axios.get("/api/items");
  },
  // Gets the item with the given id
  getItem: function(id) {
    return axios.get("/api/items/?item_id=" + id);
  },
  // Saves a item to the database
  saveItem: function(itemData) {
    return axios.post("/api/items", itemData);
  },
  
  echo: function(whateverdata) {
    return axios.post("/api/echo", whateverdata);
  },  
  login: function(loginData) {
    console.log(loginData)
    return axios.post("/login", loginData);
  },
  logout: function() {
    return axios.get("/logout");
  },
  whoami: function() {
    return axios.get("/api/whoami");
  }


};
