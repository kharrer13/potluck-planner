'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users',
      [
        {
          "username": "harry",
          "firstName": "Harry",
          "lastName": "Potter",
          "email": "harry.potter@hogwarts.ac.uk"
        },
        {
          "username": "ron",
          "firstName": "Ronald",
          "lastName": "Weasley",
          "email": "ronald.weasley@hogwarts.ac.uk"
        },
        {
          "username": "hermione",
          "firstName": "Hermione",
          "lastName": "Granger",
          "email": "hermione.granger@hogwarts.ac.uk"
        },
        {
          "username": "ginny",
          "firstName": "Ginny",
          "lastName": "Weasley",
          "email": "ginny.weasley@hogwarts.ac.uk"
        },
        {
          "username": "fred",
          "firstName": "Fred",
          "lastName": "Weasley",
          "email": "fred.weasley@hogwarts.ac.uk"
        },
        {
          "username": "george",
          "firstName": "George",
          "lastName": "Weasley",
          "email": "george.weasley@hogwarts.ac.uk"
        },
        {
          "username": "dumbledore",
          "firstName": "Albus",
          "lastName": "Dumbeldore",
          "email": "albus.dumbeldore@hogwarts.ac.uk"
        },
        {
          "username": "ssnape",
          "firstName": "Severus",
          "lastName": "Snape",
          "email": "severus.snape@hogwarts.ac.uk"
        },
        {
          "username": "hagrid",
          "firstName": "Rubeus",
          "lastName": "Hagrid",
          "email": "rubeus.hagrid@hogwarts.ac.uk"
        },
        {
          "username": "lupin",
          "firstName": "Remus",
          "lastName": "Lupin",
          "email": "remus.lupin@hogwarts.ac.uk"
        },
        {
          "username": "arthur",
          "firstName": "Arthur",
          "lastName": "Weasley",
          "email": "arthur.weasley@magic.gov.uk"
        },
        {
          "username": "luna",
          "firstName": "Luna",
          "lastName": "Lovegood",
          "email": "luna.lovegood@hogwarts.ac.uk"
        },
        {
          "username": "mcgonnagall",
          "firstName": "Minerva",
          "lastName": "McGonnagall",
          "email": "minerva.mcgonnagall@hogwarts.ac.uk"
        },
        {
          "username": "fleur",
          "firstName": "Fleur",
          "lastName": "Delacour",
          "email": "fleur.delacour@beauxbatons.fr"
        },
        {
          "username": "molly",
          "firstName": "Molly",
          "lastName": "Weasley",
          "email": "molly.weasley@wmail.co.uk"
        },
        {
          "username": "bill",
          "firstName": "Bill",
          "lastName": "Weasley",
          "email": "bill.weasley@gringotts.co.uk"
        },
        {
          "username": "charlie",
          "firstName": "Charlie",
          "lastName": "Weasley",
          "email": "charlie.weasley@wmail.co.uk"
        },
        {
          "username": "percy",
          "firstName": "Percy",
          "lastName": "Weasley",
          "email": "percy.weasley@wmail.co.uk"
        }
      ]
    )
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
