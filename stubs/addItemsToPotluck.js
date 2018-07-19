const db = require('../models');

db.sequelize.sync()
  .then(function () {
    // .then((dbPotluck) => dbPotluck.addItem(db.Item.findById(1)) )
    db.Item.findById(1)
      .then((dbItem) => {
        console.log(JSON.stringify(dbItem, '', 2))
        db.Potluck.findById(1)
          .then((dbPotluck) => {
            console.log(JSON.stringify(dbPotluck, '', 2))
            dbPotluck.addItem(dbItem)
            
            console.log(JSON.stringify(dbPotluck, '', 2))
          })


          //     })
          //     console.log(JSON.stringify(dbPotluck, '', 2))
          //   })


          // .then(() => db.sequelize.close());
      })
  })

  .catch((err) => console.error(err.message));
