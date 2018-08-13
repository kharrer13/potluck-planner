const router = require('express').Router();
const db = require('../../models');

const Op = db.Sequelize.Op;

// all routes are prefixed by /api

// start dummy routes for testing
router.get('/ok', function(req, res) {
  res.send('ok');
});

router.get('/search', function(req, res) {
  res.json(req.query);
});

router.all('/echo', function(req, res) {
  console.log(req.body);
  res.json(req.body);
});
// end dummy routes for testing

router
  .route('/users')
  .get(function(req, res) {
    console.log(req.query);

    let query = {};
    if (req.query.user_id) {
      query.id = req.query.user_id;
    }
    let include;
    let attributes;

    if (req.query.short) {
      include = null;
      attributes = ['id', 'username', 'fullName'];
    } else {
      include = {
        association: 'Potlucks',
        attributes: ['id', 'eventName', 'eventLocation', 'eventDate', 'privateEvent'],
        through: { attributes: [] }
      };
      attributes = { exclude: ['password', 'createdAt', 'updatedAt'] };
    }

    db.User.findAll({
      where: query,
      include,
      attributes
      // include: [{ all: true }]
    })
      .then(dbUsers => res.json(dbUsers))
      .catch(e => res.status(500).json(e.message));
  })
  .post(function(req, res) {
    let newUser = { ...req.body };
    // validation goes here: double check username is a string, email is email, password sufficienly long?

    const { username, email } = newUser;
    db.User.findOrCreate({ where: { [Op.or]: { username, email } }, defaults: newUser })
      .spread((dbUser, created) => {
        if (!created) {
          res.status(409).json({ created, username: dbUser.username, email: dbUser.email });
        } else {
          let { password, ...tempUser } = dbUser.get();
          tempUser.redirectTo = '/login';
          tempUser.created = created;
          res.status(201).json(tempUser);
        }
      })
      // TODO consolidate error handlers
      .catch(e => res.status(500).json(e));
  });

router.route('/users/:userId')
  .get(function (req, res) {

    let query = {};
    if (req.params.userId) {
      query.id = req.params.userId;
    }

    db.User.findAll({
      where: query,
      include: {
        association: 'Potlucks',
        attributes: ['id', 'eventName', 'eventLocation', 'eventDate', 'privateEvent'],
        through: { attributes: [] }
      },
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
    })
    .then(dbUsers => res.json(dbUsers))
    .catch(e => res.status(500).json(e.message));
  })
  .put(function (req, res) {
    // console.log(req.params);
    // console.log(req.user);
    // console.log(req.body);
    

    db.User.findOne({
      where: {
        id: req.params.userId
      },
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
    })
    .then(dbUser => {
      dbUser.update(req.body);
      return res.json(dbUser);
    })
    .catch(e => res.status(500).json(e));
    })


/*     let query = {};
    if (req.params.userId) {
      query.id = req.params.userId;
    }

    db.User.update({

    })
    .then(dbUsers => res.json(dbUsers)) 
    .catch(e => res.status(500).json(e.message));

  })*/


router
  .route('/potluck')
  .get(function(req, res) {
    let query = {};
    let include;

    if (req.query.potluck_id) {
      query.id = req.query.potluck_id;
      // include = [{ all: true }];
      include = [
        {
          association: 'Attendee',
          attributes: ['id', 'fullName', 'username'],
          through: { attributes: [] }
        },
        {
          association: 'Invitee',
          attributes: ['id', 'fullName', 'username'],
          through: { attributes: [] }
        },
        {
          association: 'Items',
          attributes: ['id', 'itemName', 'isVegan', 'isVegetarian', 'isMilkFree', 'isEggFree', 'isPeanutFree', 'isTreenutFree', 'isFishFree', 'isShellfishFree', 'isSoyFree', 'isWheatFree', 'isGlutenFree'],
          through: { attributes: [] }
        },
        {
          association: 'Owner',
          attributes: ['id', 'fullName', 'username']
        }
      ];
    } else {
      include = [
        'Attendee',
        'Items',
        {
          association: 'Invitee',
          attributes: ['id', 'fullName', 'username']
        }
      ];
    }
    // db.Potluck.findAll({ include: [{ all: true }] })
    db.Potluck.findAll({
      where: query,
      include
    }).then(dbPotluck => res.json(dbPotluck));
  })
  .post(function(req, res) {
    let newPotluck = { ...req.body };

    // later get this from req.user
    let newOwner;

    req.user ? (newOwner = req.user.id) : (newOwner = false);

    db.Potluck.create(newPotluck)
      .then(dbPotluck => {
        if (newOwner) {
          return db.Sequelize.Promise.all([
            dbPotluck.setOwner(newOwner),
            dbPotluck.addAttendee(newOwner),
            dbPotluck.addInvitee(newOwner)
          ]);
        } else {
          return dbPotluck;
        }
      })
      .then(result => res.json(result[0]));
  })
/*   .put(function(req, res) {
    // db.Potluck.findAll({ where: { id: req.params.potluckId }, include: [{ all: true }] })
    // this actually returns the array of rows updated
    db.Potluck.update(req.body, { where: { id: req.query.potluck_id } })
      .then(result => {
        return db.Potluck.findAll({ where: { id: req.query.potluck_id } });
      })
      .then(dbPotluck => res.json(dbPotluck));
  }); */
