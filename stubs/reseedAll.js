const db = require("../models");

const newItems = [
  {
    itemName: "birthday cake",
    isVegan: false,
    isVegetarian: true,
    isMilkFree: false,
    isEggFree: false,
    isPeanutFree: true,
    isTreenutFree: true,
    isFishFree: true,
    isShellfishFree: true,
    isSoyFree: true,
    isWheatFree: false,
    isGlutenFree: false
  },
  {
    itemName: "treacle tart",
    isVegan: false,
    isVegetarian: true,
    isMilkFree: false,
    isEggFree: false,
    isPeanutFree: true,
    isTreenutFree: true,
    isFishFree: true,
    isShellfishFree: true,
    isSoyFree: true,
    isWheatFree: false,
    isGlutenFree: false
  },
  {
    itemName: "sherbert lemon",
    isVegan: true,
    isVegetarian: true,
    isMilkFree: true,
    isEggFree: true,
    isPeanutFree: true,
    isTreenutFree: true,
    isFishFree: true,
    isShellfishFree: true,
    isSoyFree: true,
    isWheatFree: true,
    isGlutenFree: true
  },
  {
    itemName: "Puking Pastilles",
    isVegan: false,
    isVegetarian: true,
    isMilkFree: true,
    isEggFree: true,
    isPeanutFree: true,
    isTreenutFree: true,
    isFishFree: true,
    isShellfishFree: true,
    isSoyFree: true,
    isWheatFree: true,
    isGlutenFree: true
  },
  {
    itemName: "fainting fancies",
    isVegan: true,
    isVegetarian: true,
    isMilkFree: true,
    isEggFree: true,
    isPeanutFree: true,
    isTreenutFree: true,
    isFishFree: true,
    isShellfishFree: true,
    isSoyFree: true,
    isWheatFree: true,
    isGlutenFree: true
  },
  {
    itemName: "chocolate",
    isVegan: false,
    isVegetarian: true,
    isMilkFree: false,
    isEggFree: true,
    isPeanutFree: false,
    isTreenutFree: false,
    isFishFree: true,
    isShellfishFree: true,
    isSoyFree: true,
    isWheatFree: true,
    isGlutenFree: true
  },
  {
    itemName: "steak and kidney pie",
    isVegan: false,
    isVegetarian: false,
    isMilkFree: false,
    isEggFree: false,
    isPeanutFree: true,
    isTreenutFree: true,
    isFishFree: true,
    isShellfishFree: true,
    isSoyFree: true,
    isWheatFree: false,
    isGlutenFree: false
  },
  {
    itemName: "cauldron cakes",
    isVegan: false,
    isVegetarian: true,
    isMilkFree: false,
    isEggFree: false,
    isPeanutFree: true,
    isTreenutFree: true,
    isFishFree: true,
    isShellfishFree: true,
    isSoyFree: true,
    isWheatFree: false,
    isGlutenFree: false
  },
  {
    itemName: "bouillabaisse",
    isVegan: false,
    isVegetarian: false,
    isMilkFree: true,
    isEggFree: true,
    isPeanutFree: true,
    isTreenutFree: true,
    isFishFree: false,
    isShellfishFree: false,
    isSoyFree: true,
    isWheatFree: true,
    isGlutenFree: true
  },
  {
    itemName: "pumpkin pasties",
    isVegan: false,
    isVegetarian: true,
    isMilkFree: false,
    isEggFree: false,
    isPeanutFree: false,
    isTreenutFree: false,
    isFishFree: true,
    isShellfishFree: true,
    isSoyFree: true,
    isWheatFree: false,
    isGlutenFree: false
  },
  {
    itemName: "chocolate frogs",
    isVegan: false,
    isVegetarian: true,
    isMilkFree: false,
    isEggFree: true,
    isPeanutFree: true,
    isTreenutFree: true,
    isFishFree: true,
    isShellfishFree: true,
    isSoyFree: true,
    isWheatFree: true,
    isGlutenFree: true
  },
  {
    itemName: "corned beef sandwich",
    isVegan: false,
    isVegetarian: false,
    isMilkFree: true,
    isEggFree: true,
    isPeanutFree: true,
    isTreenutFree: true,
    isFishFree: true,
    isShellfishFree: true,
    isSoyFree: true,
    isWheatFree: false,
    isGlutenFree: false
  },
  {
    itemName: "bertie bott's every flavor beans",
    isVegan: true,
    isVegetarian: true,
    isMilkFree: true,
    isEggFree: true,
    isPeanutFree: true,
    isTreenutFree: true,
    isFishFree: true,
    isShellfishFree: true,
    isSoyFree: true,
    isWheatFree: true,
    isGlutenFree: true
  },
  {
    itemName: "rock cake",
    isVegan: false,
    isVegetarian: false,
    isMilkFree: false,
    isEggFree: false,
    isPeanutFree: true,
    isTreenutFree: true,
    isFishFree: true,
    isShellfishFree: true,
    isSoyFree: true,
    isWheatFree: false,
    isGlutenFree: false
  },
  {
    itemName: "radish salad",
    isVegan: true,
    isVegetarian: true,
    isMilkFree: true,
    isEggFree: true,
    isPeanutFree: true,
    isTreenutFree: true,
    isFishFree: true,
    isShellfishFree: true,
    isSoyFree: true,
    isWheatFree: true,
    isGlutenFree: true
  },
  {
    itemName: "butterbeer",
    isVegan: false,
    isVegetarian: true,
    isMilkFree: false,
    isEggFree: true,
    isPeanutFree: true,
    isTreenutFree: true,
    isFishFree: true,
    isShellfishFree: true,
    isSoyFree: true,
    isWheatFree: true,
    isGlutenFree: false
  },
  {
    itemName: "pumpkin beer",
    isVegan: false,
    isVegetarian: true,
    isMilkFree: true,
    isEggFree: true,
    isPeanutFree: true,
    isTreenutFree: true,
    isFishFree: true,
    isShellfishFree: true,
    isSoyFree: true,
    isWheatFree: true,
    isGlutenFree: false
  },
  {
    itemName: "boiled potatoes",
    isVegan: false,
    isVegetarian: true,
    isMilkFree: true,
    isEggFree: true,
    isPeanutFree: true,
    isTreenutFree: true,
    isFishFree: true,
    isShellfishFree: true,
    isSoyFree: true,
    isWheatFree: true,
    isGlutenFree: true
  },
  {
    itemName: "lamb chops",
    isVegan: false,
    isVegetarian: false,
    isMilkFree: true,
    isEggFree: true,
    isPeanutFree: true,
    isTreenutFree: true,
    isFishFree: true,
    isShellfishFree: true,
    isSoyFree: true,
    isWheatFree: true,
    isGlutenFree: false
  },
  {
    itemName: "Yorkshire pudding",
    isVegan: false,
    isVegetarian: false,
    isMilkFree: false,
    isEggFree: false,
    isPeanutFree: true,
    isTreenutFree: true,
    isFishFree: true,
    isShellfishFree: true,
    isSoyFree: true,
    isWheatFree: false,
    isGlutenFree: false
  },
  {
    itemName: "bacon and steak",
    isVegan: false,
    isVegetarian: false,
    isMilkFree: true,
    isEggFree: true,
    isPeanutFree: true,
    isTreenutFree: true,
    isFishFree: true,
    isShellfishFree: true,
    isSoyFree: true,
    isWheatFree: true,
    isGlutenFree: true
  },
  {
    itemName: "roast beef",
    isVegan: false,
    isVegetarian: false,
    isMilkFree: true,
    isEggFree: true,
    isPeanutFree: true,
    isTreenutFree: true,
    isFishFree: true,
    isShellfishFree: true,
    isSoyFree: false,
    isWheatFree: true,
    isGlutenFree: true
  },
  {
    itemName: "bread",
    isVegan: false,
    isVegetarian: true,
    isMilkFree: true,
    isEggFree: false,
    isPeanutFree: true,
    isTreenutFree: true,
    isFishFree: true,
    isShellfishFree: true,
    isSoyFree: true,
    isWheatFree: false,
    isGlutenFree: false
  }
];

