'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users',
      [
        {
          "username": "dumbledore",
          "password": "$2a$10$oLhp1XD6V2TSpgwS5ylEN.gVWLZgw/c62tYyjKKbK57qo9NDmEPc2",
          "email": "albus.dumbledore@hogwarts.ac.uk",
          "firstName": "Albus",
          "lastName": "Dumbeldore"
        },
        {
          "username": "mcgonnagall",
          "password": "$2a$10$cBdzeDdWr0mXhLeEBmTsZ.8MWcABgHdza1LZCW3qabw3lnKWBnMsy",
          "email": "minerva.mcgonnagall@hogwarts.ac.uk",
          "firstName": "Minerva",
          "lastName": "McGonnagall"
        },
        {
          "username": "snape",
          "password": "$2a$10$YCeDIYaiwjv7nCnKjUB/ZupjYZwItdptJn4gXzM0xxsYEp1Ze5lQa",
          "email": "severus.snape@hogwarts.ac.uk",
          "firstName": "Severus",
          "lastName": "Snape"
        },
        {
          "username": "lupin",
          "password": "$2a$10$.vrqKFEgzYaXexRxOQ.nYO7uUVku8SSAXT/todslb2PS87ddmBE4W",
          "email": "remus.lupin@hogwarts.ac.uk",
          "firstName": "Remus",
          "lastName": "Lupin"
        },
        {
          "username": "hagrid",
          "password": "$2a$10$SqWHiIguko9AFrX50dhWWuxu/os9tDtd0R06P0GsItquCAb.aZ1pG",
          "email": "rubeus.hagrid@hogwarts.ac.uk",
          "firstName": "Rubeus",
          "lastName": "Hagrid"
        },
        {
          "username": "harry",
          "password": "$2a$10$FZYw3JnuEe2DiLEJc95WlOHbHplO63tqba62HXlIaGjiMl.wbXcGa",
          "email": "harry.potter@hogwarts.ac.uk",
          "firstName": "Harry",
          "lastName": "Potter"
        },
        {
          "username": "ron",
          "password": "$2a$10$aydRQavAKinyY.XWJA73H.CWp4zmlmoSkWZ.fcFReQNhGgFL89.3C",
          "email": "ronald.weasley@hogwarts.ac.uk",
          "firstName": "Ronald",
          "lastName": "Weasley"
        },
        {
          "username": "hermione",
          "password": "$2a$10$aMfK9FqJ2OpyihIqcpWuDeB./1dsFgegwlckYzxNZGKFR5jbWdFHC",
          "email": "hermione.granger@hogwarts.ac.uk",
          "firstName": "Hermione",
          "lastName": "Granger"
        },
        {
          "username": "fred",
          "password": "$2a$10$/WtgoDemLNAfazULkADZOulPMgu2rVl01QEStM9/jSOvOObwik11q",
          "email": "fred.weasley@hogwarts.ac.uk",
          "firstName": "Fred",
          "lastName": "Weasley"
        },
        {
          "username": "george",
          "password": "$2a$10$DzYZf0K.2tpVfzFA.D.QKueHNkKui1vzj1Ontlj1TfrmJLnkCVEV2",
          "email": "george.weasley@hogwarts.ac.uk",
          "firstName": "George",
          "lastName": "Weasley"
        },
        {
          "username": "ginny",
          "password": "$2a$10$ECp3xwiVppn7IE.RiK.GxOhtNAQUZWE3fnOdTT/1M4iwOLyeGQKXa",
          "email": "ginny.weasley@hogwarts.ac.uk",
          "firstName": "Ginny",
          "lastName": "Weasley"
        },
        {
          "username": "luna",
          "password": "$2a$10$p24v8HAr5R7T2fMeaKLFxOqxnOMLyere2dc6pJeAmLe9PjPUIF9dC",
          "email": "luna.lovegood@hogwarts.ac.uk",
          "firstName": "Luna",
          "lastName": "Lovegood"
        },
        {
          "username": "bill",
          "password": "$2a$10$peC3FTKz4pcikGk4NPbLneUN2xXOwRrXRqVkI80SACEh5Pt/iWmhO",
          "email": "bill.weasley@gringotts.co.uk",
          "firstName": "Bill",
          "lastName": "Weasley"
        },
        {
          "username": "charlie",
          "password": "$2a$10$At1oE51S49Fqt/qARjJYTOwuWlPBkKQnPvkd0qNfJDnPteoyKeT/S",
          "email": "charlie.weasley@wmail.co.uk",
          "firstName": "Charlie",
          "lastName": "Weasley"
        },
        {
          "username": "percy",
          "password": "$2a$10$/EXlmyd0yZpx6vv96qSXKOdbyNnpj3PkbccYsYlwy0/oLEy.Y4jE2",
          "email": "percy.weasley@wmail.co.uk",
          "firstName": "Percy",
          "lastName": "Weasley"
        },
        {
          "username": "molly",
          "password": "$2a$10$8vxJtn4XiXliaWrlr9do8.8fkHwK00LqrEby4xd2yh.FmQ5aM2hIq",
          "email": "molly.weasley@wmail.co.uk",
          "firstName": "Molly",
          "lastName": "Weasley"
        },
        {
          "username": "arthur",
          "password": "$2a$10$DuLMsvgW48Rema4eRqCGs.KMZPuX7bKi5iVdrSlaZz7S4Naavfpja",
          "email": "arthur.weasley@magic.gov.uk",
          "firstName": "Arthur",
          "lastName": "Weasley"
        },
        {
          "username": "fleur",
          "password": "$2a$10$AWW50rSYzfT4MXlF.cpS2ufwpZx44FG1YLOjxwSqClsH4FmJ2cKgq",
          "email": "fleur.delacour@beauxbatons.fr",
          "firstName": "Fleur",
          "lastName": "Delacour"
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