// TODO: Check if above really follows PUT or PATCH, and decide how to design expected data

// DRY this up and/or roll it into the query one above
router
  .route('/potluck/:potluckId')
  .get(function(req, res) {
    // db.Potluck.findAll({ where: { id: req.params.potluckId }, include: [{ all: true }] })
    db.Potluck.findAll({
      where: { id: req.params.potluckId },
      include: ['Attendee', 'Items']
    }).then(dbPotluck => res.json(dbPotluck));
  })
  .put(function(req, res) {
    // db.Potluck.findAll({ where: { id: req.params.potluckId }, include: [{ all: true }] })
    // this actually returns the array of rows updated
    db.Potluck.findOne({ where: { id: req.params.potluckId } })
      .then(dbPotluck => {
        dbPotluck.update(req.body)
        return res.json(dbPotluck)
      });
    // db.Potluck.update(req.body, { where: { id: req.params.potluckId } }).then(dbPotluck =>
    //   res.json(dbPotluck)
    // );
  });
// TODO: Check if above really follows PUT or PATCH, and decide how to design expected data

router.get('/mypotlucks', function(req, res) {
  let query = {};
  let include = [
    {
      association: 'Attendee',
      attributes: ['id', 'fullName', 'username'],
      through: { attributes: [] }
    },
    {
      association: 'Invitee',
      attributes: ['id', 'fullName', 'username'],
      through: { attributes: [] }
    },
    {
      association: 'Items',
      attributes: ['id', 'itemName'],
      through: { attributes: [] }
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
  }).then(dbPotluck => res.json(dbPotluck));
});

router.get('/allmypotlucks', function (req, res) {
  let query = {};

  if (!req.user) {
    res.status(401).send('Unauthorized');
  } else {
    query.OwnerId = req.user.id;
  }

  db.Sequelize.Promise.all([
    db.Potluck.findAll({
      where: query
      // include
    }),
    db.Potluck.findAll({
      include: [
        {
          association: 'Attendee',
          where: { id: req.user.id },
          attributes: []
        }
      ]
    }),
    db.Potluck.findAll({
      include: [
        {
          association: 'Invitee',
          where: { id: req.user.id },
          attributes: []
        }
      ]
    })
  ])
    .then(dbPotluck => res.json(dbPotluck))
    .catch(e => res.json(e));
});

router
  .route('/items')
  .get(function(req, res) {
    let query = {};
    if (req.query.item_id) {
      query.id = req.query.item_id;
    }
    // db.Item.findAll({ where: req.query, include: [{ all: true }] })
    // need to validate req.query, e.g. copy just the parameters that make sense and make sure they are ok
    db.Item.findAll({
      where: query,
      attributes: { exclude: ['createdAt', 'updatedAt', 'UserId'] }
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

  router.route('/items/:itemId')
  .get(function(req, res) {
    db.Item.findAll({
      where: {id: req.params.itemId},
      attributes: { exclude: ['createdAt', 'updatedAt', 'UserId'] },
      include: {
        association: 'User',
        attributes: ['id', 'username', 'fullName']
      }
    }).then(dbItem => {
      return res.json(dbItem);
    });
  })
  .put(function(req, res) {
    db.Item.findOne({ where: { id: req.params.itemId } })
      .then(dbItem => {
        dbItem.update(req.body)
        return res.json(dbItem)
      })
  })

router.post('/potluck-item', function(req, res) {
  db.Potluck.findById(req.body.PotluckId)
    .then(dbPotluck => {
      db.Item.findById(req.body.ItemId).then(dbItem => {
        if (!req.body.bringing) {
          dbPotluck.removeItem(dbItem).then(result => {
            dbPotluck
              .getItems()
              .then(dbPotluckItems => res.json({ Items: dbPotluckItems, result }));
          });
        } else {
          dbPotluck
            .addItem(dbItem)
            // .then(result => res.json(result))
            .then(result => {
              dbPotluck
                .getItems()
                .then(dbPotluckItems => res.json({ Items: dbPotluckItems, result }));
            });
        }
      });
    })
    .catch(e => res.json(e));
});

router.post('/attend', function(req, res) {
  db.Potluck.findById(req.body.PotluckId)
    .then(dbPotluck => {
      console.log(JSON.stringify(dbPotluck, '', 2));
      if (!req.body.attending) {
        dbPotluck.removeAttendee(req.user.id).then(result => res.json(result));
      } else {
        dbPotluck.addAttendee(req.user.id).then(result => res.json(result));
      }
    })
    .catch(e => res.json(e));
});

router.post('/invite', function(req, res) {
  db.Potluck.findById(req.body.PotluckId)
    .then(dbPotluck => {
      console.log(JSON.stringify(dbPotluck, '', 2));
      if (!req.body.invited) {
        dbPotluck.removeInvitee(req.body.UserId).then(result => res.json(result));
      } else {
        dbPotluck.addInvitee(req.body.UserId).then(result => res.json(result));
      }
    })
    .catch(e => res.json(e));
});

router.get('/whoami', function(req, res) {
  if (req.user) {
    res.json(req.user);
  } else {
    res.json({ id: null, username: null });
  }
});

module.exports = router;
