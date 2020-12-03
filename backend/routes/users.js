const router = require('express').Router();
let User = require('../models/user.model'); //Mongoose model we created in the models folder

/** 
 * Endpoint handling HTTP GET requests from: localhost:5000/users/
 * --
 * User.find() - A mongoose method that gets a list of all users from the MongoDB Atlas DB and returns a promise
 *               in JSON format, which is why we use .then() and res.json() inside of it 
 */

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * Endpoint handling HTTP POST requests from: localhost:5000/users/add
 * --
 * 
 */
router.route('/add').post((req, res) => {
    const username = req.body.username;
    
    const newUser = new User({username});

    newUser.save()
        .then(() => res.json("Users added!"))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;