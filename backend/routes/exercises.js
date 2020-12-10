const router = require('express').Router();
let Exercise = require('../models/exercise.model'); //Mongoose model we created in the models folder

/** 
 * Endpoint handling HTTP GET requests from: localhost:5000/exercises/
 * --
 * User.find() - A mongoose method that gets a list of all users from the MongoDB Atlas DB and returns a promise
 *               in JSON format, which is why we use .then() and res.json() inside of it 
 */
router.route('/').get((req, res) => {
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * Endpoint handling HTTP POST requests from: localhost:5000/exercises/add
 */
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = req.body.duration;
    const date = Date.parse(req.body.date);
    
    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });

    newExercise.save()
        .then(() => res.json("Exercise added!"))
        .catch(err => res.status(400).json('Error: ' + err));
});


/**
 * Endpoint handling HTTP GET requests from: localhost:5000/exercises/:id
 * --
 * :id - This is essentially a variable. This is an object ID that's created
 *       automatically by MongoDB
 *       If you go and perform a GET request with the ObjectId from the DB,
 *       it will return the specified exercise
 */
router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * Endpoint handling HTTP DELETE requests from: localhost:5000/exercises/:id
 * --
 * :id - This is essentially a variable. This is an object ID that's created
 *       automatically by MongoDB
 *       If you go and perform a GET request with the ObjectId from the DB,
 *       it will return the specified exercise
 * 
 * The only difference here from above is we are deleting the exercise with a
 * particular ObjectId
 */
router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json("Exercise deleted!"))
        .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * Endpoint handling HTTP GET requests from: localhost:5000/exercises/:id
 * --
 * :id - This is essentially a variable. This is an object ID that's created
 *       automatically by MongoDB
 *       If you go and perform a GET request with the ObjectId from the DB,
 *       it will return the specified exercise
 * 
 * We are simply editing a given exercise based off a provided ObjectId
 */
router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = req.body.duration;
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => res.json("Exercise updated!"))
                .catch(err => res.status(400).json("Error: " + err));
        })
        .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;