const newPotlucks = [
  {
    eventName: "Train to school",
    eventLocation: "Hogwarts Express",
    eventDate: "2018-09-01T11:00:00",
    privateEvent: true
  },
  {
    eventName: "Quidditch World Cup",
    eventLocation: "Dartmoor",
    eventDate: "2018-08-18T09:00:00",
    privateEvent: false
  },
  {
    eventName: "Fleur and Bill's wedding",
    eventLocation: "The Burrow",
    eventDate: "2018-08-01T15:00:00",
    privateEvent: true
  },
  {
    eventName: "Quidditch season opener",
    eventLocation: "Great Hall",
    eventDate: "2018-11-10T14:00:00",
    privateEvent: false
  },
  {
    eventName: "Welcoming Feast",
    eventLocation: "Great Hall",
    eventDate: "2018-09-01T20:00:00",
    privateEvent: false
  }
];

const newUsers = [
  {
    username: "dumbledore",
    password: "$2a$10$oLhp1XD6V2TSpgwS5ylEN.gVWLZgw/c62tYyjKKbK57qo9NDmEPc2",
    email: "albus.dumbledore@hogwarts.ac.uk",
    fullName: "Albus Dumbeldore"
  },
  {
    username: "mcgonnagall",
    password: "$2a$10$cBdzeDdWr0mXhLeEBmTsZ.8MWcABgHdza1LZCW3qabw3lnKWBnMsy",
    email: "minerva.mcgonnagall@hogwarts.ac.uk",
    fullName: "Minerva McGonnagall"
  },
  {
    username: "snape",
    password: "$2a$10$YCeDIYaiwjv7nCnKjUB/ZupjYZwItdptJn4gXzM0xxsYEp1Ze5lQa",
    email: "severus.snape@hogwarts.ac.uk",
    fullName: "Severus Snape"
  },
  {
    username: "lupin",
    password: "$2a$10$.vrqKFEgzYaXexRxOQ.nYO7uUVku8SSAXT/todslb2PS87ddmBE4W",
    email: "remus.lupin@hogwarts.ac.uk",
    fullName: "Remus Lupin"
  },
  {
    username: "hagrid",
    password: "$2a$10$SqWHiIguko9AFrX50dhWWuxu/os9tDtd0R06P0GsItquCAb.aZ1pG",
    email: "rubeus.hagrid@hogwarts.ac.uk",
    fullName: "Rubeus Hagrid"
  },
  {
    username: "harry",
    password: "$2a$10$FZYw3JnuEe2DiLEJc95WlOHbHplO63tqba62HXlIaGjiMl.wbXcGa",
    email: "harry.potter@hogwarts.ac.uk",
    fullName: "Harry Potter"
  },
  {
    username: "ron",
    password: "$2a$10$aydRQavAKinyY.XWJA73H.CWp4zmlmoSkWZ.fcFReQNhGgFL89.3C",
    email: "ronald.weasley@hogwarts.ac.uk",
    fullName: "Ronald Weasley"
  },
  {
    username: "hermione",
    password: "$2a$10$aMfK9FqJ2OpyihIqcpWuDeB./1dsFgegwlckYzxNZGKFR5jbWdFHC",
    email: "hermione.granger@hogwarts.ac.uk",
    fullName: "Hermione Granger"
  },
  {
    username: "fred",
    password: "$2a$10$/WtgoDemLNAfazULkADZOulPMgu2rVl01QEStM9/jSOvOObwik11q",
    email: "fred.weasley@hogwarts.ac.uk",
    fullName: "Fred Weasley"
  },
  {
    username: "george",
    password: "$2a$10$DzYZf0K.2tpVfzFA.D.QKueHNkKui1vzj1Ontlj1TfrmJLnkCVEV2",
    email: "george.weasley@hogwarts.ac.uk",
    fullName: "George Weasley"
  },
  {
    username: "ginny",
    password: "$2a$10$ECp3xwiVppn7IE.RiK.GxOhtNAQUZWE3fnOdTT/1M4iwOLyeGQKXa",
    email: "ginny.weasley@hogwarts.ac.uk",
    fullName: "Ginny Weasley"
  },
  {
    username: "luna",
    password: "$2a$10$p24v8HAr5R7T2fMeaKLFxOqxnOMLyere2dc6pJeAmLe9PjPUIF9dC",
    email: "luna.lovegood@hogwarts.ac.uk",
    fullName: "Luna Lovegood",
    isVegan: true,
    isVegetarian: true,
    isMilkFree: true,
    isEggFree: true,
    isFishFree: true,
    isShellfishFree: true
  },
  {
    username: "bill",
    password: "$2a$10$peC3FTKz4pcikGk4NPbLneUN2xXOwRrXRqVkI80SACEh5Pt/iWmhO",
    email: "bill.weasley@gringotts.co.uk",
    fullName: "Bill Weasley"
  },
  {
    username: "charlie",
    password: "$2a$10$At1oE51S49Fqt/qARjJYTOwuWlPBkKQnPvkd0qNfJDnPteoyKeT/S",
    email: "charlie.weasley@wmail.co.uk",
    fullName: "Charlie Weasley"
  },
  {
    username: "percy",
    password: "$2a$10$/EXlmyd0yZpx6vv96qSXKOdbyNnpj3PkbccYsYlwy0/oLEy.Y4jE2",
    email: "percy.weasley@wmail.co.uk",
    fullName: "Percy Weasley"
  },
  {
    username: "molly",
    password: "$2a$10$8vxJtn4XiXliaWrlr9do8.8fkHwK00LqrEby4xd2yh.FmQ5aM2hIq",
    email: "molly.weasley@wmail.co.uk",
    fullName: "Molly Weasley"
  },
  {
    username: "arthur",
    password: "$2a$10$DuLMsvgW48Rema4eRqCGs.KMZPuX7bKi5iVdrSlaZz7S4Naavfpja",
    email: "arthur.weasley@magic.gov.uk",
    fullName: "Arthur Weasley"
  },
  {
    username: "fleur",
    password: "$2a$10$AWW50rSYzfT4MXlF.cpS2ufwpZx44FG1YLOjxwSqClsH4FmJ2cKgq",
    email: "fleur.delacour@beauxbatons.fr",
    fullName: "Fleur Delacour"
  }
];


db.sequelize.sync().then(function () {
  db.Sequelize.Promise.all([
    db.Item.bulkCreate(newItems),
    db.Potluck.bulkCreate(newPotlucks),
    db.User.bulkCreate(newUsers)

  ] )
    .then(stuff => {
      console.log(JSON.stringify(stuff, "", 2));
    })
    .then(() => db.sequelize.close())
    .catch(err => {
      console.error(err.message);
      return db.sequelize.close();
    });
});
