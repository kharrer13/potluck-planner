const router = require("express").Router();
const db = require('../../models');

const Op = db.Sequelize.Op;

// all routes are prefixed by /api

// start dummy routes for testing
router.get('/ok', function (req, res) {
  res.send('ok')
})

router.get('/search', function (req, res) {
  res.json(req.query)
})

router.all('/echo', function (req, res) {
  console.log(req.body)
  res.json(req.body)
})
// end dummy routes for testing

router.route('/users')
  .get(function(req, res) {
    let query = {};
    if (req.query.user_id) {
      query.id = req.query.user_id;
    }

    db.User.findAll({
      where: query,
      include: [db.Potluck],
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
      // include: [{ all: true }]
    }).then(dbUsers => res.json(dbUsers));
  })
  .post(function(req, res) {
    let newUser = { ...req.body };
    db.User.create(newUser).then(dbUser => {
      let { password, ...tempUser } = dbUser.get();
      tempUser.redirectTo = '/login';
      res.json(tempUser);
    });
  });

router.route('/potluck')
  .get(function (req, res) {
    let query = {};
    let include;

    if (req.query.potluck_id) {
      query.id = req.query.potluck_id;
      // include = [{ all: true }];
      include = [
        {
          association: 'Attendee',
          attributes: ['id', 'fullName', 'username'],
          through: {attributes: []}
        },
        {
          association: 'Invitee',
          attributes: ['id', 'fullName', 'username']
        },
        {
          association: 'Items',
          attributes: ['id', 'itemName']
        },
        {
          association: 'Owner',
          attributes: ['id', 'fullName', 'username']
        }
      ];
    } else {
      include = ['Attendee', 'Items', {
        association: 'Invitee',
        attributes: ['id', 'fullName', 'username']
      }]
    }
    // db.Potluck.findAll({ include: [{ all: true }] })
    db.Potluck.findAll({
      where: query,
      include
    })
      .then(dbPotluck => res.json(dbPotluck))
  })
  .post(function (req, res) {
    let newPotluck = { ...req.body }

    // later get this from req.user
    let newOwner

    (req.user) ? newOwner = req.user.id : newOwner = false;

    db.Potluck.create(newPotluck)
      .then(dbPotluck => {
        if (newOwner) {
          return db.Sequelize.Promise.all([
            dbPotluck.setOwner(newOwner),
            dbPotluck.addAttendee(newOwner),
            dbPotluck.addInvitee(newOwner)
          ])
        } else {
          return dbPotluck;
        }
        
      })
      .then(result =>
        res.json(result[0])
      )
  })

// DRY this up and/or roll it into the query one above
router.route('/potluck/:potluckId')
.get(function (req, res) {
  // db.Potluck.findAll({ where: { id: req.params.potluckId }, include: [{ all: true }] })
  db.Potluck.findAll({
    where: { id: req.params.potluckId },
    include: ['Attendee', 'Items']
  })
    .then(dbPotluck => res.json(dbPotluck))
})
.put(function (req, res) {
  // db.Potluck.findAll({ where: { id: req.params.potluckId }, include: [{ all: true }] })
  // this actually returns the array of rows updated
  db.Potluck.update(req.body, { where: { id: req.params.potluckId } })
    .then(dbPotluck => res.json(dbPotluck))
})

router.get('/mypotlucks', function (req, res) {
  let query = {};
  let include = [
    {
      association: 'Attendee',
      attributes: ['id', 'fullName', 'username']
    },
    {
      association: 'Invitee',
      attributes: ['id', 'fullName', 'username']
    },
    {
      association: 'Items',
      attributes: ['id', 'itemName']
    },
    {
      association: 'Owner',
      attributes: ['id', 'fullName', 'username']
    }
  ];


  if (req.user) {
    query.OwnerId = req.user.id;
    // include = ['Attendee', 'Invitee', 'Items']
  } 
  // else {
  //   // include = ['Attendee', 'Items']
  // }
  // db.Potluck.findAll({ include: [{ all: true }] })
  db.Potluck.findAll({
    where: query,
    include
  })
    .then(dbPotluck => res.json(dbPotluck))
})

router.route('/items')
  .get(function(req, res) {
    let query = {};
    if (req.query.item_id) {
      query.id = req.query.item_id;
    }
    // db.Item.findAll({ where: req.query, include: [{ all: true }] })
    // need to validate req.query, e.g. copy just the parameters that make sense and make sure they are ok
    db.Item.findAll({
      where: query,
      attributes: [
        'id',
        'itemName',
        'isVegan',
        'isVegetarian',
        'isMilkFree',
        'isEggFree',
        'isPeanutFree',
        'isTreenutFree',
        'isFishFree',
        'isShellfishFree',
        'isSoyFree',
        'isWheatFree',
        'isGlutenFree'
      ]
    }).then(dbItem => {
      return res.json(dbItem);
    });
  })
  .post(function(req, res) {
    let newItem = { ...req.body };

    // later get this from req.user
    let newOwner = req.user ? req.user.id : null;
    newItem.UserId = newOwner;
    db.Item.create(newItem).then(dbItem => {
      res.json(dbItem);
    });
  });

router.post('/potluck-item', function (req, res) {
  db.Potluck.findById(req.body.PotluckId)
    .then((dbPotluck) => {
      db.Item.findById(req.body.ItemId)
        .then(dbItem => {

          if (!req.body.bringing) {
            dbPotluck.removeItem(dbItem)
              .then(result => {
                dbPotluck.getItems()
                  .then((dbPotluckItems) => res.json({ Items: dbPotluckItems, result }))
              })
          } else {
            dbPotluck.addItem(dbItem)
              // .then(result => res.json(result))
              .then(result => {
                dbPotluck.getItems()
                  .then((dbPotluckItems) => res.json({ Items: dbPotluckItems, result }))
              })
          }
        })
    })
    .catch(e => res.json(e))
})

router.post('/attend', function (req, res) {

  db.Potluck.findById(req.body.PotluckId)
    .then((dbPotluck) => {
      console.log(JSON.stringify(dbPotluck, '', 2))
      if (!req.body.attending) {
        dbPotluck.removeAttendee(req.user.id)
        .then(result => res.json(result))
      } else {
        dbPotluck.addAttendee(req.user.id)
        .then(result => res.json(result))
      }

    })
    .catch(e => res.json(e))

})

router.post('/invite', function (req, res) {

  db.Potluck.findById(req.body.PotluckId)
    .then((dbPotluck) => {
      console.log(JSON.stringify(dbPotluck, '', 2))
      if (!req.body.invited) {
        dbPotluck.removeInvitee(req.body.UserId)
        .then(result => res.json(result))
      } else {
        dbPotluck.addInvitee(req.body.UserId)
        .then(result => res.json(result))
      }

    })
    .catch(e => res.json(e))

})

router.get('/whoami', function (req, res) {
  if (req.user) {
    res.json(req.user)
  } else {
    res.json({ id: null, username: null })
  }
})

module.exports = router;
